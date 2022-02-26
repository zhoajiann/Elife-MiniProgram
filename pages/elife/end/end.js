// pages/elife/end/end.js

//bindtap="goToPage"
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

   // 页面跳转 
   //bindtap="goToPage"
   //open-type="getUserInfo" bindgetuserinfo="getUserInfo"
  getLogin: function (event) {
    console.log(event)
    // app.globalData.userInfo = event.detail.userInfo
    // wx.navigateTo({
    //   url: '/pages/elife/functionPage/functionPage?id=' + wx.getStorageSync('type_id')
    // })
     // 向后台发送数据
     if(app.globalData.userInfo){
      wx.switchTab({
        url: '/pages/index/index',
      })
      wx.request({
              url:'http://211.159.166.29:1234/wxuser/changepoints',
              method:'POST',
                header: {'authorization':wx.getStorageSync('token')},
              success:res=>{
                console.log('submit success')
              },
              fail:res=>{
                console.log('submit fail');
            },
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