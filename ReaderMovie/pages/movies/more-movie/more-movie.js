Page({
  data: {
    navigateTitle: '',
  },
  onLoad: function(options){
    var category = options.category;
    this.data.navigateTitle = category
  },
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  }
})