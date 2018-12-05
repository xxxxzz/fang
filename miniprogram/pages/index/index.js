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
    onLoad () {
      wx.cloud.callFunction({
        name: "login"
      }).then(res=>{
        Object.assign(app.globalData.user,res.result);
      });
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
        let tp = this.data.list,
            data=  res.result.data.data,
            total = res.result.total.total;
        tp = tp.concat(data);
        this.setData({
          list: tp,
          total: total
        });
        wx.hideLoading();
      })
    },
    onReachBottom() {
      let total = this.data.total,
          len = this.data.list.length,
          pageNumber = ++this.data.pageNumber;
      if (total > len) {
        this.setData({
          pageNumber: pageNumber
        },()=>{
          this.query();
        })
      }
    },
});
