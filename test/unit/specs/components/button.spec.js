import { getRenderedVm } from '../../util';
import Button from '@/components/button';

describe('Components Button', () => {
  it('props type', () => {
    const vm = getRenderedVm(Button, {
      type: 'primary'
    });

    expect(vm.$el.classList.contains('v-button-primary')).to.true;
  });

  it('props disabled', () => {
    const vm = getRenderedVm(Button, {
      disabled: true
    });

    expect(vm.$el.disabled).to.true;
  });

  it('props nativeType', () => {
    const vm = getRenderedVm(Button, {
      nativeType: 'submit'
    });

    expect(vm.$el.type).to.equal('submit');
  });

  it('props width', () => {
    const vm = getRenderedVm(Button, {
      width: 100
    });

    expect(vm.$el.style.width).to.equal('100px');
    expect(vm.$el.style.paddingLeft).to.equal('0px');
    expect(vm.$el.style.paddingRight).to.equal('0px');
  });

  it('props height', () => {
    const vm = getRenderedVm(Button, {
      height: 100
    });

    expect(vm.$el.style.height).to.equal('100px');
    expect(vm.$el.style.paddingTop).to.equal('0px');
    expect(vm.$el.style.paddingBottom).to.equal('0px');
  });

  it('props icon', () => {
    const vm = getRenderedVm(Button, {
      icon: 'ios-plus-outline'
    });

    const classList = vm.$el.getElementsByTagName('span')[0].classList;
    expect(classList.contains('vertical-center')).to.true;
  });

  it('methods handleClick', () => {
    const vm = getRenderedVm(Button);

    vm.$el.click();
  });
});