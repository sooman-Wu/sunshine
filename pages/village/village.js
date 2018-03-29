// pages/village/village.js
const app = getApp()
const url = 'https://fengxi.cunwu.suitaquba.com/a/ios/';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: url + 'homePage?areaId='+options.id,
      method: 'GET',
      success: function(res) {
        const mapData = res.data.data.bannerList.map((item, index, arr) => {
            if (item.img.substring(0, 4) == 'http') {
              return {
                img: item.img
              }
            } else {
              return {
                img: 'https://fengxi.cunwu.suitaquba.com' + item.img
              }
            }
          });
          var content = res.data.data.area.content;
          wx.setStorageSync('content', content);
        that.setData({
          news: res.data.data.articleList,
          imgUrls: mapData,
          category: res.data.data.categoryList,
          guangbo: res.data.data.guangbo,
          title: options.title,
          areaid: options.id
        });
        wx.setNavigationBarTitle({
          title: that.data.title//页面标题为路由参数
        })
      }
    })
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
