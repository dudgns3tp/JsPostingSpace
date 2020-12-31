module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SubComment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subCommentContents: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  })
}