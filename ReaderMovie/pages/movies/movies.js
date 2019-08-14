Page({
  onLoad: function(event) {
    wx.request({
      url: '',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res)
      }
    })
  }
})