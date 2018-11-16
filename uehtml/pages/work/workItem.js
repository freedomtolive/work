// pages/work/workItem.js
var utils = require("../../utils/utils.js");
var app = getApp();
var WxParse = require("../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:null,
    shareShow:false,
    loginOff: null,
    nickName: null,
    avatarUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取作品id
    // console.log(options.id)
    this.setData({
      loginOff: app.globalData.loginOff,
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl
    })
    utils.http(app.globalData.commonUrl + "/work/workItem", this.addWork);
  },
  addWork(data){
    var comment = data.data.comments;
    comment.valStr = "";
    this.setData({
      imgList: data.data.images,
      content: data.data.content,
      name: data.data.nickname,
      location: data.data.location,
      postdate: data.data.postdate,
      likes: data.data.likes,
      headImg: "/images/111.jpg",
      comments: comment
    });
    // console.log(this.data.comments)
    // WxParse.wxParse("article", 'html', this.data.content,this, 5);
  },
  shareShow:function(){
    this.setData({
      shareShow: true
    })
  },
  shareHide:function(){
    this.setData({
      shareShow: false
    })
  },
  // 查看图片
  viewImg:function(ev){
    let src = ev.currentTarget.dataset.src;
    var urls = [];
    this.data.imgList.forEach(function(value,item){
      urls.push(value.url);
    })
    wx: wx.previewImage({
      current: src,
      urls: urls
    })
  },
  // 分享图片
  canvasShow(res) {
    // console.log(res); 获取分享人信息
    this.setData({
      userName: res.detail.userInfo.nickName,
      head_img: res.detail.userInfo.avatarUrl
    })
    this.getImageInfo(this.data.headImg);
  },
  // 图片保存到本地赞不可用(需要查看原因)
  getImageInfo(url) {    //  图片缓存本地的方法
    var that = this;
    if (typeof url === 'string') {
      wx.getImageInfo({   //  小程序获取图片信息API
        src: url,
        success: function (res) {
          that.setData({
            movieImg: res.path
          })
          that.handlePoster()
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
  // 点击绘制按钮判断用户是否授权
  handlePoster(e) {
    wx.getSetting({  // 获取用户设置
      success: (res) => {
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
  canvasDraw() {
    const ctx = wx.createCanvasContext('shareCanvas');
    ctx.clearRect(0, 0, 0, 0);
    ctx.setFillStyle('red');
    ctx.fillRect(0, 20, 375, 483);
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 483, 375, 100);
    // 绘制图片
    ctx.drawImage(this.data.headImg, 40, 60, 295, 200);
    const strLength = 30;
    var str = this.data.name;
    ctx.setFillStyle('#000');
    ctx.setFontSize(20);
    let contentHh = 20 * 1.3;
    let [contentLeng, contentArray, contentRows] = utils.textByteLength(str, strLength);
    for (let i = 0; i < contentArray.length; i++) {
      ctx.fillText(contentArray[i], 40, 300 + contentHh * i);
    }
    ctx.arc(61, 381, 21, 0, 2 * Math.PI);
    ctx.fill();
    ctx.drawImage('/images/user/user-ico.jpg', 41, 361, 40, 40);
    ctx.setFontSize(16);
    ctx.fillText(this.data.name, 100, 376)
    ctx.setFontSize(14);
    ctx.fillText(this.data.location, 100, 394)
    ctx.drawImage("/images/workItem/logo.png", 40, 521, 60, 30)
    ctx.setFontSize(12);
    ctx.fillText("长按小程序码", 215, 529);
    ctx.fillText("查看作品详情", 215, 549);

    ctx.draw();

    setTimeout(() => {
      this.createImage();
    }, 500)
  },
  createImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 375,
      canvasId: "shareCanvas",
      height: 603,
      fileType: 'jpg',
      success: (res) => {
        that.setData({
          canvasImageSrc: res.tempFilePath
        })
        wx.previewImage({
          urls: this.data.canvasImageSrc.split(',')
        })
        wx.hideLoading();
      }
    });
  },
  //获取输入框的内容
  commentTitle:function (e) {
    let comments = this.data.comments;
    comments.valStr = e.detail.value;
    this.setData({
      comments: comments
    })
  },
  //回复
  replyFun : function(){
    
  },
  //评论
  commentFun : function(e){
    if (!this.data.comments.valStr) return;
    //评论的逻辑
    let commentObj = this.data.comments;
    let commentArr = commentObj.comment;
    let newCommentObj = {};
    if(this.data.loginOff){
      newCommentObj.id = Math.random().toFixed(5)*10000;
      newCommentObj.nickname = this.data.nickName;
      newCommentObj.userimage = this.data.avatarUrl;
      newCommentObj.postdate = "1分钟内";
    }else{

    }
    newCommentObj.content = this.data.comments.valStr;
    commentObj.valStr = "";
    commentObj.comment.unshift(newCommentObj);
    var totalComment = this.data.comments.comment.length;
    commentObj.totalComment = totalComment;
    this.setData({
      comments:commentObj
    })
    console.log(this.data.comments)
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