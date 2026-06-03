Component({
  properties: {
    // 占位文字
    placeholder: {
      type: String,
      value: '用真话交换...'
    },
    // 按钮文字
    buttonText: {
      type: String,
      value: '交换'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },

  data: {
    inputValue: '',
    inputTrimmed: '',
    isFocused: false
  },

  methods: {
    // 输入事件
    onInput(e: WechatMiniprogram.Input) {
      this.setData({
        inputValue: e.detail.value,
        inputTrimmed: e.detail.value.trim()
      });
      this.triggerEvent('input', { value: e.detail.value });
    },

    // 聚焦事件
    onFocus() {
      this.setData({ isFocused: true });
      this.triggerEvent('focus');
    },

    // 失焦事件
    onBlur() {
      this.setData({ isFocused: false });
      this.triggerEvent('blur');
    },

    // 提交事件
    onSubmit() {
      const { inputValue, disabled } = this.data;
      if (disabled || !inputValue.trim()) return;
      
      this.triggerEvent('submit', { value: inputValue });
      this.setData({ inputValue: '', inputTrimmed: '' });
    },

    // 清空输入
    clearInput() {
      this.setData({ inputValue: '', inputTrimmed: '' });
    }
  }
});