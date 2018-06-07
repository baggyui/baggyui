import Vue from 'vue';
import Notification from '@/components/notification';

describe('Components Notification', () => {
  it('show', done => {
    const vm = Notification({
      title: '通知',
      message: '这是一条通知消息',
      duration: 500
    });

    Vue.nextTick(() => { 
      expect(vm.visible).to.be.true;

      setTimeout(() => {
        expect(vm.visible).to.be.false;
        done();
      }, 1000);
    });
  });

  it('duration', done => {
    const vm = Notification({
      title: '通知',
      duration: 0
    });

    Vue.nextTick(() => { 
      expect(vm.visible).to.be.true;

      setTimeout(() => {
        expect(vm.visible).to.be.true;
        done();
      }, 1000);
    });

    expect(document.querySelector('.v-notification')).to.exist;
  });

  it('show success', done => {
    const vm = Notification.success({
      title: '通知'
    });

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.v-icon-checkmark-circled').tagName).to.equal('I');
      done();
    });
  });

  it('show error', done => {
    const vm = Notification.error({
      title: '通知'
    });

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.v-icon-close-circled').tagName).to.equal('I');
      done();
    });
  });

  it('show warning', done => {
    const vm = Notification.warning({
      title: '通知'
    });

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.v-icon-android-alert').tagName).to.equal('I');
      done();
    });
  });

  it('show info', done => {
    const vm = Notification.info({
      title: '通知'
    });

    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.v-icon-information-circled').tagName).to.equal('I');
      done();
    });
  });

  it('show many', done => {
    const vm1 = Notification({
      title: '通知',
      duration: 50
    });

    Vue.nextTick(() => {
      const vm2 = Notification({
        title: '通知'
      });

      Vue.nextTick(() => {
        let top = parseInt(vm2.$el.style.top);
        let height = parseInt(vm1.$el.offsetHeight);
        let defaultTop = 16;

        setTimeout(() => {
          expect(vm2.$el.style.top).to.equal(`${top - height - defaultTop}px`);
          done();
        }, 1000);
      });
    });
  });
});