Page({
  onLoad: function(event) {
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      method: 'GET',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function(res) {
        console.log(res)
      }
    })
  }
})