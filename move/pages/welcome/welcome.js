Page({
  onTap : function(){
    // 跳转到子页面（又返回）
    wx.navigateTo({
      url:"../post/post"
    });
    // 跳转到同级页面（无返回）
    // wx.redirectTo({
    //   url: "../post/post"
    // })
    // navigateTo, redirectTo 只能打开非 tabBar 页面。
    // switchTab 只能打开 tabBar 页面。
    wx.switchTab({
      url: "../post/post"
    });
  }
})