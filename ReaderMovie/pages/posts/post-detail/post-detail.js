var postsData = require('../../../data/post-data')
Page({
  onLoad: function(option) {
    var postId = option.id;
    var postData = postsData.postList[postId];
    this.setData(postData);
    wx.setStorageSync('key', {
      game: "风暴",
      developer: "暴雪"
    })
  },
  onCollectionTap: function(event) {
    var game = wx.getStorageSync('key')
  },
  onShareTap: function(event) {
    wx.removeStorageSync('key')
  }
})