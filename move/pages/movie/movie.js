var app = getApp();
var utils = require("../../utils/utils.js");

Page({
  data:{
    isBoxShow:true,
    isPannelShow: false,
    movies: {},
    inputValue:""
  },
  onLoad:function(){
    this.data.inTheaterUrl = "/v2/movie/in_theaters";
    this.data.comingSoonUrl = "/v2/movie/coming_soon";
    this.data.topUrl ="/v2/movie/top250";
    
    this.getMovieListData(this.data.inTheaterUrl);
    this.getMovieListData(this.data.comingSoonUrl);
    this.getMovieListData(this.data.topUrl);
    
  },
  getMovieListData:function(a){
    var that = this;
    // 封装过的ajax
    utils.http(a,3,0,that.processData)
    // ajax
    // wx.request({
    //   url: app.globalData.g_commonUrl + a,
    //   data: {
    //     "count": 3,
    //   },
    //   header: {
    //     "CONTENT-TYPE": "application/JSON"
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function (data) {
    //     that.processData(data.data,a);
    //   },
    //   fail: function (res) {
    //     console.log(fail)
    //   },
    //   complete: function (res) {},
    // })
  },
  processData(a, b) {
    var movieItem = {};
    var movies = {};
    movies.title = a.title;
    movies.subjects = a.subjects;
    movieItem.movies = movies;
    if (b === this.data.inTheaterUrl){
      this.setData({
        inTheaterList: movieItem
      })
    } else if (b === this.data.comingSoonUrl){
      this.setData({
        comingList: movieItem
      })
    } else if(b == this.data.topUrl){
      this.setData({
        topList: movieItem
      })
    }
  },
  onMoreTap:function(ev){
    var title = ev.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'more-movie/more-movie?title=' + title
    })
  },
  onBindFocus:function(){
    this.setData({
      isBoxShow: false,
      isPannelShow: true
    })
  },
  onBindConfirm:function(ev){
    this.setData({
      inputValue: ev.detail.value
    })
    var searchUrl = "/v2/movie/search?q=" + this.data.inputVal; 
    utils.http(searchUrl, "", 0, this.showResultMovie);
  },
  onCancelImgTap:function(ev){
    this.setData({
      isBoxShow: true,
      isPannelShow: false,
      movies:[],
      inputValue:""
    })
  },
  showResultMovie:function(a){
    this.setData({
      movies:a.subjects
    })
  },
  // 电影详情跳转
  onMovieTap:function(ev){
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+id
    })
  }
})