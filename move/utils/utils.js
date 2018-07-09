var app = getApp();
function http(a,b,c,callBack) {
  var that = this;
  wx.request({
    url: app.globalData.g_commonUrl + a,
    data: {
      "count": b,
      "start": c,
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

function covertToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length-2);
}

function covertToCastInfo(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img:casts[idx].avatars?casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

function textByteLength(text, num){  // text为传入的文本  num为单行显示的字节长度
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
  covertToCastString : covertToCastString,
  covertToCastInfo: covertToCastInfo,
  textByteLength: textByteLength
}

