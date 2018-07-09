// pages/movie/movie-detail/movie-detail.js
var app = getApp();
var utils = require("../../../utils/utils.js");
Page({
  data: {
    movie:{},
    shareShow:false,
    canvasShow: false,
    canvasImageSrc:null
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    this.data.id = id;
    wx.showShareMenu({
      withShareTicket: true
    })
    var url = "/v2/movie/subject/"+id;
    wx.request({
      url: app.globalData.g_commonUrl + url,
      data: {},
      header: {
        "CONTENT-TYPE": "application/JSON"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (data) {
        if(!data) return;
        that.dataProFn(data.data);
      },
      fail: function (res) {
        console.log(fail)
      },
      complete: function (res) { },
    })
  },
  dataProFn:function(a){
    var movie = {
      movieImg: a.images?a.images.large:"",
      country:a.countries[0],
      title:a.title,
      original_title: a.original_title,
      wish_count: a.wish_count,
      year: a.year,
      genres: a.genres.join("、"),
      store: a.rating.average,
      casts:utils.covertToCastString(a.casts),
      castsInfo:utils.covertToCastInfo(a.casts),
      summary: a.summary,
      wishCount:a.wish_count,
      commentCount:a.collect_count,
      directors:a.directors[0].name
    }
    this.setData({
      movie:movie
    })
  },
  // 查看图片
  viewMovePostImg:function(ev){
    var src = ev.currentTarget.dataset.src;
    wx:wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  // 显示分享
  shareShow:function(){
    this.setData({
      shareShow:true
    })
  },
  shareHide:function(){
    this.setData({
      shareShow: false
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    console.log(res.from)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.movie.title,
      path: '/page/user?' + this.data.id,
      imageUrl: this.data.movie.movieImg,
      success:function(e){
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
      }
    }
  },
  canvasHide(){
    this.setData({
      canvasShow:false
    })
  },
  // 绘制海报
  canvasShow(res){
    this.setData({
      userName: res.detail.userInfo.nickName,
      head_img: res.detail.userInfo.avatarUrl,
      canvasShow: true
    })
    this.handlePoster();
  },
  // 图片保存到本地赞不可用(需要查看原因)
  // getImageInfo(url) {    //  图片缓存本地的方法
  //   if (typeof url === 'string') {
  //     wx.getImageInfo({   //  小程序获取图片信息API
  //       src: url,
  //       success: function (res) {
  //         console.log
  //         this.setData({
  //           head_img: res.path
  //         })
  //       },
  //       fail(err) {
  //         console.log(err)
  //       }
  //     })
  //   }
  // }
  // 点击绘制按钮判断用户是否授权
  handlePoster(e) {
    wx.getSetting({  // 获取用户设置
      success:(res)=> {
        if (!res.authSetting['scope.userInfo']) {  // 如果用户之前拒绝了授权
          wx.openSetting({
            success(tag) {
              if (tag.authSetting["scope.userInfo"]) {  // 用户在设置页选择同意授权
                wx.showLoading({
                  title: '正在生成...',
                })
                this.canvasDraw();
              }
            }
          });
        } else {   //  用户已经授权
          wx.showLoading({
            title: '正在生成...',
          })
          this.canvasDraw();
        }
      }
    })
  },
  canvasDraw(){
    const ctx = wx.createCanvasContext('shareCanvas');
    ctx.clearRect(0, 0, 0, 0); 
    ctx.setFillStyle('red');
    ctx.fillRect(0,20,375,483);
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 483, 375, 100);
    // 绘制图片
    ctx.drawImage(this.data.movie.movieImg, 40, 60, 295,200 );
    const strLength = 30;
    var str = this.data.movie.directors + this.data.movie.title + this.data.movie.casts;
    ctx.setFillStyle('#000');
    ctx.setFontSize(20);
    let contentHh = 20 * 1.3;
    let [contentLeng, contentArray, contentRows] = utils.textByteLength(str, strLength);
    for (let i = 0; i < contentArray.length; i++) {
      ctx.fillText(contentArray[i], 40, 300 + contentHh * i);
    }
    ctx.arc(61, 381, 21, 0, 2 * Math.PI);
    ctx.fill();
    ctx.drawImage('/images/avatar/1.png', 41, 361, 40, 40);
    ctx.setFontSize(16);
    ctx.fillText(this.data.movie.title,100,376)
    ctx.setFontSize(14);
    ctx.fillText(this.data.movie.directors, 100, 394)
    ctx.drawImage("/images/logo.png", 40, 521, 60, 30)
    ctx.setFontSize(12);
    ctx.fillText("长按小程序码", 215, 529);
    ctx.fillText("查看作品详情", 215, 549);

    ctx.draw();

    setTimeout(()=>{
      this.createImage();
    },500)
  },
  createImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      x:0,
      y:0,
      width:375,
      canvasId:"shareCanvas",
      height:603,
      fileType: 'jpg',
      success:(res)=>{
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res2) {
            that.setData({
              canvasImageSrc: res.tempFilePath
            })
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
            });
          },
          fail() {
            wx.hideLoading()
          }
        })
      }
    });
  }

})