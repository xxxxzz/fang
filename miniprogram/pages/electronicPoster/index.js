//index.js
//获取应用实例
const app = getApp();

Page( {
    data: {
      list: [],
      pageSize: 10,
      pageNumber: 1,
      total: 0
    },
    onLoad (options) {
      wx.cloud.callFunction({
        name: "login"
      }).then(res=>{
        Object.assign(app.globalData.user,res.result);
        this.query();
      })
    },
    query() {
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
        })
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
