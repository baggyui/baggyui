import Button from './components/button';
import Icon from './components/icon';
import Radio from './components/radio';
import Checkbox from './components/checkbox';
import Notification from './components/notification';
import Select from './components/select';
import Message from './components/message';
import Input from './components/input';
import Dialog from './components/dialog';
import Modal from './components/modal';
import Table from './components/table';
import Page from './components/page';
import Datepicker from './components/datepicker';
import Tree from './components/tree';
import Breadcrumb from './components/breadcrumb';

import './styles/index.scss';

const components = {
  Button,
  Icon,
  Radio,
  RadioGroup: Radio.Group,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  Select,
  Option: Select.Option,
  Input,
  Dialog,
  Table,
  Page,
  Datepicker,
  Tree,
  Breadcrumb,
  BreadcrumbItem: Breadcrumb.Item
};

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach((key) => {
    let component = components[key];
    Vue.component(component.name, component);
  });

  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
  Vue.prototype.$modal = Modal;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

let obj = {
  install,
  Notification,
  Message
};

Object.keys(components).forEach((key) => {
  let component = components[key];
  obj[key] = component;
});

export default obj;