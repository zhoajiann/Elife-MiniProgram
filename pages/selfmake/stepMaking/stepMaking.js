// pages/selfmake/stepMaking/stepMaking.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  ChooseImage() {
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          stepimg: res.tempFilePaths[0]
        })
        wx.showModal({
          title:'教程制作指引',
          content: '请点击确定步骤操作点位置',
          showCancel:false
        })
      }
    });
  },

// 文字描述弹框的显示、隐藏
  showModal(e) {
    this.setData({
      modalName: 'DialogModal'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  // 获得坐标点 单位px
  getDote(e){
    let that = this;
    const i = that.data.i;
    that.setData({
      dote1:e.detail.x,
      dote2:e.detail.y,
    })
    if(this.data.dote1 && this.data.dote2){
      that.showModal()
    }
  },

  // 获得文字描述
  getSteptext(e){
    let that = this;
    that.setData({
      steptext:e.detail.value
    })
  },

  // 上传func
  uploadFunc(){
    let that = this;
    const appFunc = wx.getStorageSync('appFunc')
    wx.uploadFile({
      url: app.globalData.url+'wxuser/uploadFunc',//上传图片请求接口
      filePath:appFunc.logo,//要上传图片的路径
      name:'logo',//图片对应的key，开发者在服务器端可以通过这个key获取文件的二进制内容
      header:{
        "authorization":wx.getStorageSync('token')
      },
      formData:({
        appName:appFunc.appName,
        funcName:appFunc.funcName,
      }),
      success:function(res){
        console.log(res.data)
        that.uploadSteps(res.data)
      }
    })
  },
  // 上传steps
  uploadSteps(funcid){
    let that = this;
    const steps = wx.getStorageSync('steps')
    for(let i=0;i<steps.length;i++){
      wx.uploadFile({
        url:  app.globalData.url+'wxuser/uploadStep',
        filePath: steps[i].stepimg,
        name: 'stepimg',
        header:{
          "authorization":wx.getStorageSync('token')
        },
        formData:({
          funcid:funcid,
          stepid:steps[i].stepid,
          dote1:steps[i].dote1,
          dote2:steps[i].dote2,
          steptext:steps[i].steptext
        }),
        success:function(res){
        }
      })
    }
  },

  // 继续制作 or 完成制作
  stepMake(e){
    let that = this;
    const step  = {
      stepid:that.data.stepid,
      stepimg:that.data.stepimg,
      dote1:that.data.dote1,
      dote2:that.data.dote2,
      steptext:that.data.steptext,
    }
    const steps = wx.getStorageSync('steps')
    steps.push(step)
    wx.setStorageSync('steps', steps)
    // 继续制作 isfinish=0
    if(e.currentTarget.dataset.isfinish==0){
      wx.navigateTo({
        url: '/pages/selfmake/stepMaking/stepMaking',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { stepid : that.data.stepid})
        }
      })
    }else{
      that.uploadFunc()
      wx.switchTab({
        url: '/pages/share/shareList/shareList',
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let num = 0
    const eventChannel = that.getOpenerEventChannel()
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
      num = parseInt(data.stepid) + 1
    })
    that.setData({
      stepid:num
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