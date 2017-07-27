import Vue from 'vue';
import Checkbox from '@/components/checkbox';

Vue.component(Checkbox.name, Checkbox);
Vue.component(Checkbox.Group.name, Checkbox.Group);

const createElm = function() {
  const elm = document.createElement('div');

  // elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

describe('Components Checkbox', () => {
  it('create boolean', done => {
    const vm = new Vue({
      template: `<v-checkbox v-model="checked" ref="checkbox" label="orange">橘子</v-checkbox>`,
      data: {
        checked: true
      }
    }).$mount();
    
    Vue.nextTick(() => {
      const el = vm.$refs.checkbox.$el;
      expect(el.classList.contains('v-checkbox-checked')).to.true;
      done();
    });
  });

 it('create array', done => {
    const vm = new Vue({
      template: `
        <div>
          <v-checkbox v-model="fruit" label="apple">苹果</v-checkbox>
          <v-checkbox v-model="fruit" ref="checkbox" label="banana">香蕉</v-checkbox>
        </div>
      `,
      data: {
        fruit: ['banana']
      }
    }).$mount();
    
    Vue.nextTick(() => {
      const el = vm.$refs.checkbox.$el;
      expect(el.classList.contains('v-checkbox-checked')).to.true;
      done();
    });
  });

  it('model set', done => {
    const vm = new Vue({
      template: `
        <div>
          <v-checkbox v-model="fruit" ref="a" label="apple">苹果</v-checkbox>
          <v-checkbox v-model="fruit" label="banana">香蕉</v-checkbox>
        </div>
      `,
      data() {
        return {
          fruit: ['banana']
        };
      }
    }).$mount(createElm());

    vm.$refs.a.$el.click();
    
    Vue.nextTick(() => {
      expect(vm.fruit.indexOf('apple') !== -1).to.true;
      done();
    });
  });

  it('group', done => {
    const vm = new Vue({
      template: `
        <v-checkbox-group v-model="fruit">
          <v-checkbox ref="a" label="apple">苹果</v-checkbox>
          <v-checkbox label="banana">香蕉</v-checkbox>
        </v-checkbox-group>
      `,
      data() {
        return {
          fruit: ['banana']
        };
      }
    }).$mount(createElm());

    vm.$refs.a.$el.click();
    
    Vue.nextTick(() => {
      expect(vm.fruit.indexOf('apple') !== -1).to.true;
      done();
    });
  });
});