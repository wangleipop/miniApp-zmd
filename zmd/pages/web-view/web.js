// pages/web-view/web.js
const app = getApp()
var base = require('../../base/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      web : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     *  0  公司简介
     *  1  免费报价 
     *  2  免费量房
     *  3  免费设计
     *  4  案例详情
     *  5  整装详情
     *  6  紫钻工程
     */
    var base64  = new base.Base64();
    var city = base64.encode(app.globalData.city)
    var that = this
    var url = '';
    var title = '';
    switch (options.code){
      case "0":
        url = "" + app.globalData.url +"intro.html?sequence="+app.globalData.sequence;
        title = '公司简介';
        break;
      case "1" :
        url = "" + app.globalData.url + "offer.html?city="+city+"&sequence=" + app.globalData.sequence;
        title = '免费报价';
        break;
      case "2":
        url = "" + app.globalData.url + "measuringHouse.html?city=" + city +"&sequence=" + app.globalData.sequence;
        title = '免费量房';
        break;
      case "3":
        url = "" + app.globalData.url + "design.html?city=" + city +"&sequence=" + app.globalData.sequence;
        title = '免费设计';
        break;
      case "4":
        url = "" + app.globalData.url + "caseImg.html?city=" + city +"&targetId=" + options.targetId + "&sequence=" + app.globalData.sequence;
        title = '装修图库';
        break;
      case "5":
        title = '整装套餐';
        url = "" + app.globalData.url + "total.html?city=" + city +"&targetId=" + options.targetId + "&sequence=" + app.globalData.sequence;
        break;
      case "6":
        url = "" + app.globalData.url + "spar.html?city=" + city +"&sequence=" + app.globalData.sequence;
        title = '紫钻工程';
        break;
    }
    that.setData({
      web : url
    })
    base.setTitle(title);
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '紫名都装饰',
      path: '/pages/index/index' // 分享出去后打开的页面地址
    }
  }
})