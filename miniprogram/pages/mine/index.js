//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
      infoLinkList: [
			{
				infoName: '新建文章',
				iconUrl: '../../images/porfile_entrance_icon_code.png',
				pageLink: '/pages/add/index'
			},{
				infoName: '个人海报',
				iconUrl: '../../images/porfile_entrance_icon_poster.png',
				pageLink: '/pages/electronicPoster/index'
			}
	  ],
      userInfo: {}
    },
    onLoad (options) {
    	this.setData({
          userInfo: app.globalData.user
		});
    },
	// 信息页跳转
	pageJump (e) {
		let _this = this;
		let pageUrl = e.currentTarget.dataset.link;
		if (pageUrl) {
			wx.navigateTo({
				url: pageUrl,
			})
		}
	}
})