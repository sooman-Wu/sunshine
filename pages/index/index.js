//index.js
//获取应用实例
const app = getApp()
const url = 'https://fengxi.cunwu.suitaquba.com/a/ios/';
var WxParse = require('../../wxParse/wxParse.js');
var order = ['street0', 'street1', 'street0']
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    toView: 'street0',
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tap1: function(e) {
    for (var i = 0; i > 0; --i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i - 1]
        })
        break
      }
    }
  },
  onLoad: function() {
    var that = this;
    if (wx.getStorageSync('sessionId') == '') {
      wx.redirectTo({
        url: '../login/login'
      })
    }else {
      wx.request({
        url: url + 'areaMap?areaId=a20324a3d31b49c2a56adf48913c0b04',
        method: 'GET',
        success: function(res) {
          let mapData = [];
          let result = [];
          let count = [];
          for (var i = 0; i < res.data.data.areaList.length; i++) {
            if (res.data.data.areaList[i].type == '5') {
              mapData.push(res.data.data.areaList[i])
            }
          };
          for (var x = 0; x < Math.ceil(mapData.length / 6); x++) {
            var start = x * 6;
            var end = start + 6;
            count.push(x);
            result.push(mapData.slice(start, end));
          };
          var gonglue = res.data.data.content;
          WxParse.wxParse('gonglue', 'html', gonglue, that,0);
          that.setData({
            count: count,
            content: gonglue,
            street: result
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
