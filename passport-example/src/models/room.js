const { User } = require('./index.js');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creatorId: {
      type : DataTypes.INTEGER,
      reference : {
        model: User,
        key: 'id',
      }
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  })
}