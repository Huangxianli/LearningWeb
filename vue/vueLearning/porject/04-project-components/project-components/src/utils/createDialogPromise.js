import Vue from 'vue';
// import { Button, Dialog } from 'element-ui';
import { Dialog } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



export function createDialogPromise (component) {
  return (data, options) => {
    return new Promise(() => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      function destroyDialog () {
        app.$destroy();
        app.$el.remove();
      }
      const app = new Vue({
        render (h) {
          return h(
            Dialog,
            {
              props: {
                visible: true,
                title: '默认的标题',
                closeOnClickModal: false,
                ...options.props
              },
              on: {
                close () {
                  destroyDialog();
                }
              },
            },
            [
              h(
                component,
                {
                  props: {
                    rowId: data.rowId,
                    dialogType: data.dialogType
                  },
                  on: {
                    confirm () {
                      destroyDialog();
                    },
                    cancel () {
                      destroyDialog();
                    }
                  }
                }
              ),
              // h('div', { slot: 'footer' }, [
              //   h(Button, {
              //     props: {
              //       type: 'primary',
              //       size: 'mini',
              //     },
              //     on: {
              //       click () {
              //         destroyDialog();
              //       }
              //     }
              //   }, '确定'),
              //   h(Button, {
              //     props: {
              //       size: 'mini',
              //     },
              //     on: {
              //       click () {
              //         destroyDialog();
              //       }
              //     }
              //   }, '取消')
              // ])
            ],
          );
        }
      });
      app.$mount(div);
    })
  }
}