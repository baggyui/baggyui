import { getRenderedVm } from '../../util';
import Icon from '@/components/icon';

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