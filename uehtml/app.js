App({
  globalData: {
    commonUrl: "https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example",
    loginOff:false,
    nickName:null,
    avatarUrl:null
  },
  onLaunch:function(){
    var that = this;
    let openId = wx.getStorageSync("openid");
    if (openId) {
      // 此处要调登录的口
      that.globalData.loginOff = true;
      
    } else {
      that.globalData.loginOff = false;
    }

    wx.getUserInfo({
      success: function(res){
        that.globalData.nickName = res.nickName;
        that.globalData.avatarUrl = res.userInfo.avatarUrl;
      }
    })
  }
})