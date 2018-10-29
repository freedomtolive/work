// pages/person/person.js
var utils = require("../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOff:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getUser:function(){
    wx.getUserInfo({
      success:(data)=>{
        this.logIn(data);
      }
    })
  },
  logIn:function(data){
    wx.login({
      success:(res)=>{
        // 登陆
        var code = res.code;
        if (res.code) {
          //发起网络请求
          this.getUserId(code);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      error:function(res){
        console.log("登录失败！" + res.errMsg )
      }
    })
  },
  getUserId(code){
    var url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx40efeb5d8f571045&secret=12e113e54de25e68f41b98b7d51db54f&js_code=" + code + "&grant_type=authorization_code";
    utils.http(url,this.getFinishId);
  },
  getFinishId(data){
    console.log(data)
    // 登陆成功(存cookie，并且登录（此处应该发送ajax，这里就直接登录）)
    wx.setStorageSync("openid", data.openid);
    this.setData({
      loginOff: true
    })
  },
  // 退出
  loginOff:function(){
    wx.clearStorageSync("openid");
    this.setData({
      loginOff: false
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