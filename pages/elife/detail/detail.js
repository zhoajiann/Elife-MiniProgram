// pages/elife/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  step: '',
  onLoad: function (options) {
    // 功能类型
    let fun_id = this.options.id.substring(this.options.id.length - 4, this.options.length)
    console.log(fun_id)
    let type_id = wx.getStorageSync('type_id')
    console.log(type_id)
    // 请求页面
    wx.request({
      url: app.globalData.url + 'useapp/' + type_id + '?type=' + fun_id,
      success: res => {
        console.log(res.data)
        this.setData({
          step: res.data[0],
          steps: res.data,
          txt_left: res.data[0]['left'] + 20
        })
      }
    })
  },

  // 结束提醒
  showModal(e) {

  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  // 下一步
  nextStep: function () {
    console.log('下一步')
    let step = this.data.steps
    let i = this.data.i
    if (i < step.length) {
      i++
      console.log('当前', i)
      console.log(this.data.user);
      
      this.data.i = i
      this.setData({
        step: step[i],
      })
    }
    // 跳转到结束页

    if (i === step.length) {
      console.log("end")
      this.setData({
        target: 'Iamge',
        user:wx.getStorageSync('user')
      })
      console.log(this.data.target)
      this.setData({
        modalName: this.data.target
      })
      console.log(this.data.modalName)
      let state = this.data.modalName
    }
  },

  // 上一步
  preStep: function () {
    console.log('上一步')
    let step = this.data.steps
    let i = this.data.i
    if (i === 0) {
      console.log('这已经是第一步了')
    }
    if (i < step.length && i > 0) {
      console.log(i)
      i--
      this.data.i = i
      this.setData({
        step: step[i]
      })
    }
  },

  // 结束跳转
  getLogin: function (event) {
    console.log(wx.getStorageSync('user'));
    
    
     // 向后台发送数据
     if(wx.getStorageSync('user')){
      wx.switchTab({
        url: '/pages/index/index',
      })
      wx.request({
              url:app.globalData.url+'wxuser/changepoints',
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