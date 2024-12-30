import Vue from 'vue';
import { REQUEST_STATUS } from '@/constant/requestStatus.js';

const setFormData = Symbol('setFormData');
export class Model {
  get fromData () {
    return this.view.fromData;
  }
  set fromData (formData) {
    this.view.formData = formData;
  }
  get status () {
    return this.view.status;
  }
  set status (status) {
    this.view.status = status;
  }

  constructor(fromData = {}) {
    this.view = {};
    this.formData = fromData;
    Vue.set(this.view, 'formData', fromData);
    Vue.set(this.view, 'status', REQUEST_STATUS.UN_START);
  }
  [setFormData] () {
    const formData = {
      taskType: '1',
      isRelatedProject: 'Y',
      project: '1',
      milestone: '1',
      taskName: '1',
      taskDescription: '1',
      taskDepartment: '1',
      taskOwner: '1',
      taskStartTime: '11111',
      taskDueTime: '11111',
      outputValue: '1',
    }
    return formData;
  }
  async load ({ rowId = '' } = { rowId: '' }) {
    rowId;
    const data = {
      data: this[setFormData]()
    };
    this.status = REQUEST_STATUS.LOADING;
    await Vue.prototype.$ajax(data).then(res => {
      if (res.code === 200) {
        this.status = REQUEST_STATUS.SUCCESS;
        this.formData = res.data.data;
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    })

  }
  async save () {
    const data = {
      data: this[setFormData]()
    };
    this.status = REQUEST_STATUS.LOADING;
    await Vue.prototype.$ajax(data).then(res => {
      if (res.code === 200) {

        this.status = REQUEST_STATUS.SUCCESS;
        this.formData = res.data.data;
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    })
  }
  async start () {
    const data = {
      data: this[setFormData]()
    };
    this.status = REQUEST_STATUS.LOADING;
    await Vue.prototype.$ajax(data).then(res => {
      if (res.code === 200) {

        this.status = REQUEST_STATUS.SUCCESS;
        this.formData = res.data.data;
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    })
  }
  async delete () {
    const data = {
      data: this[setFormData]()
    };
    this.status = REQUEST_STATUS.LOADING;
    await Vue.prototype.$ajax(data).then(res => {
      if (res.code === 200) {

        this.status = REQUEST_STATUS.SUCCESS;
        this.formData = res.data.data;
      } else {
        this.status = REQUEST_STATUS.FAIL;
      }
    })
  }
}