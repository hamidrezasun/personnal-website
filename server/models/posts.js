'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    ShortBody: DataTypes.TEXT('medium'),
    body: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Posts;
};