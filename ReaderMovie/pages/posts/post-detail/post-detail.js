var postsData = require('../../../data/post-data')
Page({
  onLoad: function(option) {
    var postId = option.id;
    var postData = postsData.postList[postId];
    this.data.postData = postData;
  }
})