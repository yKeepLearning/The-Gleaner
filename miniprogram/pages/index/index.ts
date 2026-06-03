// index.ts
const app = getApp<IAppOption>()

Component({
  data: {
    // 今日赃物数据
    todayCard: {
      id: 'item_001',
      type: 'B',
      content: '如果三年前你接受了那份远方的工作，今天的购物小票上会写着什么',
      date: '2026-06-03',
      status: 'unviewed' as const
    },
    // 交易请求文字
    tradeRequest: '喏，这是另一个你在深夜三点写下的购物清单。告诉我，你现在最想买但舍不得买的东西是什么？换。',
    // 交易请求是否显示完毕
    isTradeTextComplete: false,
    // 是否已交易
    isTraded: false,
    // 打字机定时器
    _typewriterTimer: null as null | number
  },

  methods: {
    // 点击卡片
    onTapCard(e: WechatMiniprogram.TouchEvent) {
      const { cardData } = e.detail;
      console.log('点击卡片:', cardData);
      
      // 标记为已查看
      this.setData({
        'todayCard.status': 'viewed'
      });
    },

    // 提交交易
    onSubmitTrade(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      if (!value || !value.trim()) {
        wx.showToast({ title: '请输入交易内容', icon: 'none' });
        return;
      }
      console.log('交易内容:', value);
      
      // 标记为已交易
      this.setData({
        isTraded: true,
        'todayCard.status': 'claimed'
      });
      
      // 显示提示
      wx.showToast({
        title: '交易完成',
        icon: 'success'
      });
    },

    // 打字机效果
    startTypewriter() {
      const fullText = this.data.tradeRequest;
      let currentIndex = 0;
      
      this.data._typewriterTimer = setInterval(() => {
        if (currentIndex <= fullText.length) {
          this.setData({
            tradeRequest: fullText.substring(0, currentIndex)
          });
          currentIndex++;
        } else {
          clearInterval(this.data._typewriterTimer!);
          this.data._typewriterTimer = null;
          this.setData({ isTradeTextComplete: true });
        }
      }, 50);
    }
  },

  lifetimes: {
    attached() {
      this.startTypewriter();
    },
    detached() {
      if (this.data._typewriterTimer) {
        clearInterval(this.data._typewriterTimer);
        this.data._typewriterTimer = null;
      }
    }
  }
});
