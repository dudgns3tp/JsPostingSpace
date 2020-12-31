module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commentContents: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  })
}