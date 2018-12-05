//index.js
//获取应用实例
const app = getApp();

Page( {
    data: {
      list: null,
      pageSize: 10,
      pageNumber: 1,
      total: 0
    },
    onLoad () {
      wx.cloud.callFunction({
        name: "login"
      }).then(res=>{
        Object.assign(app.globalData.user,res.result);
      })
    },
    onShow() {
      this.query();
    },
    query() {
      wx.showLoading({
        title: "加载中"
      });
      wx.cloud.callFunction({
        name: "query",
        data: {
          pageSize: this.data.pageSize,
          pageNumber: this.data.pageNumber
        }
      }).then(res=>{
        let data=  res.result.data.data,
            total = res.result.total.total;
        this.setData({
          list: data,
          total: total
        });
        wx.hideLoading();
      })
    },
    onReachBottom() {
      let total = this.data.total,
          len = this.data.list.length,
          pageNumber = ++this.data.pageNumber;
      if (total < len) {
        this.setData({
          pageNumber: pageNumber
        },()=>{
          this.query();
        })
      }
    },
});
