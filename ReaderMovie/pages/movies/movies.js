Page({
  onLoad: function(event) {
    wx.request({
      url: 'http://v.juhe.cn/movie/index',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res)
      }
    })
  }
})