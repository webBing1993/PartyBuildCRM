Page({
  data: {
    predeterList: [
      { title: '阿斯顿就覅嘎斯解放后安静的萨法', price: '50', num: 2, src: '../../images/1.jpg'}
    ],
    editIndex: 0,
    delBtnWidth: 50      // 删除按钮宽度单位（rpx）
  },
  onLoad: function (options) { 

  }, 

  // 手指刚放到屏幕触发
  touchS: function (e) {
    console.log("touchS" + e);
    // 判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        // 记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    };
    return false;
  },

  // 触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      // 记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      // 计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      // delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {      // 如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {            // 移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          // 控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      // 获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.predeterList;
      // 将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      // 更新列表的状态
      this.setData({
        predeterList: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      // 手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      // 触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      // 如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      // 获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.predeterList;
      list[index].txtStyle = txtStyle;
      // 更新列表的状态
      that.setData({
        predeterList: list
      });
    }
  },

  /**
   * 跳转详情页
   */
  navigatorTo: function (event) {
    wx.navigateTo({
      url: '/pages/predeterDetail/index?id=' + event.currentTarget.dataset.index
    })
  },

  /**
   * 删除操作
   */
  del: function (e) {
    var that = this;
    wx.request({
      url: '',
      method: 'POST',
      // 请求头部  
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: e.currentTarget.dataset.index
      },
      success: function (msg) {
        if (msg.code == 10000) {
          var data = that.data.predeterList;
          data.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            predeterList: data
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          })  
        }
      }
    })
  }

})