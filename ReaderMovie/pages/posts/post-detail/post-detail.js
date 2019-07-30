var postsData = require('../../../data/post-data')
Page({
  data: {

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
    wx.playBackgroundAudio({
      dataUrl: 'http://music.163.com/song?id=1321385655&userid=414971634',
      title: 'PopStar',
      coverImgUrl: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=popstar%E8%8B%B1%E9%9B%84%E8%81%94%E7%9B%9F&step_word=&hs=0&pn=8&spn=0&di=25080&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=4290013275%2C3600974309&os=1541071257%2C3706878731&simid=4234419772%2C680214104&adpicid=0&lpn=0&ln=225&fr=&fmq=1564394789127_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fp2.music.126.net%2FK9Ush0UgQ4sKQApHBa8r1A%3D%3D%2F109951163790600768.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F47ftv_z%26e3B8mn_z%26e3Bv54AzdH3Ff5g2%3Ft1%3D8nnln9mllm%267fj6t1%3D9bm9d00ma%26u654%3Dpt4jstgj&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
      // callback functions, success & fail & complete
    })
  }
})