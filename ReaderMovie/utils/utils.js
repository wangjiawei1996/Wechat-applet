function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i=1;i<=5;i++){
      if(i<=num){
          array.push(1);
      }else{
          array.push(0);
      }
  }
  return array;
}
function http(url,callBack,data,method){
  wx.request({
    url: url,
    data: data||{},
    method: method||'GET',
    header: {'content-type': 'json'},
    success: function(res){
        callBack(res.data);
    },
    fail: function(res) {
    },
    complete: function(res) {
    }
  })
}
module.exports = {
  convertToStarsArray:convertToStarsArray,
  http: http
}