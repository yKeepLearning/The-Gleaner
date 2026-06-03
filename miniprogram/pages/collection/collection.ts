// collection.ts
Component({
  data: {
    // 收藏列表
    collectionList: [
      {
        id: 'item_001',
        type: 'A',
        content: '输入到一半被删掉的微博草稿：今天天气真好，但是我...',
        date: '2026-06-01',
        status: 'claimed',
        dialogue: {
          it_said: '喏，这是另一个你在深夜三点写下的购物清单。告诉我，你现在最想买但舍不得买的东西是什么？换。',
          you_said: '一个机械键盘，一直想买但舍不得。'
        }
      },
      {
        id: 'item_002',
        type: 'B',
        content: '如果三年前你接受了那份远方的工作，今天的购物小票上会写着什么',
        date: '2026-06-02',
        status: 'claimed',
        dialogue: {
          it_said: '三年前的你会怎么看现在的你？说出一个你现在最想对三年前的自己说的话。',
          you_said: '谢谢你当初的坚持，虽然路很艰难。'
        }
      },
      {
        id: 'item_003',
        type: 'C',
        content: '平行世界的你，在23分钟前发出、又在5秒后删掉的朋友圈草稿',
        date: '2026-06-03',
        status: 'claimed',
        dialogue: {
          it_said: '那条被删掉的朋友圈草稿，其实藏着你什么心事？说出来，我用一个秘密和你换。',
          you_said: '其实我那天很想告诉某个人，我还记得。'
        }
      }
    ],
    // 是否显示详情弹窗
    showDetail: false,
    // 当前选中的卡片
    currentCard: null as any,
    // 当前交易对话记录
    currentDialogue: null as any
  },

  methods: {
    // 点击卡片
    onTapCard(e: WechatMiniprogram.TouchEvent) {
      const { cardData } = e.detail;
      this.setData({
        showDetail: true,
        currentCard: cardData,
        currentDialogue: cardData.dialogue || null
      });
    },

    // 关闭详情弹窗
    onCloseDetail() {
      this.setData({
        showDetail: false,
        currentCard: null
      });
    },

    // 阻止事件冒泡
    preventBubble() {
      // 空方法，用于阻止事件冒泡
    }
  }
});