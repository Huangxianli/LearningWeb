import Vue from 'vue';
import { Dialog } from 'element-ui';

import DialogFooterButton from './DialogFooterButton.vue';

import { DIALOG_TYPE } from './constant';

export function createPromiseDialog (component) {
  return (componentData = {}, dialogOptions = {}) => {

    return new Promise((resolve, reject) => {
      const div = document.createElement('div');
      div.id = 'self_promise_dialog';
      document.body.appendChild(div);
      function destroy () {

        // promiseDialog.$refs.promiseDialog.

        promiseDialog.$destroy();
        promiseDialog.$el.remove();
      };


      const promiseDialog = new Vue({
        el: '#self_promise_dialog',
        render (h) {
          return h(
            Dialog,
            {
              props: {
                visible: true,
                title: '默认的标题',
                closeOnClickModal: false,
                width: '600px',
                ...(dialogOptions.props || {})
              },
              on: {
                close: destroy,
                ...(dialogOptions.on || {})
              }
            },
            [
              h(
                component,
                {
                  ref: 'componentRef',
                  props: {
                    dialogType: componentData.type || DIALOG_TYPE.READ, // add change read
                  }
                },

              ),
              h(
                DialogFooterButton,
                {
                  slot: 'footer',
                  on: {
                    clickConfim: destroy,
                    clickCancel: destroy,
                    clickClose: destroy,
                  },
                  props: {
                    dialogType: componentData.type || DIALOG_TYPE.READ,
                  }
                },
              )
            ],
          )
        }
      });
    });
  };
};
