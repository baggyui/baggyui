import Vue from 'vue';
import VueRouter from 'vue-router';

import Button from './pages/button';
import Icon from './pages/icon';
import Radio from './pages/radio';
import Checkbox from './pages/checkbox';
import Notification from './pages/notification';
import Select from './pages/select';
import Message from './pages/message';
import Input from './pages/input';
import Dialog from './pages/dialog';
import Modal from './pages/modal';
import Table from './pages/table';
import Page from './pages/page';
import Datepicker from './pages/datepicker';
import Tree from './pages/tree';
import Breadcrumb from './pages/breadcrumb';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/icon'
  },
  {
    path: '/button',
    component: Button
  },
  {
    path: '/icon',
    component: Icon
  },
  {
    path: '/radio',
    component: Radio
  },
  {
    path: '/checkbox',
    component: Checkbox
  },
  {
    path: '/notification',
    component: Notification
  },
  {
    path: '/select',
    component: Select
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/input',
    component: Input
  },
  {
    path: '/dialog',
    component: Dialog
  },
  {
    path: '/modal',
    component: Modal
  },
  {
    path: '/table',
    component: Table
  },
  {
    path: '/page',
    component: Page
  },
  {
    path: '/datepicker',
    component: Datepicker
  },
  {
    path: '/tree',
    component: Tree
  },
  {
    path: '/breadcrumb',
    component: Breadcrumb
  }
];

const router = new VueRouter({
  routes 
});

export default router;