// 引用百度地图微信小程序JSAPI模块 
const app = getApp()
var base = require('../../base/base.js')
Page({
  data: {
    bg: 'https://www.zmdzs.com/AppService/xcxImg/bg.png?' + Math.random() / 9999,
    right: 'https://www.zmdzs.com/AppService/xcxImg/right.png?' + Math.random() / 9999,
   
  },
  onLoad: function () {
    base.setTitle('个人中心');
  },
  call : function(){
    var that = this;
    //联系客服
    var phone = app.globalData.phone;
    if (phone == "" || phone == undefined){
      base.alertInit('暂无客服电话');
      return false;
    }
    wx.showActionSheet({
      itemList: phone,
      success: function (res) {
        var phone = that.data.itemList[res.tapIndex];
        wx.makePhoneCall({
          phoneNumber: phone,
          success: function () {
          },
          fail: function (res) {
            base.alertInit(res.errMsg);
          }
        })
      },
      fail: function (res) {
        base.alertInit(res.errMsg);
      }
    })
  }  
})