// pages/combo/combo.js
const app = getApp()
var base = require('../../base/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: '',
    logo: "https://www.zmdzs.com/AppService/miniApp-zmd/img/ic_lll.png",
    offset: 1,
    json: {
      sequence: app.globalData.sequence,
      city: app.globalData.city,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var json = this.data.json;
    json.offset = 1;
    base.send('applet/combos', json, function (err, res) {
      if (err != null) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
      that.setData({
        arr: res.data.result.combo
      })
    });
    base.setTitle('整装套餐');
  },  
  goCombo: function (e) {
    let targetId = e.currentTarget.id;
    wx.navigateTo({
      url: '../web-view/web?code=5&targetId=' + targetId,
    })
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
    var that = this;
    var offset = this.data.json.offset;
    offset += 1;

    var json = this.data.json;
    json.offset = offset;
    this.setData({
      offset: offset
    })
    base.send('applet/combos', json, function (err, res) {
      if (err != null) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      }
      if (res.data.result.combo == "" || res.data.result.combo == undefined){
          return false;
      }
      var arrs = that.data.arr;
      arrs = arrs.concat(res.data.result.combo)
      that.setData({
        arr: arrs
      })
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})