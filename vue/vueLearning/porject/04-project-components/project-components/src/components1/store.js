import Vue from 'vue';
export class Store {
  #loadTime = 0
  #view;
  useStaticeData = false;
  autoLoad = false;
  get data () {
    return this.#view.data;
  }
  set data (data) {
    this.#view.data = data;
  }

  get pageSize () {
    return this.#view.pageSize;
  }
  set pageSize (pageSize) {
    this.#view.pageSize = pageSize;
  }

  constructor(data = []) {
    const view = {
      data: data,
      pageSizes: [5, 10, 20, 50, 100], // 这里要像办法可以外部传过来
      currentPage: 1,
      lastSuccessPage: 1,
      pageSize: 5, // 这里也要想办法可以外部传过来
      lastSuccessPageSize: 5,
      total: data.length || 0,
    };
    this.#view = Vue.observable(view);
  }

  async load (params) {
    this.#loadTime++;
    const loadTime = this.#loadTime; // 该变量用于解决竞态问题

    // 要记住上一次请求成功时的 当前页码，每页的条数，如果请求失败要回退到那一页和哪一个页码
    const mockData = {
      data: [],
      pageSize: 5,
      currentPage: 1,
      total: 0,
    };
    await Vue.prototype.$ajax1.get(params, mockData).then(res => {
      if (!loadTime === this.#loadTime) {
        return
      }
      if (res.code === 200) {
        this.data = res.data.data;
        this.pageSize = res.data.pageSize;
        this.lastSuccessPage = res.data.currentPage;
        this.currentPage = res.data.currentPage;
        this.lastSuccessPageSize = res.data.pageSize;
      } else {
        // httpCode 为 200，但是 code 不为 200
        // 分页要回到上一次请求成功时的状态
        this.pageSize = this.lastSuccessPageSize;
        this.currentPage = this.lastSuccessPage;
      }
    }).catch(err => { err })
  }
}

