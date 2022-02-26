// pages/my/myHome/myHome.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    user:wx.getStorageSync('user'),
    userInfo:wx.getStorageSync('userInfo')
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  login:function(e){
    if(e.currentTarget.id=== '/pages/my/people/people'){
      wx.navigateTo({
        url: e.currentTarget.id,
      })
    }else if(wx.getStorageSync('user')){
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url: e.currentTarget.id,
      })
    }else{
      wx.showModal({
        title: '登录',
        showCancel:false,
        content: '请先去我的页面登录',
        success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/my/myHome/myHome',
          })
        }
        }
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善用户资料', 
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('user', true)
        wx.setStorageSync('userInfo', res.userInfo)
        wx.request({
          url: app.globalData.url+'wxuser/saveUser',
          data:{
            nickName:res.userInfo.nickName,
            avatarUrl:res.userInfo.avatarUrl
          },
          method:'POST',
          header:{
            'authorization':wx.getStorageSync('token'),
            'content-type':'application/x-www-form-urlencoded'
          },
          success:res=>{
            console.log(res.data)
          }
        })
      }
    })

    wx.request({
      url: app.globalData.url+'wxuser/userPoint',
      header:{
        "authorization":wx.getStorageSync('token')
      },
      success:res=>{
        this.setData({
          score:res.data
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
    wx.request({
      url: app.globalData.url+'wxuser/userPoint',
      header:{
        "authorization":wx.getStorageSync('token')
      },
      success:res=>{
        this.setData({
          score:res.data
        })
      }
    })
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