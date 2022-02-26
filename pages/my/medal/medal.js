// pages/my/medal/medal.js
const app = getApp()
Page({

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

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[
      'https://www.licnzh.cn:1234/static/medal/level1.png',
      'https://www.licnzh.cn:1234/static/medal/level1_pre.png',
      'https://www.licnzh.cn:1234/static/medal/level2.png',
      'https://www.licnzh.cn:1234/static/medal/level2_pre.png',
      'https://www.licnzh.cn:1234/static/medal/level3.png',
      'https://www.licnzh.cn:1234/static/medal/level3_pre.png',
      'https://www.licnzh.cn:1234/static/medal/level4.png',
      'https://www.licnzh.cn:1234/static/medal/level4_pre.png',
      'https://www.licnzh.cn:1234/static/medal/level5.png',
      'https://www.licnzh.cn:1234/static/medal/level5_pre.png',
      'https://www.licnzh.cn:1234/static/medal/level6.png',
      'https://www.licnzh.cn:1234/static/medal/level6_pre.png',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
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
    this.setData({
      avatarUrl:wx.getStorageSync('userInfo').avatarUrl
    })
    wx.request({
      url: app.globalData.url+'wxuser/userPoint',
      header:{
        "authorization":wx.getStorageSync('token')
      },
      success:res=>{
        // 20 100 300 500 800 1000
        let num
        if(res.data<20){
          num = 0
        }else if(res.data>=20&&res.data<100){
          num = 1
        }else if(res.data>=100&&res.data<300){
          num = 2
        }else if(res.data>=300&&res.data<500){
          num = 3
        }else if(res.data>=500&&res.data<800){
          num = 4
        }else if(res.data>=800&&res.data<1000){
          num = 5
        }else{
          num = 6
        }
        this.setData({
          num:num
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