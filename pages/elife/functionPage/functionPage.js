// pages/elife/functionPage/functionPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_id:wx.getStorageSync('type_id'),
    icons: {
      'icon-taobao_fun1': 'cuIcon-roundcheck',
      'icon-taobao_fun2': 'cuIcon-time',
      'icon-taobao_fun3': 'cuIcon-time'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过this.options.id获取到传过来的view的id值
    console.log(this.options.id)
    // 把选择的应用类型（type）存起来
    // wx.setStorageSync('type_id',this.options.id)
    // 请求相应的页面   
    wx.request({
      url: app.globalData.url+'useapp/' + this.options.id,
      success: res => {
        console.log(res.data)
        this.setData({
          choice: res.data,
        })
      }
    })
  },

  // 页面跳转
  goToPage: function (event) {
    console.log(event)
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/elife/detail/detail?id=' + event.currentTarget.id
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