import Vue from 'vue';
import Button from '@/components/button';

/**
 * 获取生成的vm
 *
 * @param {Object} Component 组件
 * @param {Object} propsData props数据
 * @return {Object} vue实例
 */
function getRenderedVm(Component, propsData) {
  const Ctor = Vue.extend(Component);
  const vm = new Ctor({ propsData }).$mount();
  return vm;
}


describe('Components Button', () => {
  it('props type', () => {
    const vm = getRenderedVm(Button, {
      type: 'primary'
    });

    expect(vm.$el.classList.contains('v-button-primary')).to.true;
  });

  // it('props loading', () => {
  //   const vm = getRenderedVm(Button, {
  //     type: 'primary',
  //     loading: true
  //   });

  //   expect(vm.$el.classList.contains('v-button-loading')).to.true;
  // });

  it('props disabled', () => {
    const vm = getRenderedVm(Button, {
      type: 'primary',
      disabled: true
    });

    expect(vm.$el.disabled).to.true;
  });

  it('props nativeType', () => {
    const vm = getRenderedVm(Button, {
      type: 'primary',
      nativeType: 'submit'
    });

    expect(vm.$el.type).to.equal('submit');
  });

  it('methods handleClick', () => {
    const vm = getRenderedVm(Button, {
      type: 'primary'
    });

    vm.$el.click();
  });
});