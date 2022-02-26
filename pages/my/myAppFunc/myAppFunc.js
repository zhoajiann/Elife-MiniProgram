// pages/my/myAppFunc/myAppFunc.js

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

function selectColor(){
  let color = ['red','yellow','blue','orange','green']
  let name = color[Math.floor(Math.random()*5)];
  return name;
};

function reviewState(state){
  if(state == 0){
    return "审核中";
  }else if(state == 1){
    return "已通过";
  }else if(state == 2){
    return "未通过";
  }
}

function reviewColor(state){
  if(state == 0){
    return "gray";
  }else if(state == 1){
    return "blue";
  }else if(state == 2){
    return "red";
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
      url: app.globalData.url + 'wxuser/wxUserOwnStep',
      // header: {
      //   "authorization": wx.getStorageSync('token')
      // },
      header: {
        'authorization': wx.getStorageSync('token'),
      },
      data: this.searchVal,
      success: res => {
        console.log(res.data)
        let data = res.data.map((item)=>(
          {
          ...item,
          
          // time:Date(item.time)
          time:timeTolocal(item.time),
          review:reviewState(item.review),
          color:reviewColor(item.review)
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
    this.searchVal = d.detail.value
  },

  // 页面跳转
  goToPage: function (e) {
    console.log('页面跳转')
    console.log(e.currentTarget.id);
    wx.setStorageSync('fun_id', e.currentTarget.id)
    let obj = JSON.stringify({
      id:wx.getStorageSync('fun_id'),
      type:"my"
    })
    wx.navigateTo({
      url: '/pages/share/sharePage/sharePage?id=' + obj,
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