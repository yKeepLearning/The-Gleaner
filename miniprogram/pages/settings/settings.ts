// settings.ts
Component({
  data: {
    // 设置项列表
    settingsList: [
      {
        id: 'guide',
        icon: '📖',
        title: '新手引导',
        type: 'navigate'
      },
      {
        id: 'notification',
        icon: '🔔',
        title: '通知设置',
        type: 'switch',
        value: true
      },
      {
        id: 'about',
        icon: 'ℹ️',
        title: '关于我们',
        type: 'navigate'
      },
      {
        id: 'clear',
        icon: '🗑️',
        title: '清除数据',
        type: 'navigate',
        danger: true
      }
    ],
    // 是否显示关于弹窗
    showAbout: false,
    // 关于信息
    aboutInfo: {
      name: '拾遗',
      slogan: '用真话，交换另一个世界的碎片',
      version: 'v1.0.0',
      description: '一个诞生于互联网废弃缓存空间的数据生命体。每当世界上有一条微博被秒删、一封邮件未发送、一句语音被撤回、一个可能性被放弃……这些夭折的"如果"并没有消失，而是坠入数据的暗面，被它收集、拼贴，并赋予了淘气的人格。'
    }
  },

  pageLifetimes: {
    show() {
      const enabled = wx.getStorageSync('notificationEnabled');
      if (enabled !== '') {
        const index = this.data.settingsList.findIndex(item => item.id === 'notification');
        if (index !== -1) {
          this.setData({
            [`settingsList[${index}].value`]: !!enabled
          });
        }
      }
    }
  },

  methods: {
    // 点击设置项
    onTapSetting(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset;
      
      switch (id) {
        case 'guide':
          // 重新观看新手引导
          wx.showModal({
            title: '新手引导',
            content: '确定要重新观看新手引导吗？',
            success: (res) => {
              if (res.confirm) {
                wx.removeStorageSync('hasShownGuide');
                wx.reLaunch({ url: '/pages/index/index' });
              }
            }
          });
          break;
          
        case 'about':
          // 显示关于弹窗
          this.setData({ showAbout: true });
          break;
          
        case 'clear':
          // 清除数据
          wx.showModal({
            title: '清除数据',
            content: '确定要清除所有本地缓存吗？此操作不可恢复。',
            confirmColor: '#ff6b6b',
            success: (res) => {
              if (res.confirm) {
                wx.clearStorageSync();
                wx.showToast({
                  title: '清除成功',
                  icon: 'success'
                });
              }
            }
          });
          break;
      }
    },

    // 切换通知设置
    onToggleNotification(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset;
      const index = this.data.settingsList.findIndex(item => item.id === id);
      
      if (index !== -1) {
        const newValue = !this.data.settingsList[index].value;
        this.setData({
          [`settingsList[${index}].value`]: newValue
        });
        
        wx.setStorageSync('notificationEnabled', newValue);
        wx.showToast({
          title: newValue ? '已开启通知' : '已关闭通知',
          icon: 'none'
        });
      }
    },

    // 关闭关于弹窗
    onCloseAbout() {
      this.setData({ showAbout: false });
    },

    // 阻止事件冒泡
    preventBubble() {
      // 空方法，用于阻止事件冒泡
    }
  }
});