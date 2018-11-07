// pages/work/workItem.js
var utils = require("../../utils/utils.js");
var app = getApp();
var WxParse = require("../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.http(app.globalData.commonUrl + "/work/workItem", this.addWork);
  },
  addWork(data){
    this.setData({
      imgList: data.data.images,
      content: data.data.content
    })
    WxParse.wxParse("article", 'html', this.data.content,this, 5)
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