var utils = require("../../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    startNum : 0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.title = options.title;
    var title = options.title;
    switch (title){
      case "正在上映的电影-北京":
        var inTheaterUrl = "/v2/movie/in_theaters";
        this.data.requestUrl = inTheaterUrl;
        utils.http(inTheaterUrl,"","", that.showMovie);
      break;
      case "即将上映的电影" :
        var comingSoonUrl = "/v2/movie/coming_soon";
        this.data.requestUrl = comingSoonUrl;
        utils.http(comingSoonUrl,"","",that.showMovie);
      break;
      case "豆瓣电影Top250":
        var topUrl = "/v2/movie/top250";
        this.data.requestUrl = topUrl;
        utils.http(topUrl,"","",that.showMovie);
      break;
    }
  },
  showMovie:function(a,b){
    var totalMovies = [];
    if(!this.data.isEmpty){
      // 如果此刻数组中不是空
      totalMovies = this.data.movies.concat(a.subjects);
    }else{
      totalMovies = a.subjects;
      this.data.isEmpty = false;
    }
    this.data.startNum += 20;
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (){
    var title = this.data.title;
    wx.setNavigationBarTitle({
      title: title
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    utils.http(this.data.requestUrl, "", this.data.startNum, this.showMovie);
  },
  onPullDownRefresh: function () {
    this.data.movies = [];
    this.data.startNum = 0
    utils.http(this.data.requestUrl, "", this.data.startNum, this.showMovie);
  },
  onMovieTap: function (ev) {
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id
    })
  }
})