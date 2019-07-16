Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"Sep 15 2019",
    title:"VueConf in Shanghai"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_content1 = {
      date:"Sep 15 2019",
      title:"VueConf in Shanghai",
      post_img: "../../images/post/me.jpg",
      content: "VueConf 2019 成功在上海交通大学徐汇校区举办，Vue作者尤雨溪亲自到达现场，和各位开发者们一起分享了Vue3.0的进展，并在会后和大家签名合影留念",
      view_num: "92",
      collect_num: "65",
      author_img: "../../images/avatar/1.jpg"
    }
    this.setData(post_content1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})