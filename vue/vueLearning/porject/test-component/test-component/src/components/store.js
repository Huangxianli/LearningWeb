import Vue from 'vue';

import { LOAD_STATUS } from './constant'

export class Stroe {
  autoLoad = false;
  needPagination = true;

  pageSizes = [5, 10, 15, 20, 50, 100];
  // pageSize = this.pageSizes[0];
  // currentPage = 1;
  pagerCount = 5;
  lastPageSize = this.pageSizes[0];
  lastPage = 1;

  get data () {
    return this.view.data;
  }
  get pageSize () {
    return this.view.pageSize;
  }
  get currentPage () {
    return this.view.currentPage;
  }
  get total () {
    return this.view.total;
  }
  get status () {
    return this.view.status
  }

  set data (data) {
    this.view.data = data;
  }
  set pageSize (pageSize) {
    this.view.pageSize = pageSize;
  }
  set currentPage (currentPage) {
    this.view.currentPage = currentPage;
  }
  set total (total) {
    this.view.total = total;
  }
  set status (status) {
    this.view.status = status;
  }

  constructor(data = []) {
    const view = {
      data,
      pageSize: this.pageSizes[0],
      currentPage: 1,
      total: 0,
      status: LOAD_STATUS.NOT_START,
    };
    this.view = Vue.observable(view);

  }

  async load (params = { currentPage: this.currentPage, pageSize: this.pageSize }) {
    this.status = LOAD_STATUS.START;
    const params1 = {};
    const mockData = {
      data: this.mockData(params.pageSize, params.currentPage),
      pageSize: params.pageSize,
      currentPage: params.currentPage,
      total: this.total1,
    };
    try {
      const { code, data } = await Vue.prototype.$ajax.get(this.url, params1, mockData);
      this.status = LOAD_STATUS.SUCCESS;
      if (code === 200) {
        this.data = data.data;
        this.pageSize = data.pageSize;
        this.currentPage = data.currentPage;
        this.total = data.total;
        this.lastPage = data.currentPage;
        this.lastPageSize = data.pageSize;
      } else {
        this.pageSize = this.lastPageSize;
        this.currentPage = this.lastPage;
      }
    } catch (error) {
      this.status = LOAD_STATUS.FAIL;
      this.pageSize = this.lastPageSize;
      this.currentPage = this.lastPage;
    }


  }
}