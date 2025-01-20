import Vue from 'vue';
import { Dialog } from 'element-ui';

import { DIALOG_TYPE } from './constant';

export function createPromiseDialog (component) {
  return (componentData = {}, dialogOptions = {}, other = {
    afterConfirm: () => undefined,
    afterCancel: () => undefined,
    afterClose: () => undefined

  }) => {

    return new Promise((resolve, reject) => {
      const div = document.createElement('div');
      div.id = 'self_promise_dialog';
      document.body.appendChild(div);
      function destroy (data, isConfirm) {
        promiseDialog.$destroy();
        promiseDialog.$el.remove();
        if (isConfirm) {
          resolve(data);
        } else {
          reject(data);
        }

      };
      const promiseDialog = new Vue({
        el: '#self_promise_dialog',
        componentName: 'self_promise_dialog',
        render (h) {
          return h(
            Dialog,
            {
              props: {
                visible: true,
                title: '默认的标题',
                closeOnClickModal: true,
                width: '600px',
                ...(dialogOptions.props || {})
              },
              on: {
                close: () => destroy(),
                ...(dialogOptions.on || {})
              }
            },
            [
              h(
                component,
                {
                  ref: 'componentRef',
                  props: {
                    dialogType: componentData.dialogType || DIALOG_TYPE.READ, // add change read
                  },
                  on: {
                    clickConfirm: (data) => {
                      destroy(data, true)
                    },
                    clickCancel: (data) => destroy(data, false),
                    clickClose: (data) => destroy(data, true),
                  }
                },

              ),
              h('div', {
                slot: 'footer',
                attrs: {
                  id: 'self_promise_dialog_footer'
                }
              }),
              // h(
              //   DialogFooterButton,
              //   {
              //     slot: 'footer',
              //     on: {
              //       clickConfirm: destroy,
              //       clickCancel: destroy,
              //       clickClose: destroy,
              //     },
              //     props: {
              //       dialogType: componentData.dialogType || DIALOG_TYPE.READ,
              //     }
              //   },
              // )
            ],
          )
        }
      });
    });
  };
};
