const url = 'https://fengxi.cunwu.suitaquba.com/a/ios/';
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: url + 'articleDetail?id='+options.id,
      method: 'GET',
      success: function (res) {
        var gonglue = res.data.data.articleData.content;
        WxParse.wxParse('gonglue', 'html', gonglue, that,0);
        that.setData({
          title: options.title,
          detail: res.data.data
        }),
          wx.setNavigationBarTitle({
            title: that.data.title//页面标题为路由参数
          })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
