var app = getApp();
const url = 'https://fengxi.cunwu.suitaquba.com/a/ios/';

var tempId = [];
Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
  },
  // loadnews:function(id) {
  //   wx.request({
  //     url: url + 'menuPage?parent='+id,
  //     method: 'GET',
  //     success: function (res) {
  //       that.setData({
  //         news1: res.data.data
  //       })
  //     }
  //   })
  // },
  // 滚动切换标签样式
  switchTab: function(e) {
    var that = this;
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    var id = e.target.dataset.id;
    var that = this;
    // that.setData({
    //   newsList: []
    // });
    // wx.request({
    //   url: url + 'articlePage?id=' + id + '&areaId=a20324a3d31b49c2a56adf48913c0b04',
    //   method: 'GET',
    //   success: function(res) {
    //     that.setData({
    //       newsList: res.data.data
    //     })
    //   }
    // });
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    if (this.data.currentTab > 2) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: url + 'menu?id=' + options.id + '&areaId=a20324a3d31b49c2a56adf48913c0b04',
      method: 'GET',
      success: function(res) {
        const count = [];
        const tempId = [];
        const newsList = [];
        for (var i = 0; i < res.data.data.length; i++) {
          count.push(i);
          tempId.push(res.data.data[i].id);
        };
        for(var j = 0;j< tempId.length;j++) {
          wx.request({
            url: url + 'articlePage?id=' + tempId[j] + '&areaId='+options.areaid,
            method: 'GET',
            success: function(data) {
              var tempList = data.data.data;
              newsList.push(tempList);
              that.setData({
                newsListArray: newsList
              })
            }
          });
        };
        console.log(newsList);
        that.setData({
          navSecond: res.data.data,
          count: count,
          title: options.title
          // newsListArray: newsList
        });
        wx.setNavigationBarTitle({
          title: that.data.title//页面标题为路由参数
        })
      },
    });

    // 高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    })
  },

  footerTap: app.footerTap
})
