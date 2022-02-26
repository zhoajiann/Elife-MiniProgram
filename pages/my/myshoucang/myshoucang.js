// pages/lifeTips/lifeTipsName/lifeTipsName.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据
    wx.request({
      url:app.globalData.url+'wxuser/userCollection',
      header: {
        "authorization": wx.getStorageSync('token')
      },
      success:(res)=>{
        console.log(res.data)
        this.setData({
          list:res.data
        })
      }
    }) ,
    wx.request({
      url:app.globalData.url+'wxuser/userCollection',
      header: {
        "authorization": wx.getStorageSync('token')
      },
      success:(res)=>{
        let date = []
        console.log('res.data',res.data)
        console.log(res.data[0]['date'].slice(0,10));
        for(let i=0;i<res.data.length;i++){
          date[i]=res.data[i]['date'].split('/')[2]+'/'+res.data[i]['date'].split('/')[0]+'/'+res.data[i]['date'].split('/')[1]
        }
        this.setData({
          list:res.data.reverse(),
          date:date
        })
      }
    })
  },

  // 页面跳转
  goToPage:function(event){
    console.log(event)
    wx.navigateTo({
      url:'/pages/lifeTips/lifeTipDetail/lifeTipDetail?id='+event.currentTarget.id
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