//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    collections : [],
    pageIndex:1
  },
  onLoad: function () {
    console.log('onLoad');
    var self = this;
    self.getCollections(1);
  },
  getCollections:function(pageIndex){
    var self = this;
    var page = pageIndex || 1;
    console.log('load:http://localhost:3001/page/'+page);
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
    console.log('pullDownRefresh');
    self.getCollections(1);
  },
  lower:function(){
    var self = this;
    
    var page = self.data.pageIndex + 1;
    console.log('loadpage:'+page);
    self.getCollections(page);
  },
  previewImage:function(e){
    var self = this;
    var current = e.target.dataset.src;
    var urls = [];
    for(var i=0;i<self.data.collections.length;i++){
      urls.push(self.data.collections[i].preview);
    }
    console.log(urls)
    wx.previewImage({
      current: current,
      urls: urls
    });
  }
})
