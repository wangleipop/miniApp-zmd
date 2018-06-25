// pages/caseDetail/caseDetail.js
const app = getApp()
var base = require('../../base/base.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      arr : '',
      title: ['风格','户型'],
      style_id: 0,
      house_id: 0,
      logo: "https://www.zmdzs.com/AppService/miniApp-zmd/img/ic_lll.png" + Math.random(),
      offset : 1,
      json : {
        sequence: app.globalData.sequence,
        city: app.globalData.city,
        houseTyle: '',
        classify: '',
        style: ''
      },
      isopen : 'true',
      styles : [],
      houses: [],
      tab: [true,true],
      status: true,
      city: app.globalData.city,
  },
  /**
   * tab 切换 
   */ 
  switchover : function (e){
    var arr = [true, true], index = e.currentTarget.dataset.index;
    arr[index] = !this.data.tab[index];
    this.setData({
      tab : arr
    })
  },
  /*
  * 分类点击事件
  */ 
  classify : function(e){
    var that = this, index = e.currentTarget.dataset.index, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt;
    var title = this.data.title;
    var tabstatus = [true,true];
    this.setData({
      tab: tabstatus
    })
    switch (index) { 
      case '0':
        title[0] = txt;
        that.setData({
          title : title,
          style_id: id
        })
        break;
      case '1':
        title[1] = txt;
        that.setData({
          title : title,
          house_id: id
        })
        break;
    }
    var json = this.data.json;
    json.offset = 1;
    json.city = app.globalData.city;
    json.houseTyle = this.data.house_id;
    json.style = this.data.style_id;
    if (json.houseTyle == '0') json.houseTyle = '';
    if (json.style == '0') json.style = '';
    base.send('applet/cases', json, function (err, res) {
      if (err != null) {
        base.alertInit(res.errMsg);
        return false;
      }
      that.setData({
        arr: res.data.result.cases
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var json = this.data.json;
    json.houseTyle = this.data.house_id;
    json.style = this.data.style_id;
    if (json.houseTyle == '0') json.houseTyle = '';
    if (json.style == '0') json.style = '';
    json.offset = 1;
    json.city = app.globalData.city;
    // 初始化分类
    base.send('applet/make/init', json, function (err, res) {
      if (err != null) {
        base.alertInit(res.errMsg);
        return false;
      }
      that.setData({
        styles: res.data.result.styles,
        houses: res.data.result.houseTypes
        
      })
    });
    //获取默认的数据
    base.send('applet/cases',json, function (err, res) {
        if (err != null) {
          base.alertInit(res.errMsg);
          return false;
        }
        that.setData({
          arr: res.data.result.cases
        })
    });
    base.setTitle('装修图库');
  },
  goCase: function (e){
    let targetId = e.currentTarget.id;
    wx.navigateTo({
      url: '../web-view/web?code=4&targetId=' + targetId,
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
  onReachBottom: function (e) {
    var that = this; 
    var offset = this.data.json.offset;
    offset +=1;
    var  json = this.data.json;
    json.offset = offset;
    json.city = app.globalData.city;
    json.houseTyle = this.data.house_id;
    json.style = this.data.style_id;
    if (json.houseTyle == '0') json.houseTyle = '';
    if (json.style == '0') json.style = '';
    this.setData({
      offset: offset
    })
    if(this.data.isopen  ==  'true'){
      base.send('applet/cases', json, function (err, res) {
        if (err != null) {
          wx.showToast({title: res.errMsg,icon: 'none'})
        }
        if (res.data.result.cases == "" || res.data.result.cases == undefined) {
          that.setData({isopen : 'false'});
          return false;
        }
        var arrs = that.data.arr;
        arrs = arrs.concat(res.data.result.cases)
        that.setData({arr: arrs})
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})