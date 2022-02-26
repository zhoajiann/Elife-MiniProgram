// pages/lifeTips/lifeTipDetail/lifeTipDetail.js
const app = getApp();
// "pages/index/index",
//"pages/elife/guide/guide",
// "pages/elife/functionPage/functionPage",
// "pages/elife/detail/detail",
// "pages/elife/end/end"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: [],
    txt: [],
    audioState: false,
    CustomBar: app.globalData.CustomBar,
    loadProgress: 0
  },

  // like: function () {

  // },

  // 点赞
  getLike: function (options) {
    if (wx.getStorageSync('user')) {
      wx.request({
        url: app.globalData.url + 'wxuser/addLike',
        method: 'POST',
        data: wx.getStorageSync('passageId'),
        header: {
          "authorization": wx.getStorageSync('token')
        },
        success: res => {
          console.log('点赞成功')
          this.setData({
            ishidden: true
          })
          wx.request({
            url: app.globalData.url + 'wxuser/userLike',
            header: {
              "authorization": wx.getStorageSync('token')
            },
            success: res => {
              wx.removeStorageSync('zanlist')
              wx.setStorageSync('zanlist', res.data)
            },
            fail: res => {
              console.log('获取列表失败')
            }
          })
          //请求用户头像
          wx.request({
            url: app.globalData.url + 'wxuser/getPassageData/' + this.options.id,
            method: 'GET',
            header: {
              "authorization": wx.getStorageSync('token')
            },
            success: res => {
              this.setData({
                greatPeopleAvatarurl: res.data
              })
              
            },
            fail: res => {
              console.log('获取列表失败')
            }
          })
        },
        fail: res => {
          console.log('点赞失败')
        }
      })
    } else {
      wx.showModal({
        title: '登录',
        showCancel: false,
        content: '请先去我的页面登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/myHome/myHome',
            })
          }
        }
      })
    }
  },

  // 取消点赞
  cancleLike: function (options) {
    if (wx.getStorageSync('user')) {
      wx.request({
        url: app.globalData.url + 'wxuser/cancelLike',
        method: 'DELETE',
        data: this.options.id,
        header: {
          "authorization": wx.getStorageSync('token')
        },
        success: res => {
          console.log('取消点赞')
          this.setData({
            ishidden: !this.data.ishidden
          })
          wx.request({
            url: app.globalData.url + 'wxuser/userLike',
            header: {
              "authorization": wx.getStorageSync('token')
            },
            success: res => {
              wx.removeStorageSync('zanlist')
              wx.setStorageSync('zanlist', res.data)
            },
            fail: res => {
              console.log('获取列表失败')
            }
          })
          wx.request({
            url: app.globalData.url + 'wxuser/getPassageData/' + this.options.id,
            method: 'GET',
            header: {
              "authorization": wx.getStorageSync('token')
            },
            success: res => {
              this.setData({
                greatPeopleAvatarurl: res.data
              })
              
            },
            fail: res => {
              console.log('获取列表失败')
            }
          })
        },
        fail: res => {
          console.log('取消失败')
        }
      })
    } else {
      wx.showModal({
        title: '登录',
        showCancel: false,
        content: '请先去我的页面登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/myHome/myHome',
            })
          }
        }
      })
    }
  },

  // 收藏
  getCollect: function (options) {
    if (wx.getStorageSync('user')) {
      wx.request({
        url: app.globalData.url + 'wxuser/addCollect',
        method: 'POST',
        data: wx.getStorageSync('passageId'),
        header: {
          "authorization": wx.getStorageSync('token')
        },
        success: res => {
          console.log('收藏成功')
          this.setData({
            colhidden: true
          })
          wx.request({
            url: app.globalData.url + 'wxuser/userCollection',
            header: {
              "authorization": wx.getStorageSync('token')
            },
            success: res => {
              wx.removeStorageSync('collist')
              wx.setStorageSync('collist', res.data)
            },
            fail: res => {
              console.log('获取列表失败')
            }
          })
        },
        fail: res => {
          console.log('收藏失败')
        }
      })
    } else {
      wx.showModal({
        title: '登录',
        showCancel: false,
        content: '请先去我的页面登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/myHome/myHome',
            })
          }
        }
      })
    }
  },
  // 取消收藏
  cancleCollect: function (options) {
    if (wx.getStorageSync('user')) {
      wx.request({
        url: app.globalData.url + 'wxuser/cancelCollect',
        method: 'DELETE',
        data: this.options.id,
        header: {
          "authorization": wx.getStorageSync('token')
        },
        success: res => {
          this.setData({
            colhidden: !this.data.colhidden
          })
          console.log('取消收藏')
          wx.request({
            url: app.globalData.url + 'wxuser/userCollection',
            header: {
              "authorization": wx.getStorageSync('token')
            },
            success: res => {
              wx.removeStorageSync('collist')
              wx.setStorageSync('collist', res.data)
            },
            fail: res => {
              console.log('获取列表失败')
            }
          })
        },
        fail: res => {
          console.log('取消失败')
          wx.setStorageSync('colhidden', false)
        }
      })
    } else {
      wx.showModal({
        title: '登录',
        showCancel: false,
        content: '请先去我的页面登录',
        success: function (res) {
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
    let hi = wx.getStorageSync('zanlist')
    let li = wx.getStorageSync('collist')
    if (hi) {
      this.setData({
        ishidden: hi.some((item) => item.id == this.options.id),
      })
    }

    if (li) {
      let lhidden = li.some((item) => item.id == this.options.id)
      this.setData({
        colhidden: lhidden
      })
    }
    // 存文章id
    wx.setStorageSync('article_id', this.options.id)
    console.log(wx.getStorageSync('article_id'))
    console.log(123456);
    
    // 请求相应的页面
    wx.request({
      url: app.globalData.url + 'usepassage/' + this.options.id,
      success: res => {
        wx.setStorageSync('passageId', res.data[0].id)
        this.setData({
          article: res.data[0],
        })
        console.log(res.data[0]);
        

        // 请求文章内容   
        wx.request({
          url: app.globalData.url + 'static/passage/content/' + res.data[0].name,
          success: res => {
            this.setData({
              content: res.data
            })
            console.log(res.data);
            
          },
        }),
        //请求文章点赞收藏状态

        wx.request({
          url: app.globalData.url + 'wxuser/getPassageState/' + res.data[0].id,
          method:'GET',
          header: {
            "authorization": wx.getStorageSync('token')
          },
          success:res=>{
            if (wx.getStorageSync('user')) {
              if(res.data.like){
                this.setData({          
                  ishidden: true,
                })
              }else{
                this.setData({        
                  ishidden: false,
                })
              }
              if(res.data.collect){
                this.setData({           
                  colhidden: true,
                })
                console.log(res.data.collect)
              }else{
                this.setData({           
                  colhidden: false,
                })
              }
            }else{
              this.setData({          
                ishidden: false,
                colhidden: false,
              })
            }   
          },
          fail: res => {
            console.log('获取列表失败')
          }
        })
        //请求点赞用户头像
        wx.request({
          url: app.globalData.url + 'wxuser/getPassageData/' + this.options.id,
          method: 'GET',
          header: {
            "authorization": wx.getStorageSync('token')
          },
          success: res => {
            this.setData({
              greatPeopleAvatarurl: res.data
            })
            
          },
          fail: res => {
            console.log('获取列表失败')
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 创建音频上下文
    this.audioCtx = wx.createAudioContext('audio')
  },

  // 播放控制
  audioPlay: function () {
    let state = this.data.audioState;
    // 播放
    if (state === false) {
      console.log('播放')
      this.audioCtx.play()
      this.setData({
        audioState: true
      })
    }
    // 暂停
    else if (state === true) {
      console.log('暂停')
      this.audioCtx.pause()
      this.setData({
        audioState: false
      })
    }
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log('share', res.target)
    }
    return {
      title: '分享',
      path: 'pages/lifeTips/lifeTipDetail/lifeTipDetail',
    }
  }
})