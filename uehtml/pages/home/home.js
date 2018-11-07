var utils = require("../../utils/utils.js");
var app = getApp();
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    isEmpty:true,
    fixedBl:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.http(app.globalData.commonUrl + "/work/getList", this.addHomeList);
    
  },
  // 页面渲染函数
  addHomeList(data){
    var list = [];
    if(!this.data.isEmpty){
      list = [...this.data.list, ...data.list];
    }else{
      list = data.list;
      this.data.isEmpty = false;
    }
    this.setData({list: list})
  },
  enterWork:function(ev){
    // console.log(ev.currentTarget.dataset.id);
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../work/workItem?id=' + id
    });
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
    this.setData({ list: [] })
    utils.http(app.globalData.commonUrl + "/work/getList", this.addHomeList);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    utils.http(app.globalData.commonUrl + "/work/getList", this.addHomeList);
  },
  // onPageScroll:function(e){
  //   if(e.scrollTop>0){
  //     this.setData({fixedBl: true})
  //   }else{
  //     this.setData({fixedBl: false})
  //   }
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})