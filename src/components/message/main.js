import Vue from 'vue';

let MessageObj = Vue.extend(require('./message.vue'));
let Message = {};

Message = function(options = {}) {
  showMessage(options);
};

Message.success = function(options = {}) {
  options.type = 'success';
  showMessage(options);
};

Message.warning = function(options = {}) {
  options.type = 'warning';
  showMessage(options);
};

Message.error = function(options = {}) {
  options.type = 'error';
  showMessage(options);
};

Message.info = function(options = {}) {
  options.type = 'info';
  showMessage(options);
};

function showMessage(options) {
  let instance = new MessageObj({
    data: options
  });

  let vm = instance.$mount();
  document.body.appendChild(vm.$el);
}

export default Message;