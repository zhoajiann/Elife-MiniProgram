// pages/share/share.js

const app = getApp();
let id;

function timeTolocal(time) {
  console.log(Date(time));
  var date = new Date(time*1);
  
    let year = date.getFullYear();
    let month= date.getMonth()+1;　　　//月,因为是从0开始的,所以要加一
    let dates = date.getDate();　　　//日
    return `${year}/${month}/${dates}`;
};

function selectColor(item){
  console.log(item);
  
  if(item == "推荐"){
    return 'orange';
  }else if(item == "不错"){
    return 'green';
  }else{
    return 'blue';
  }
};

function changName(username){
    if(username.length<4){
      return username;
    }else{
      return username.slice(0,3) + '...';
    }

}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    i: 0,
    text_value: '',
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据
    wx.request({
      url: app.globalData.url + 'searchFunc',
      // header: {
      //   "authorization": wx.getStorageSync('token')
      // },
      method: 'POST',
      header: {
        // 'authorization': wx.getStorageSync('token'),
        "Content-Type" : "text/plain"
      },
      data: '',
      success: res => {
        console.log(res.data)
        let data = res.data.map((item)=>(
          {
          ...item,
          reason1:item.reason.split(' ').map((item)=>({
            name:item,
            color:selectColor(item)
          })),
          username:changName(item.username),
          // time:Date(item.time)
          time:timeTolocal(item.time)
          }
        ))
        console.log(data);
        
        this.setData({
          list: data,
        })
      }
    })

    // // 取 reason
    // let recommand = this.data.list.map(function rec(item,index){
    //   return item[index].reason
    // })

    // console.log(recommand);
    

  },

  searchVal: '',
  cacheKwd: function (d) {
    this.setData({
      inputValue: d.detail.value,
    })
    this.searchVal = d.detail.value
    this.search()
  },

  // 搜索
  search: function () {
    // 上传搜索数据
    // if (wx.getStorageSync('user')) {
      wx.request({
        url: app.globalData.url + 'searchFunc/',
        method: 'POST',
        header: {
          // 'authorization': wx.getStorageSync('token'),
          "Content-Type" : "text/plain"
        },
        data: this.data.inputValue,
        success: res => {
          console.log(res.data)
          let data = res.data.map((item)=>(
            {
            ...item,
            reason1:item.reason.split(' ').map((item)=>({
              name:item,
              color:selectColor(item)
            })),
            // time:Date(item.time)
            username:changName(item.username),
            time:timeTolocal(item.time)
            
            }
          ))
          console.log(data);
          
          this.setData({
            list: data,
          })
        },
        fail: res => {
          console.log('submit fail');
        },
      })
    // } else {
    //   wx.showModal({
    //     title: '登录',
    //     showCancel: false,
    //     content: '请先去我的页面登录',
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.switchTab({
    //           url: '/pages/my/myHome/myHome',
    //         })
    //       }
    //     }
    //   })
    // }
  },

  deleteText : function(){
    this.setData({
      inputValue: '',
    })
    this.search()
  },


  // 页面跳转
  goToPage: function (e) {
    console.log('页面跳转')
    console.log(e.currentTarget.id);
    wx.setStorageSync('fun_id', e.currentTarget.id)
    let obj = JSON.stringify({
      id:wx.getStorageSync('fun_id'),
      type:"share"
    })
    wx.navigateTo({
      url: '/pages/share/sharePage/sharePage?id=' + obj
    })
  },

  writeShare:function(){

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
      wx.navigateTo({
        url:  '/pages/selfmake/makeTips/makeTips'
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

    // 请求数据
    wx.request({
      url: app.globalData.url + 'searchFunc',
      // header: {
      //   "authorization": wx.getStorageSync('token')
      // },
      method: 'POST',
      header: {
        // 'authorization': wx.getStorageSync('token'),
        "Content-Type" : "text/plain"
      },
      data: this.data.inputValue,
      success: res => {
        console.log(res.data)
        let data = res.data.map((item)=>(
          {
          ...item,
          reason1:item.reason.split(' ').map((item)=>({
            name:item,
            color:selectColor(item)
          })),
          // time:Date(item.time)
          username:changName(item.username),
          time:timeTolocal(item.time)
          
          }
        ))
        console.log(data);
        
        this.setData({
          list: data,
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