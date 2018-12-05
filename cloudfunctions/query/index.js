// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const queryCollection = db.collection("queryList");

// 云函数入口函数
exports.main = async (event, context) => {
  let page = (event.pageNumber -1) * 10,
      size = event.pageSize,
      total = await queryCollection.count(),
      data = await queryCollection.skip(page).limit(size).get();
  return {total,data};
};