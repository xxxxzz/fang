// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const queryCollection = db.collection("queryList");

// 云函数入口函数
exports.main = async (event, context) => {
  let { title,url,desc} = event;
  try {
    return await queryCollection.add({
      data: {title,url,desc}
    })
  } catch (e) {
    console.log(e)
  }
}