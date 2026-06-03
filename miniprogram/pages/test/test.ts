// test.ts
Component({
  data: {
    testCard1: {
      id: '1',
      type: 'A',
      content: '今天又是摸鱼的一天，代码写得像屎山一样，但是能跑就行。',
      date: '2026-06-03',
      status: 'unviewed'
    },
    testCard2: {
      id: '2',
      type: 'B',
      content: '如果我当初选择了另一个专业，现在可能在某个实验室里做实验。',
      date: '2026-06-02',
      status: 'viewed'
    },
    testCard3: {
      id: '3',
      type: 'C',
      content: '在旧书里发现了一张泛黄的车票，是1998年从北京到上海的硬座。',
      date: '2026-06-01',
      status: 'claimed'
    },
    tapResult: '',
    inputResult: ''
  },

  methods: {
    onCardTap(e: any) {
      const { cardData } = e.detail;
      this.setData({
        tapResult: `${cardData.type} - ${cardData.id}`
      });
      console.log('卡片点击:', cardData);
    },
    
    onInputBoxInput(e: any) {
      console.log('输入框输入:', e.detail.value);
    },
    
    onInputBoxFocus() {
      this.setData({ inputResult: '输入框聚焦' });
      console.log('输入框聚焦');
    },
    
    onInputBoxBlur() {
      this.setData({ inputResult: '输入框失焦' });
      console.log('输入框失焦');
    },
    
    onInputBoxSubmit(e: any) {
      const { value } = e.detail;
      this.setData({ inputResult: `提交内容: ${value}` });
      console.log('输入框提交:', value);
    }
  }
});