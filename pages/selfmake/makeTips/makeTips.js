// pages/selfmake/makeTips/makeTips.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  isMake(){
    let that =  this
    if(!wx.getStorageSync('user')){
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
    }else{
      if(that.data.points<20){
        wx.showModal({
          title: '温馨提示',
          showCancel:false,
          content: '您的积分不足20，无法制作教程。登录后学习一个教程即可加20积分哦',
          success: function(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/selfmake/makeTips/makeTips',
              })
            }
          }
        })
      }else{
        wx.navigateTo({
          url: '/pages/selfmake/make/make',
        })
      }
    }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let that = this
    wx.request({
      url: app.globalData.url+'wxuser/userPoint',
      header:{
        "authorization":wx.getStorageSync('token')
      },
      success:res=>{
        that.setData({
          points:res.data
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