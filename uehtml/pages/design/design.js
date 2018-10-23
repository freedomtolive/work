// pages/design/design.js
let utils = require("../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    isEmpty: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    utils.http("/work/getDesignList", this.addDesignList);
  },
  addDesignList:function(data){
    var list = [];
    if (!this.data.isEmpty) {
      list = [...this.data.list, ...data.list];
    } else {
      list = data.list;
      this.data.isEmpty = false;
    }
    this.setData({ list: list })
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
    utils.http("/work/getDesignList", this.addDesignList);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    utils.http("/work/getDesignList", this.addDesignList);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})