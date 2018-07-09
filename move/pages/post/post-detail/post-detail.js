var postsData = require("../../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    this.data.id = id;
    var postData = postsData.postList[id];
    this.setData({
      postKey: postData
    });
    var postsCollected = wx.getStorageSync("postsCollected");
    if (postsCollected){
      var postCollected = postsCollected[id];
      if (postCollected){
        this.setData({
          collected: postCollected
        })
      }else{
        this.setData({
          collected: false
        })
      }
    }else{
      var postCollected = {};
      postCollected[id] = false;
      wx.setStorageSync("postsCollected", postCollected);
    }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayingMusic:true
      })
    })
    // 监听音乐停止
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
    })
    // 监听音乐停止
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayingMusic: false
      })
    })
  },
  onCollectTap:function(ev){
    var postsCollected = wx.getStorageSync("postsCollected");
    var id = this.data.id;
    var postCollected = postsCollected[id];
    postCollected = !postCollected;
    postsCollected[id] = postCollected;
    this.showModal(postsCollected, postCollected);
    
  },
  showModal: function (postsCollected,postCollected){
    var that = this;
    wx.showModal({
      title:"收藏",
      content:  postCollected? "收藏该文章" : "取消收藏该文章",
      showCancel:"true",
      cancelText: "取消",
      cancelColor:"#333",
      confirmText: postCollected ?"收藏":"确认",
      confirmColor:"#405f80",
      success:function(res){
        if (res.confirm) {
          that.showToast(postsCollected, postCollected);
        }
      }
    })
  },
  showToast: function (postsCollected, postCollected){
    wx.setStorageSync("postsCollected", postsCollected);
    this.setData({
      collected: postCollected
    })
    // 收藏的插件
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  onShareTap: function(){
    var itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "小程序现在无法分享"
        })
      },
      fail: function (res){
      }
    })
  },
  onMusicTap: function(ev){
    var isPlayingMusic = !this.data.isPlayingMusic;
    var musicInfo = this.data.postKey.music
    if (isPlayingMusic){
      wx.playBackgroundAudio({
        dataUrl: musicInfo.musicSrc,
        title: musicInfo.musicText,
        coverImgUrl: musicInfo.musicImgUrl,
      })
    }else{
      wx.pauseBackgroundAudio();
    }
  },
  onUnload: function () {
    wx.stopBackgroundAudio();
  }
  
})