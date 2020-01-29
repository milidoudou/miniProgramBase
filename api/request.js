const env = 'dev'
const host = {
  dev: 'https://goalgcmvp-uat.nike.com/',
  uat: 'https://goalgcmvp-uat.nike.com/',
  prod: 'https://goalgcmvp-uat.nike.com/'
}
const http = function (param, url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${host[env] + url }`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        ...param
      },
      success(res) {
        resolve()
      },
      fail() {
        reject()
      }
    })
  })
}

export default http