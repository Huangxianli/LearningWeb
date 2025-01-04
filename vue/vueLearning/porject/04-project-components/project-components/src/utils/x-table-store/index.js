// XTableStore 的模型的实现 
import Vue from 'vue';

import { REQUEST_STATUS } from '@/constant/requestStatus.js';

const initTaleAllData = Symbol('initTaleAllData');
const setTableData = Symbol('setTableData');

export class Store {
  #tableAllData = [];
  autoLoad = true;
  pageSizes = [5, 10, 20, 50, 100];
  get tableData () {
    return this.view.tableData;
  }
  get filter () {
    return this.view.filter;
  }
  get total () {
    return this.view.total;
  }
  get currentPage () {
    return this.view.currentPage;
  }
  get pageSize () {
    return this.view.pageSize;
  }
  get status () {
    return this.view.status;
  }

  set tableData (tableData) {
    this.view.tableData = tableData;
  }
  set total (total) {
    this.view.total = total;
  }
  set currentPage (currentPage) {
    // this.view.currentPage = currentPage;
    Vue.set(this.view, 'currentPage', currentPage);
  }
  set pageSize (pageSize) {
    this.view.pageSize = pageSize;
  }
  set status (status) {
    this.view.status = status;
  }
  set filter (filter) {
    this.view.filter = filter;
  }

  constructor(tableData = [], filter = {}) {
    this.view = {};
    this.pageSize = this.pageSizes[0];

    Vue.set(this.view, 'tableData', tableData);
    Vue.set(this.view, 'filter', filter);
    Vue.set(this.view, 'total', 0);
    Vue.set(this.view, 'currentPage', 1);
    Vue.set(this.view, 'pageSize', this.pageSizes[0]);
    Vue.set(this.view, 'status', REQUEST_STATUS.UN_START);
    Vue.observable(this.view)
    this.params = {};
    this.filter = filter;
    this.filterParams = {}; // 请求的时候，搜索表单的参数，只有点击搜索的时候才更新，点击页码的时候不更新
    this[initTaleAllData]();
  }

  // 构造表格全量的虚拟数据
  [initTaleAllData] () {
    const props = ['taskName', 'project', 'taskType', 'milestone', 'releaseTime'];
    for (let i = 1; i <= 108; i++) {
      const row = {};
      props.forEach(prop => {
        row[prop] = `${prop}-${i}`;
      });
      row.id = i;
      this.#tableAllData.push(row);
    }
  }

  // 模拟请求后得到的数据
  [setTableData] (params) {
    const currentShowData = this.#tableAllData.slice((params.currentPage - 1) * params.pageSize, params.currentPage * params.pageSize);
    return currentShowData;
  }
  // 添加默认参数，例如，如果是请求已经停用的数据，可能会借用以前的接口，但是会加一个参数，status: 'stop'
  setParams (params) {
    this.params = params;
  }
  // 请求数据
  async load ({ currentPage = this.currentPage, pageSize = this.pageSize } = { currentPage: this.currentPage, pageSize: this.pageSize }) {
    if (this.useStaticData) {
      this.#tableAllData = this.staticTableData;
      this.tableData = this[setTableData]({ currentPage, pageSize });
      this.total = this.#tableAllData.length;
      // this.currentPage = 1;
      debugger

      this.currentPage = currentPage;
      // this.pageSize = pageSize;
      return;
    }
    this.status = REQUEST_STATUS.LOADING;
    const data = {
      ...this.params,
      ...this.filterParams,
      data: this[setTableData]({ currentPage, pageSize }),
      pageSize: pageSize,
      currentPage: currentPage,
      total: this.#tableAllData.length
    };

    await Vue.prototype.$ajax(data).then(res => {
      if (res.code === 200) {
        this.status = REQUEST_STATUS.SUCCESS;
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    });
  }
  async search () {
    this.pageSize = 1;
    this.filterParams = structuredClone(this.filter);
    await this.load();
  }

  getModel (index) {
    const data = this.tableData[index];
    if (this.model) {
      return new this.model(data);
    } else {
      return data
    }
  }

}