import Vue from 'vue';
let NotificationObj = Vue.extend(require('./notification.vue'));

let instance;
let instances = [];
let seed = 1;
let defaultTop = 16;
let Notification = {};

Notification = function(options = {}) {
  showNotification(options);
};

Notification.success = function(options = {}) {
  options.type = 'success';
  showNotification(options);
};

Notification.warning = function(options = {}) {
  options.type = 'warning';
  showNotification(options);
};

Notification.error = function(options = {}) {
  options.type = 'error';
  showNotification(options);
};

Notification.info = function(options = {}) {
  options.type = 'info';
  showNotification(options);
};

function showNotification(options) {
  // id
  let id = 'notification_' + seed++;
  options.id = id;

  // top
  let topDist = 16;
  for (let i = 0, len = instances.length; i < len; i++) {
    topDist += instances[i].$el.offsetHeight + defaultTop;
  }
  options.top = topDist;

  // onClose
  options.onClose = function(id) {
    let len = instances.length;
    let index;
    let removedHeight;

    for (let i = 0; i < len; i++) {
      if (id === instances[i].id) {
        index = i;
        removedHeight = instances[i].$el.offsetHeight;
        instances.splice(i, 1);
        len--;
        break;
      }
    }

    if (len >= 1) {
      for(let i = index; i < len; i++) {
        instances[i].top = instances[i].top - removedHeight - defaultTop;
      }
    }
  };

  instance = new NotificationObj({
    data: options
  });

  let vm = instance.$mount();
  document.body.appendChild(vm.$el);

  instances.push(instance);
}

export default Notification;