//index.js
//获取应用实例
const app = getApp();

Page( {
    data: {
      isAuth: false
    },
    onLoad() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting["scope.userInfo"]) {
            this.setData({
              isAuth: true
            });
            wx.showLoading({
              title: "信息获取中"
            });
            wx.getUserInfo({
              success: (res)=> {
                Object.assign(app.globalData.user,res.userInfo);
                this.navigateTo();
              }
            })
          }
        }
      })
    },
    getUserInfo(e) {
      let userInfo = e.detail.userInfo;
      if (userInfo) {
        wx.showToast({
          title: '授权成功',
          icon: 'success',
          duration: 1000,
          success: ()=> {
            Object.assign(app.globalData.user,userInfo);
            this.navigateTo();
          }
        })
      }else {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 2000
        })
      }
    },
    navigateTo() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
});
