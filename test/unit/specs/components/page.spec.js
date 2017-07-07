import { getRenderedVm } from '../../util';
import Page from '@/components/page';

import Vue from 'vue';

describe('Components Page', () => {
  it('props current', () => {
    const vm = getRenderedVm(Page, {
      total: 100
    });

    expect(vm.total).to.equal(100);
  });

  it('computed pageCount 1', () => {
    const vm = getRenderedVm(Page, {
      pageSize: -1
    });

    expect(vm.pageCount).to.equal(1);
  });

  it('computed pageCount 2', () => {
    const vm = getRenderedVm(Page);
    expect(vm.pageCount).to.equal(1);
  });

  // 测试左箭头
  it('computed pagers showPrevMore', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 8
    });

    expect(vm.showPrevMore).to.true;
    expect(vm.showNextMore).to.false;
  });

  // 测试右箭头
  it('computed pagers showNextMore', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 2
    });

    expect(vm.showPrevMore).to.false;
    expect(vm.showNextMore).to.true;
  });

  // 测试左右箭头
  it('computed pagers showPrevNextMore', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 6
    });

    expect(vm.showPrevMore).to.true;
    expect(vm.showNextMore).to.true;
  });

  // 测试左右箭头
  it('computed pagers hidePrevNextMore', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      pageSize: 20
    });

    expect(vm.showPrevMore).to.false;
    expect(vm.showNextMore).to.false;
  });

  it('watch current', done => {
    const vm = getRenderedVm(Page, {
      total: 100
    });

    vm.current = 2;

    Vue.nextTick(() => {
      expect(vm.currentPage).to.equal(2);
      done();
    });
  });

  it('methods handleChangePage 1', () => {
    const vm = getRenderedVm(Page, {
      total: 100
    });

    vm.handleChangePage(2);
    expect(vm.currentPage).to.equal(2);
  });

  it('methods handleChangePage 2', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 2
    });

    vm.handleChangePage(2);
    expect(vm.currentPage).to.equal(2);
  });

  it('methods handlePrevPage 1', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 3
    });

    vm.handlePrevPage();
    expect(vm.currentPage).to.equal(2);
  });

  it('methods handlePrevPage 2', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 1
    });

    vm.handlePrevPage();
    expect(vm.currentPage).to.equal(1);
  });

  it('methods handleNextPage 1', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 3
    });

    vm.handleNextPage();
    expect(vm.currentPage).to.equal(4);
  });

  it('methods handleNextPage 2', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 10
    });

    vm.handleNextPage();
    expect(vm.currentPage).to.equal(10);
  });

  it('methods handlePrevMorePage 1', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 4
    });

    vm.handlePrevMorePage();
    expect(vm.currentPage).to.equal(1);
  });

  it('methods handlePrevMorePage 2', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 8
    });

    vm.handlePrevMorePage();
    expect(vm.currentPage).to.equal(3);
  });

  it('methods handleNextMorePage 1', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 6
    });

    vm.handleNextMorePage();
    expect(vm.currentPage).to.equal(10);
  });

  it('methods handleNextMorePage 2', () => {
    const vm = getRenderedVm(Page, {
      total: 100,
      current: 3
    });

    vm.handleNextMorePage();
    expect(vm.currentPage).to.equal(8);
  });
});