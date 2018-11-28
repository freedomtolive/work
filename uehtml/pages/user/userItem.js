// pages/user/userItem.js
var app = getApp();
var utils = require("../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.http(app.globalData.commonUrl + "/user/userItem", this.addUser);
  },
  addUser: function(data){
    var list = [];
    if (!this.data.isEmpty) {
      list = [...this.data.list, ...data.data.workList];
    } else {
      list = data.data.workList;
      this.data.isEmpty = false;
    }

    this.setData({
      list:list,
      nickname:data.data.nickname,
      fanscount: data.data.fanscount,
      followcount: data.data.followcount,
      viewcount: data.data.viewcount
    })
    
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  enterWork: function (e) {
    // console.log(ev.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../work/workItem?id=' + id
    });
  },
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
    this.setData({ list: [] })
    utils.http(app.globalData.commonUrl + "/user/userItem", this.addUser);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    utils.http(app.globalData.commonUrl + "/user/userItem", this.addUser);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})