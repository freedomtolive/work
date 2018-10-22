var app = getApp();

function http(a, callBack) {
  var that = this;
  wx.request({
    url: app.globalData.commonUrl + a,
    data: {
    },
    header: {
      "CONTENT-TYPE": "application/JSON"
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (data) {
      callBack(data.data, a);
    },
    fail: function (res) {
      console.log(fail)
    },
    complete: function (res) { },
  })
}

function getInfo(callBack){
  wx.getSystemInfo({
    success:(data)=>{
      callBack(data)
    }
  })
}

module.exports = {
  http:http,
  getInfo:getInfo
}