//index.js
//获取应用实例
const app = getApp();

Page( {
    data: {
        title: "",
        url: "",
        desc: ""
    },
    onLoad (options) {

    },
    changeTitle(event) {
      this.setData({
        title: event.detail.value
      })
    },
    changeDesc(event) {
      this.setData({
        desc: event.detail.value
      })
    },
    uploadImage() {
      let self = this;
      wx.chooseImage({
        success (res) {
          const tempFilePaths = res.tempFilePaths[0];
          self.setData({
            url: tempFilePaths
          })
        }
      })
    },
    save() {
        if (this.check()){
          wx.cloud.uploadFile({
            cloudPath: "-",
            filePath: this.data.url
          }).then(res=>{
            wx.cloud.callFunction({
              name: "add",
              data: {
                title: this.data.title,
                url: res.fileID,
                desc: this.data.desc
              }
            }).then(res=>{
              if (res.result._id) {
                wx.showLoading({
                  title: '数据正在写入中',
                  duration: 2000,
                  success: function () {
                    wx.switchTab({
                      url: "/pages/index/index"
                    })
                  }
                });
              }
            })
          })
        }
    },
    check() {
        let title = this.data.title,
            url = this.data.url,
            desc = this.data.desc;
        if (title.trim() === "") {
          wx.showToast({
            title: '请填写标题',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        if (url === "") {
          wx.showToast({
            title: '请上传图片',
            icon: 'none',
            duration: 2000
          });
          return false;
        }
        if (desc.trim() === "") {
          wx.showToast({
            title: '请填写正文',
            icon: 'none',
            duration: 2000
          });
          return false;
         }
         return true;
    },
    cancel() {
      wx.navigateBack();
    }
});
