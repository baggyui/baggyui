<template>
  <div>
    <transition :name="prefixCls + '-fade'">
      <div
        v-show="visible"
        :class="prefixCls + '-shadow'"
        @click="handleClose"></div>
    </transition>

    <transition
      :name="prefixCls + '-ease'"
      @after-leave="afterLeave">
      <div :class="prefixCls" v-show="visible">
        <!-- header -->
        <div :class="prefixCls + '-header'">
          <span class="header-title">{{ title }}</span>
          <v-icon class="header-close v-icon v-icon-android-close"
             @click.native="handleClose"></v-icon>
        </div>

        <!-- body -->
        <div :class="prefixCls + '-body'">
          <v-icon v-if="type === 'confirm'" :type="typeClass"></v-icon>
          <p :class="{ 'body-message-icon': type === 'confirm' }">{{ message }}</p>
          <div v-if="type === 'prompt'">
            <v-input
              v-model="inputValue"
              :type="inputType"
              class="body-input"
              ref="input"
              :invalid="!!this.inputErr"></v-input>
            <div class="body-input-err">{{ inputErr }}</div>
          </div>
        </div>

        <!-- footer -->
        <div :class="prefixCls + '-footer'">
          <v-button v-if="closable" @click="handleClose">取 消</v-button>
          <v-button type="primary" :loading="buttonLoading" @click="handleOk">确 定</v-button>
        </div>
      </div>
    </transition>
  </div>  
</template>

<script>
  import { oneOf } from '../../utils/assist';

  const prefixCls = 'v-modal';
  const typeMap = {
    success: 'checkmark-circled',
    error: 'close-circled',
    info: 'information-circled',
    warning: 'android-alert'
  };

  export default {
    name: prefixCls,

    data() {
      return {
        prefixCls,
        visible: false,
        title: '',
        message: '',
        type: '',
        closable: true,
        loading: false,
        buttonLoading: false,
        inputValue: '',
        inputErr: '',
        inputType: 'text'
      };
    },

    computed: {
      typeClass() {
        return typeMap.warning;
      }
    },

    watch: {
      inputValue(val) {
        this.validate(val);
      }
    },

    methods: {
      handleClose() {
        this.buttonLoading = false;
        this.visible = false;
      },

      handleOk() {
        if (!this.validate()) {
          return;
        }

        if (this.loading) {
          this.buttonLoading = true;
        } else {
          this.handleClose();
        }

        if (this.onOk && typeof this.onOk === 'function') {
          this.onOk(this.inputValue);
        }
      },

      focusInput() {
        if (this.type === 'prompt') {
          this.$nextTick(() => {
            this.$refs.input.$el.querySelector('input').focus();
          });
        }
      },

      validate() {
        if (this.type !== 'prompt') {
          return true;
        }

        let inputValidate = this.inputValidate;
        if (typeof inputValidate === 'function') {
          let result = inputValidate(this.inputValue);

          if (result === false) {
            this.inputErr = '输入错误';
            return false;
          }

          if (typeof result === 'string') {
            this.inputErr = result;
            return false;
          }
        }

        this.inputErr = '';
        return true;
      },

      escClose(e) {
        if (this.visible && e.keyCode === 27) {
          this.handleClose();
        }
      },

      afterLeave() {
        this.$el.parentNode.removeChild(this.$el);
        document.removeEventListener('keydown', this.escClose);
      }
    },

    mounted() {
      this.visible = true;
      this.focusInput();
      document.addEventListener('keydown', this.escClose);
    }
  };
</script>