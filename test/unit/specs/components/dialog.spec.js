import Vue from 'vue';
import Dialog from '@/components/dialog';
import { getRenderedVm } from '../../util';

Vue.component(Dialog.name, Dialog);

describe('Components Dialog', () => {
  it('props top', () => {
    const vm = getRenderedVm(Dialog, {
      top: '100px'
    });

    const el = vm.$el.querySelector('.v-dialog');
    expect(el.style.marginTop).to.equal('100px');
  });

  it('props width', () => {
    const vm = getRenderedVm(Dialog, {
      width: 100
    });

    const el = vm.$el.querySelector('.v-dialog');
    expect(el.style.width).to.equal('100px');
  });

  it('methods handleClose', done => {
    const vm = new Vue({
      template: `
        <v-dialog v-model="visible" title="提示">
          <span>这是一段信息</span>
        </v-dialog>
      `,
      data() {
        return {
          visible: true
        };
      }
    }).$mount();

    Vue.nextTick(() => {
      vm.$el.querySelector('.header-close').click();
      setTimeout(() => {
        expect(vm.visible).to.false;
        done();
      }, 0);
    });
  });

  it('methods escClose', done => {
    const vm = new Vue({
      template: `
        <v-dialog v-model="visible" ref="model">
          <span>这是一段信息</span>
        </v-dialog>
      `,
      data() {
        return {
          visible: true
        };
      }
    }).$mount();

    Vue.nextTick(() => {
      vm.$refs.model.escClose({ keyCode: 27 });
      setTimeout(() => {
        expect(vm.visible).to.false;

        vm.$refs.model.escClose({ keyCode: 27 });
        setTimeout(() => {
          expect(vm.visible).to.false;
          done();
        });
      }, 0);
    });
  });
});