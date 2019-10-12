var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    isLoading: false
  },
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    });
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl: dataUrl
    })
    util.http(dataUrl, this.processDoubanData);
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }
    var totalEmpty = {};
    if (!this.data.isEmpty) {
      totalEmpty = this.data.movies.concat(movies);
    } else {
      totalEmpty = movies;
      this.setData({
        isEmpty: false
      })
    }
    this.setData({
      movies: totalEmpty,
      totalCount: this.data.totalCount += 20
    })
    //停止下拉刷新
    wx.stopPullDownRefresh();
    //隐藏标题栏加载样式
    wx.hideNavigationBarLoading();
    //取消加载状态
    this.setData({ isLoading: false })
  },
  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  onReachBottom: function (event) {
    //判断是否正在加载
    if (this.data.isLoading) { return false; }

    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount +
      "&count=20";
    util.http(nextUrl, this.processDoubanData);

    //显示标题栏加载样式
    wx.showNavigationBarLoading();
    //加载状态
    this.setData({ isLoading: true })
  },
  onPullDownRefresh: function () {
    this.setData({
      movies: {},
      isEmpty: true
    })
    var refreshUrl = this.data.requestUrl +
      "?start=0&count=20";
    util.http(refreshUrl, this.processDoubanData);
    //显示标题栏加载样式
    wx.showNavigationBarLoading();
  }
})