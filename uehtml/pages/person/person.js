// pages/person/person.js
var utils = require("../../utils/utils.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOff: null,
    avatarUrl: null,
    nickName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUser:function(){
    utils.getCode(this.getFinishId);
  },
  getFinishId(data){
    // 登陆成功(存cookie，并且登录（此处应该发送ajax，这里就直接登录）)
    wx.setStorageSync("openid", data.openid);
    app.globalData.loginOff = true;
    this.setData({
      loginOff: true
    })
  },
  // 退出
  loginOff:function(){
    wx.clearStorageSync("openid");
    app.globalData.loginOff = false;
    this.setData({
      loginOff: false
    })
  },
  // 跳转关注页面
  followFn:function(){
    wx.navigateTo({
      url: 'follow/follow'
    })
  },
  // 跳转粉丝页面
  fansFn: function () {
    wx.navigateTo({
      url: 'fans/fans'
    })
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
    this.setData({
      loginOff: app.globalData.loginOff,
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl
    })
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