import Vue from 'vue';

import { REQUEST_STATUS } from './constant'

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
  get filter () {
    return this.view.filter;
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
  set filter (filter) {
    this.view.filter = filter;
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
      filter: {}, // 表格前的搜索
      pageSize: this.pageSizes[0],
      currentPage: 1,
      total: 0,
      status: REQUEST_STATUS.NOT_START,
    };

    this.view = Vue.observable(view);

    this.lastClickSearchFilter = structuredClone(this.filter);
  }



  async load (params = { currentPage: this.currentPage, pageSize: this.pageSize }) {
    this.status = REQUEST_STATUS.START;
    const params1 = {
      // 这里要处理筛选的入参，有一种情况是，search 按钮的失败了，但是马上又处理表格的页码，这个时候的入参该如何处理？
    };
    const mockData = {
      data: this.mockData ? this.mockData(params.pageSize, params.currentPage) : [], // 在派生类中定义
      pageSize: params.pageSize,
      currentPage: params.currentPage,
      total: this.total1,
    };
    try {
      const { code, data } = await Vue.prototype.$ajax.get(this.url, params1, mockData);
      this.status = REQUEST_STATUS.SUCCESS;
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
      this.status = REQUEST_STATUS.FAIL;
      this.pageSize = this.lastPageSize;
      this.currentPage = this.lastPage;
    }
  }
  async search (params = { currentPage: this.currentPage, pageSize: this.pageSize }) {
    this.currentPage = 1;
    await this.load();
    if (this.status === REQUEST_STATUS.SUCCESS) {
      this.lastClickSearchFilter = structuredClone(this.filter);
    }
  }

}

export class SelectStore {
  autoLoad = false; // 是否在创建的时候就自动加载
  isFetchData = true; // 下拉数据是否要网络请求
  isMasonryLayout = true; //  是否使用瀑布流的方式获取下拉，无限滚动
  currentPage = 1;
  pageSize = 10;
  total = 0;

  get data () {
    return this.view.data;
  }
  get status () {
    return this.view.status;
  }

  set data (data) {
    this.view.data = data;
  }
  set status (status) {
    this.view.status = status;
  }

  constructor(data = []) {
    const view = {
      data,
      status: REQUEST_STATUS.NOT_START
    };

    this.view = Vue.observable(view);
  }

  async load (params = { currentPage: this.currentPage, pageSize: this.pageSize }) {
    let params1 = {};
    if (this.isMasonryLayout) {
      if ((this.total !== 0 && this.data.length >= this.total) || this.status === REQUEST_STATUS.START) {
        return
      }
      params1 = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...params,
      }
    }
    this.status = REQUEST_STATUS.START;

    const mockData = {
      data: this.mockData ? this.mockData() : [], // 在派生类中定义
    };
    try {
      const { code, data } = await Vue.prototype.$ajax.get(this.url, params1, mockData);
      if (code === 200) {
        this.status = REQUEST_STATUS.SUCCESS;
        if (this.isMasonryLayout) {
          this.data.push(...data.data);
          this.currentPage = this.currentPage + 1;
          this.total = 20;
        } else {
          this.data = data.data;
        }
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    } catch (error) {
      this.status = REQUEST_STATUS.FAIL;
    }
  }
}

export class Model {
  autoLoad = false;


  get data () {
    return this.view.data;
  }

  get status () {
    return this.view.status
  }

  set data (data) {
    this.view.data = data;
  }

  set status (status) {
    this.view.status = status;
  }

  constructor(data = {}) {
    const view = {
      data,
      status: REQUEST_STATUS.NOT_START,
    };
    this.view = Vue.observable(view);
  }

  async load (params) { // read 方面
    this.status = REQUEST_STATUS.START;
    const params1 = {};
    const mockData = {
      data: this.mockData ? this.mockData() : {}, // 在派生类中定义
    };
    try {
      const { code, data } = await Vue.prototype.$ajax.get(this.proxy.url.read, params1, mockData);
      if (code === 200) {
        this.data = data.data;
        this.status = REQUEST_STATUS.SUCCESS;

      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    } catch (error) {
      this.status = REQUEST_STATUS.FAIL;
    }
  }

  async change (params) {
    const params1 = {};
    const mockData = {};
    this.status = REQUEST_STATUS.START;
    try {
      const { code, data } = await Vue.prototype.$ajax.get(this.proxy.url.change, params1, mockData);
      this.status = REQUEST_STATUS.SUCCESS;
    } catch (error) {
      this.status = REQUEST_STATUS.FAIL;
    }
  }

  async create (params) {
    const params1 = {};
    const mockData = {};
    this.status = REQUEST_STATUS.START;
    try {
      const { code, data } = await Vue.prototype.$ajax.get(this.proxy.url.create, params1, mockData);
      this.status = REQUEST_STATUS.SUCCESS;
    } catch (error) {
      this.status = REQUEST_STATUS.FAIL;
    }
  }
}