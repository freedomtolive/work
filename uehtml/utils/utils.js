var app = getApp();

function http(a, callBack,c) {
  var that = this;
  wx.request({
    url: a,
    data: c,
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
      console.log(res)
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

function textByteLength(text, num) {  // text为传入的文本  num为单行显示的字节长度
  let strLength = 0; // text byte length
  let rows = 1;
  let str = 0;
  let arr = [];
  for (let j = 0; j < text.length; j++) {
    if (text.charCodeAt(j) > 255) {
      strLength += 2;
      if (strLength > rows * num) {
        strLength++;
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    } else {
      strLength++;
      if (strLength > rows * num) {
        arr.push(text.slice(str, j));
        str = j;
        rows++;
      }
    }
  }
  arr.push(text.slice(str, text.length));
  return [strLength, arr, rows]   //  [处理文字的总字节长度，每行显示内容的数组，行数]
}

module.exports = {
  http:http,
  getInfo:getInfo,
  textByteLength: textByteLength
}