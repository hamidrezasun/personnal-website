module.exports = (sequelize, DataTypes) => {
    var Comments = sequelize.define('Comments', {
      user: DataTypes.STRING,
      comment: DataTypes.TEXT('medium')
      },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      });
  
    return Comments;
  };