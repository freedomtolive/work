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
    fixedBl:false,
    selectShow:false,
    selectClass: null,
    selectHeight: null,
    selectAllIndex:1,
    selectRecoIndex:1,
    selectOwnerIndex:1,
    allHead:"全部",
    recoHead:"最新推荐",
    ownerHead:"所有者"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.http(app.globalData.commonUrl + "/work/getList", this.addHomeList);
    utils.http(app.globalData.commonUrl + "/select/selectList", this.addSelect);
    let allHeight = wx.getSystemInfoSync().windowHeight - 50;
    this.setData({
      selectHeight: allHeight 
    })
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
  // 页面选单渲染函数
  addSelect(data){
    let selectlist = data.data;
    this.setData({
      selectlist: selectlist
    })
  },
  enterWork:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../work/workItem?id=' + id
    });
  },
  // 选择浮层展示
  selectFun:function(e){
    this.setData({
      selectShow:true,
      selectClass: e.currentTarget.dataset.value
    })
  },
  selectAllFun:function(e){
    this.setData({
      selectAllIndex: e.currentTarget.dataset.index,
      selectShow: false,
      allHead: e.currentTarget.dataset.value
    })
  },
  selectItemFun:function(e){
    this.setData({
      selectRecoIndex: e.currentTarget.dataset.index,
      selectShow: false,
      recoHead: e.currentTarget.dataset.value
    })
  },
  selectOwnerFun:function(e){
    this.setData({
      selectOwnerIndex: e.currentTarget.dataset.index,
      selectShow: false,
      ownerHead: e.currentTarget.dataset.value
    })
  },
  maskHide:function(){
    this.setData({
      selectShow: false
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})