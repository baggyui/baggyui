import Vue from 'vue';
import Icon from '@/components/icon';

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


describe('Components Icon', () => {
  it('props type', () => {
    const vm = getRenderedVm(Icon, {
      type: 'arrow-shrink'
    });

    expect(vm.$el.classList.contains('v-icon-arrow-shrink')).to.true;
  });

  it('props color', () => {
    const vm = getRenderedVm(Icon, {
      type: 'arrow-shrink',
      color: 'rgb(255, 255, 255)'
    });

    expect(vm.$el.style.color).to.equal('rgb(255, 255, 255)');
  });

  it('props size', () => {
    const vm = getRenderedVm(Icon, {
      type: 'arrow-shrink',
      size: '20'
    });

    expect(vm.$el.style.fontSize).to.equal('20px');
  });
});