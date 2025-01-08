import Vue from 'vue';
export default class Model {
  constructor(data = {}) {
    const view = {
      data,
    };
    this.view = Vue.observable(view);
  }
  add () {

  }
  delete () {

  }
  change () {

  }

  load () {

  }
}