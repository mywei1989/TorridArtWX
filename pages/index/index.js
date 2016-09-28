//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //motto: 'Hello World',
    //userInfo: {}
    collections : [],
    pageIndex:1
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var self = this;
    //调用应用实例的方法获取全局数据
    /*app.getUserInfo(function(userInfo){
      //更新数据
      self.setData({
        userInfo:userInfo
      });
    });*/

    self.getCollections(1);
  },
  getCollections:function(pageIndex){
    var self = this;
    var page = pageIndex || 1;
    wx.request({
      url: 'http://localhost:3001/page/'+page,
      header: {
          'Content-Type': 'application/json'
      },
      success: function(result) {
        //console.log(result.data.collections);
        if(page === 1){
          self.setData({
            pageIndex:page,
            collections:result.data.collections
          });
        }else{
          self.setData({
            pageIndex:page,
            collections:self.data.collections.concat(result.data.collections)
          });
        }
      }
    });
  },

  upper: function(){
    var self = this;
    self.getCollections(1);
  },
  lower:function(){
    var self = this;
    var page = self.data.pageIndex + 1;
    self.getCollections(page);
  },
  previewImage:function(e){
    var self = this;
    var current = e.target.dataset.src;
    var urls = [];
    for(var i=0;i<self.data.collections.length;i++){
      urls.push(self.data.collections[i].preview);
    }
    wx.previewImage({
      current: current,
      urls: urls
    });
  }
})
