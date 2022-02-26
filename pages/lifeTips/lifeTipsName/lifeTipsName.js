// pages/lifeTips/lifeTipsName/lifeTipsName.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },

  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },

  goToPage:function(e){
    console.log('/pages/lifeTips/lifeTipDetail/lifeTipDetail?id='+e.currentTarget.id)
    if(app.globalData.userInfo){
      wx.navigateTo({
        url:'/pages/lifeTips/lifeTipDetail/lifeTipDetail?id='+e.currentTarget.id,
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
    // 获取数据
    wx.request({
      url:app.globalData.url+'usepassage',
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
  // goToPage:function(event){
  //   console.log(event)
  //   wx.navigateTo({
  //     url:'/pages/lifeTips/lifeTipDetail/lifeTipDetail?id='+event.currentTarget.id
  //   })
  // },

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