// card.ts
Component({
  properties: {
    cardData: {
      type: Object,
      value: {
        id: '',
        type: 'A',
        content: '',
        date: '',
        status: 'unviewed'
      }
    },
    mode: {
      type: String,
      value: 'main'
    }
  },

  data: {
    isAnimating: false,
    typeIcon: '📦',
    typeText: '未知类型'
  },

  observers: {
    'cardData.type': function (type: string) {
      this.setData({
        typeIcon: this._getTypeIcon(type),
        typeText: this._getTypeText(type)
      });
    },
    'cardData.status': function (status: string) {
      this.setData({ isAnimating: status === 'unviewed' });
    }
  },

  methods: {
    onTapCard() {
      const { cardData } = this.data;
      this.triggerEvent('tap', { cardData });
    },

    _getTypeIcon(type: string): string {
      switch (type) {
        case 'A': return '📝';
        case 'B': return '🌍';
        case 'C': return '✨';
        default: return '📦';
      }
    },

    _getTypeText(type: string): string {
      switch (type) {
        case 'A': return '电子排泄物';
        case 'B': return '平行世界切片';
        case 'C': return '稀有掉落';
        default: return '未知类型';
      }
    }
  },

  lifetimes: {
    attached() {
      const { type, status } = this.data.cardData;
      this.setData({
        typeIcon: this._getTypeIcon(type),
        typeText: this._getTypeText(type),
        isAnimating: status === 'unviewed'
      });
    }
  }
});
