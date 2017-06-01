import Vue from 'vue';

let ModalObj = Vue.extend(require('./modal.vue'));
let Modal = {};
let instance;

Modal = function(options = {}) {
  showModal(options);
};

Modal.alert = function(options = {}) {
  options.type = 'alert';
  options.closable = false;
  showModal(options);
};

Modal.confirm = function(options = {}) {
  options.type = 'confirm';
  showModal(options);
};

Modal.prompt = function(options = {}) {
  options.type = 'prompt';
  showModal(options);
};

Modal.remove = function() {
  instance.handleClose();
};

function showModal(options) {
  instance = new ModalObj({
    data: options
  });

  let vm = instance.$mount();
  document.body.appendChild(vm.$el);
}

export default Modal;