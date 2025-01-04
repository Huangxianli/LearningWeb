import Vue from 'vue';

import { REQUEST_STATUS } from '@/constant/requestStatus.js';

export class Store {
  autoLoad = true;
  useDefaultOptions = true;

  get status () {
    return this.view.status;
  }
  set status (status) {
    this.view.status = status;
  }
  get options () {
    return this.view.options;
  }
  set options (options) {
    Vue.set(this.view, 'options', options);
  }
  get defaultOptions () {
    return this.view.defaultOptions;
  }
  set defaultOptions (defaultOptions) {
    Vue.set(this.view, 'defaultOptions', defaultOptions)
  }

  constructor(options = []) {
    this.view = {};
    this.options = options;
    Vue.set(this.view, 'options', options);
    Vue.set(this.view, 'status', REQUEST_STATUS.UN_START);
  }

  setDefaultOptions (defaultOptions) {
    this.defaultOptions = defaultOptions;
    this.options = defaultOptions;
  }
  // 请求数据
  async load (params, options) {
    params;
    this.status = REQUEST_STATUS.LOADING;
    const data = {
      data: options,
    };
    await Vue.prototype.$ajax(data).then(res => {
      if (res.code === 200) {
        this.status = REQUEST_STATUS.SUCCESS;
        this.options = res.data.data;
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    });
  }
}