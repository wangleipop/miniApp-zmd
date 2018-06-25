//index.js
const app = getApp()
var base = require('../../base/base.js')
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../base/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    status: true,
    input_value: "",
    res:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: '',
    imgUrls : [],
    total:[],
    tabTxt: ['按风格','按户型'],
    tab: [false, true, true],
    freeImg: [
      "https://www.zmdzs.com/AppService/xcxImg/menu_b.png?"+ Math.random(),
      "https://www.zmdzs.com/AppService/xcxImg/menu_c.png?" + Math.random(),
      "https://www.zmdzs.com/AppService/xcxImg/menu_d.png?" + Math.random(),
      "https://www.zmdzs.com/AppService/xcxImg/menu_banner.png?" + Math.random(),
      "https://www.zmdzs.com/AppService/xcxImg/contactUs.png?" + Math.random(),
    ],
    cases:[
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/simple.png?" + Math.random(),},
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/European.png?" + Math.random(),},
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/countryside.png?" + Math.random() ,},
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/Chinese.png?" + Math.random(),},
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/Mediterranean.png?" + Math.random(),},
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/mix-and-match.png?" + Math.random(),},
    ],
    house:[
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/Onehouse.png?" + Math.random(), },
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/Twohouse.png?" + Math.random(),},
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/Threehouse.png?" + Math.random() , },
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/Fourhouse.png?" + Math.random(), },
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/compound.png?" + Math.random(), },
      { "type": "", "url": "https://www.zmdzs.com/AppService/xcxImg/villa.png?" + Math.random(),},
    ],
    phone:[],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true
  },
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
  //联系客服
  call : function () {
    var that = this;
    var phone = this.data.phone;
    if(phone == "" ||  phone == undefined){
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
          fail:function(res){
            base.alertInit(res.errMsg);
          }
        })
      },
      fail: function (res) {
        base.alertInit(res.errMsg);
      }
    })
  },
  onLoad: function () {
    var that = this,city = '';
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: '0qiFWnsVCvwGN6vY7vyks1GvzGxFSkge'
    });
    //定位求失败时候
    var fail = function () {
      base.alert('百度地图api定位出现故障，为您跳转至紫名都装饰总部服务站');
      city= '北京市';
      var base64 = new base.Base64();
      app.globalData.city = city;
      //发送数据请求
      base.send('applet/index',
        { city: city, sequence: app.globalData.sequence }, function (err, res) {
          if (err != null) {
            base.alertInit(res.errMsg);
            return fail;
          }
          that.setData({
            imgUrls: res.data.result.advertise,
            total: res.data.result.combos,
            phone: res.data.result.telPhones
          });
          app.globalData.phone = res.data.result.telPhones
        });
    };
    //定位成功时候
    var success = function (data) {
      var city = data.originalData.result.addressComponent.city;
      app.globalData.city = data.originalData.result.addressComponent.city;
      var region = data.originalData.result.addressComponent.district;
      base.send('index/citys/isopen', { city: city, sequence: app.globalData.sequence, region: region},
      function (err ,res){
        if (err != null) {
          base.alertInit(res.errMsg);
        }
        if (res.data.result.isOpen == '1'){
          city = res.data.result.parameterCity;
        }else{
          base.alert('当前地区暂未开通，为您跳转至紫名都装饰总部服务站');
          city = '北京市';
        }
      });
      var base64 = new base.Base64();
      city = base64.encode(city);
      app.globalData.city = city;
      //发送数据请求
      base.send('applet/index',
        { city: city, sequence: app.globalData.sequence }, function (err, res) {
          if (err != null) {
            base.alertInit(res.errMsg);
          }
          that.setData({
            imgUrls: res.data.result.advertise,
            total: res.data.result.combos,
            phone: res.data.result.telPhones
          });
          app.globalData.phone = res.data.result.telPhones
        });
    }  
    //设置小程序title
    base.setTitle('紫名都装饰');

    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },
  seeMore: function (e) {//查看更多
    let index = e.currentTarget.dataset.index;
    switch(index){//0热门案例 1 整装套餐
      case "0":
        wx.switchTab({
          url: '../case/case',
        });
        break;
      case "1":
        wx.navigateTo({
          url: '../combo/combo',
        });
        break;
    }
  },
  goCase: function (e){//案例详情
    let targetId = e.currentTarget.dataset.id,
      targetName = e.currentTarget.dataset.name; 
      wx.navigateTo({
        url: '../web-view/web?code=4&targetId=' + targetId + '&targetName=' +                               targetName,
      })
  },
  goCombo : function (e){//进入整装套餐
    let targetId = e.currentTarget.dataset.id,
      targetName = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../web-view/web?code=5&targetId=' + targetId + '&targetName=' + targetName,
    })
  },
  formSubmit: function (e) {//提交form表单
    var that = this;
    if (e.detail.value.userName != "" && e.detail.value.phone != ""){
      if (/^1[345678]\d{9}$/.test(e.detail.value.phone)) {
        var data = e.detail.value;
        data.sequence = app.globalData.sequence;
        base.send('applet/delegate/make', data,function (err, res) {
          if(err == null){
            base.alertInit('提交数据成功');
            that.setData({
              input_value: ''
            });
          }else{
            base.alertInit(res.errMsg);
            return false;
          }
    });
      }else{
        base.alertInit('请输入正确的手机号');
      }
    }else{
      base.alertInit('请将数据填写完整');
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '紫名都装饰',
      desc: '紫名都装饰',
      path: 'pages/index/index'
    }
  },
  onShow: function () {
   
  }
})
