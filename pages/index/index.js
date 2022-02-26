//index.js
//获取应用实例
const app = getApp();
let id;

Page({
 
  data:{
      //轮播图
    cardCur: 0,
 
  },

// 请求轮播图数据
  DotStyle(e) {
  },


  // modal模态框
  showModal(e) {
    console.log(e)
    console.log(e.currentTarget.id)
    wx.setStorageSync('type_id', e.currentTarget.id)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 请求轮播图数据
    console.log(app.globalData.url)
    wx.request({
      url:app.globalData.url+'banner',
      success:(res)=>{
        console.log(res.data);
        
        this.setData({
          swiperList:res.data
        })
      }
    }),
    // 请求应用列表数据
    wx.request({
      url: app.globalData.url+'useapp',
      success: (res) => {
        this.setData({
          list: res.data
        })
      }
    })
  },


  // 页面跳转
  goToPage: function () {
    wx.navigateTo({
      url: '/pages/elife/functionPage/functionPage?id='+wx.getStorageSync('type_id')
    })
    this.hideModal(
      
    )
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})