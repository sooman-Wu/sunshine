const url = 'https://fengxi.cunwu.suitaquba.com/a/ios/';
const app = getApp()
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
  onLoad: function(options) {
    var that = this;
    showView: (options.showView == "true" ? true : false);
    // var queryBean = JSON.parse(options.queryBean);
    // that.setData({
    //   queryBean: queryBean
    // })
    // console.log(queryBean);
  },

  formSubmit: function(e) {
    var showView = false;
    var name = e.detail.value.user;
    var pass = e.detail.value.pass;
    var that = this;
    wx.request({
      url: url + 'login?name=' + name + '&password=' + pass,
      method: 'POST',
      success: function(res) {
        if (res.data.status == '0') {
          var sessionId = res.data.data.id;
          wx.setStorageSync('sessionId', sessionId);
          wx.reLaunch({
            url: '../index/index'
          })
        } else if (res.data.status == '1'||res.data.status == '-1'){
          that.setData({
            showView: true
          });
          setTimeout(function () {
            that.setData({
              showView: false
            });
          },2000)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
