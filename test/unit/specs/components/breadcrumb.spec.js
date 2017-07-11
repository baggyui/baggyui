import Vue from 'vue';
import VueRouter from 'vue-router';
import Breadcrumb from '@/components/breadcrumb';

Vue.use(VueRouter);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);

const routes = [];
const router = new VueRouter({ routes });

describe('Components Breadcrumb', () => {
  it('props separator', done => {
    const vm = new Vue({
      template: `
        <v-breadcrumb separator=">">
          <v-breadcrumb-item to="/">首页</v-breadcrumb-item>
          <v-breadcrumb-item>面包屑</v-breadcrumb-item>
        </v-breadcrumb>
      `
    }).$mount();

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.v-breadcrumb-item-separator').innerText).to.equal('>');
      done();
    });
  });

  it('props to href 1', done => {
    const vm = new Vue({
      template: `
        <v-breadcrumb separator=">">
          <v-breadcrumb-item ref="a" to="http://localhost:9876/context.html#/">首页</v-breadcrumb-item>
          <v-breadcrumb-item>面包屑</v-breadcrumb-item>
        </v-breadcrumb>
      `
    }).$mount();

    Vue.nextTick(() => {
      vm.$refs.a.handleHref();
      expect(window.location.href).to.equal('http://localhost:9876/context.html#/');
      done();
    });
  });

  it('props to href 2', done => {
    const vm = new Vue({
      template: `
        <v-breadcrumb separator=">">
          <v-breadcrumb-item ref="a" :to="{ path: '/home' }">首页</v-breadcrumb-item>
          <v-breadcrumb-item>面包屑</v-breadcrumb-item>
        </v-breadcrumb>
      `
    }).$mount();

    Vue.nextTick(() => {
      vm.$refs.a.handleHref();
      expect(window.location.href).to.equal('http://localhost:9876/context.html#/');
      done();
    });
  });

  it('props to', done => {
    const vm = new Vue({
      template: `
        <v-breadcrumb separator=">">
          <v-breadcrumb-item ref="a" to="/home">首页</v-breadcrumb-item>
          <v-breadcrumb-item>面包屑</v-breadcrumb-item>
        </v-breadcrumb>
      `,
      router
    }).$mount();

    Vue.nextTick(() => {
      vm.$refs.a.handleHref();
      expect(vm.$route.path).to.equal('/home');
      done();
    });
  });

  it('props replace', done => {
    const vm = new Vue({
      template: `
        <v-breadcrumb separator=">">
          <v-breadcrumb-item ref="a" to="/home" replace>首页</v-breadcrumb-item>
          <v-breadcrumb-item>面包屑</v-breadcrumb-item>
        </v-breadcrumb>
      `,
      router
    }).$mount();

    Vue.nextTick(() => {
      vm.$refs.a.handleHref();
      expect(vm.$route.path).to.equal('/home');
      done();
    });
  });
});