<template>
  <div :class="classes" v-clickoutside="hideSuggestions">
    <template v-if="type !== 'textarea'">
      <div v-if="prepend" :class="(prefixCls + '-group-prepend')"><slot name="prepend"></slot></div>
      <input
        spellcheck="false"
        :type="type"
        :value="currentValue"
        :class="textClasses"
        :disabled="disabled"
        :placeholder="placeholder"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keyup.delete="handleDelete">
      <v-icon
        v-if="icon"
        :type="icon"
        :class="prefixCls + '-icon'"
        @click.native="handleIconClick"></v-icon>
      <div v-if="append" :class="(prefixCls + '-group-append')"><slot name="append"></slot></div>
    </template>
    <textarea
      v-else
      spellcheck="false"
      :value="currentValue"
      :class="(prefixCls + '-textarea')"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keyup.delete="handleDelete"></textarea>

    <transition name="v-input-zoom">
      <div
        v-if="(suggestions.length > 0)"
        v-show="visible"
        :class="prefixCls + '-dropdown'">
        <ul :class="prefixCls + '-list'">
          <v-input-option
            v-for="(item, index) in suggestions"
            :key="index"
            :value="item"
            @on-select-change="handleSelect"></v-input-option>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import clickoutside from '../../utils/clickoutside';
  import { oneOf } from '../../utils/assist';
  import { isIE } from '../../utils/browser';
  import Option from './input-option';

  const prefixCls = 'v-input';

  export default {
    name: prefixCls,

    components: {
      'v-input-option': Option
    },

    directives: { clickoutside },

    props: {
      type: {
        default: 'text',
        validator(value) {
          return oneOf(value, ['text', 'password', 'textarea']);
        }
      },
      value: [String, Number],
      placeholder: [String, Number],
      disabled: Boolean,
      invalid: Boolean,
      rows: {
        type: [String, Number],
        default: 2
      },
      icon: String,
      suggestions: {
        type: Array,
        default: () => {
          return [];
        }
      },
      focus: Boolean
    },

    data() {
      return {
        prefixCls,
        currentValue: this.value,
        visible: false,
        prepend: this.$slots.prepend,
        append: this.$slots.append
      };
    },

    computed: {
      classes() {
        return [
          prefixCls,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-area`]: this.type === 'textarea',
            [`${prefixCls}-invalid`]: this.invalid,
            [`${prefixCls}-group`]: this.prepend || this.append,
            [`${prefixCls}-group-with-prepend`]: this.prepend,
            [`${prefixCls}-group-with-append`]: this.append
          }
        ];
      },

      textClasses() {
        return [
          prefixCls + '-text',
          {
            [`${prefixCls}-text-icon`]: this.icon
          }
        ];
      }
    },

    watch: {
      value(val) {
        this.currentValue = val;
        this.showSuggestions();
      }
    },

    methods: {
      changeInput(val) {
        this.$emit('input', val);
        this.$emit('change');
      },

      handleInput(event) {
        this.changeInput(event.target.value);
      },

      handleDelete(event) {
        if(isIE(9)) {
          this.changeInput(event.target.value);
        }
      },

      handleFocus(event) {
        this.$emit('focus', event.target.value);
        this.showSuggestions();
      },

      handleBlur(event) {
        this.$emit('blur', event.target.value);
      },

      handleIconClick() {
        if (this.disabled) return;
        this.$emit('on-icon-click', this.currentValue);
      },

      handleSelect(val) {
        this.changeInput(val);
        this.hideSuggestions();
      },

      showSuggestions() {
        if (!this.currentValue && this.suggestions.length > 0) {
          this.visible = true;
        } else {
          this.hideSuggestions();
        }
      },

      hideSuggestions() {
        this.visible = false;
      }
    },

    mounted() {
      if (this.focus) {
        this.$nextTick(() => {
          this.$el.querySelector('input').focus();
        });
      }
    }
  };
</script>