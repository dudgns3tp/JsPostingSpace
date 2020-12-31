const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.SubComment = require('./subComment')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);

/* 1 : N   User : Post */
db.User.hasMany(db.Post, { onDelete: 'cascade' });
db.Post.belongsTo(db.User);

/* M : N   User : Post  => Like */
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });

/* M : N User : User => follower */
db.User.belongsToMany(db.User, { foreignKey: 'followingId', through: 'Follow', as: 'Follower'});
db.User.belongsToMany(db.User, { foreignKey: 'followerId', through: 'Follow', as: 'Following'});

/* 1 : N Post : Comment */
db.Post.hasMany(db.Comment, { onDelete: 'cascade'});
db.Comment.belongsTo(db.Post);

/* 1 : N User : Comment  */
db.User.hasMany(db.Comment, { onDelete: 'cascade'});
db.Comment.belongsTo(db.User);

/* 1: N Comment : SubComment */
db.Comment.hasMany(db.SubComment, { onDelete: 'cascade' });
db.SubComment.belongsTo(db.Comment);

/* 1 : N User : SubComment  */
db.User.hasMany(db.SubComment, { onDelete: 'cascade'});
db.SubComment.belongsTo(db.User);

/* 1 : N User : Room  */
db.User.hasMany(db.Room, { onDelete: 'cascade', foreignKey: 'creatorId', sourceKey: 'id' });
db.Room.belongsTo(db.User, { foreignKey: 'creatorId', targetKey: 'id' });

// /* M : N User : Post => Comment */
// db.User.belongsToMany(db.Post, { through: 'Comment', as: 'Commented'});
// db.Post.belongsToMany(db.User, { through: 'Comment', as: 'Commenter'});

module.exports = db;
