var postsData = require('../../../data/post-data')
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function(option) {
    var postId = option.id;
    this.setData({
      currentPostId: postId
    })
    var postData = postsData.postList[postId];
    this.setData(postData);
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else{
      var postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic : true
      })
    })
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic : false
      })
    })
  },
  onCollectionTap: function(event) {
    this.getPostsCollectedSyc(); 
  },
  // getPostsCollectedAsy: function() {
  //   var that = this;
  //   wx.getStorage({
  //     key: 'posts_collected',
  //     success: function(res) {
  //       var postsCollected = res.data;
  //       var postCollected = postsCollected[that.data.currentPostId];
  //       postCollected = !postCollected;
  //       postsCollected[that.data.currentPostId] = postCollected;
  //       that.showToast(postsCollected, postCollected)
  //     }
  //   })
  // },
  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected)
  },
  showToast: function(postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000
    })
  },
  showModal: function(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '405f80',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          });
        }
      }
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ好友",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList ,
      itemColor: '#405f80',
      success: function(res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消?' + res.cancel + '实现分享功能',
        })
      }
    })
  },
  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId]
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl ,
        success(res){

        },
        fail(res){

        }
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})