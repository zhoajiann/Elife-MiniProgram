const app = getApp();
Page({
  data: {
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          logo: res.tempFilePaths
        })
        
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.logo,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.setData({
            logo: ''
          })
        }
      }
    })
  },


  startMake(e){
    let that = this;
    wx.request({
      url: app.globalData.url+'wxuser/userPoint',
      header:{
        "authorization":wx.getStorageSync('token')
      },
      success:res=>{
        console.log(res.data)
        that.setData({
          points:res.data
        })
      }
    })
    wx.setStorageSync('appFunc', {
      appName:e.detail.value.appName,
      funcName:e.detail.value.funcName,
      logo:this.data.logo[0]
    })
    wx.navigateTo({
      url:'/pages/selfmake/stepMaking/stepMaking',
      success: function (res) {
        wx.removeStorageSync('steps')
        wx.setStorageSync('steps', [])
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { stepid : 0})
      }
    })
  },
  



  
})