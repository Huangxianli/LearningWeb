import JSXTest2_1 from './JSXTest2_1';
import JSXTest2_2 from './JSXTest2_2.vue';
import type { ListItem } from './types';

export default {
  setup() {
    return () => (
      <div>
        {/* 插槽在 jsx 中的使用 */}
        <h3>插槽在 jsx 中使用</h3>
        <JSXTest2_1
          v-slots={{
            default: ({ list = [] }: { list: ListItem[] }) => (
              <ul>
                {list.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            ),
            footer: () => <>footer</>,
          }}
        ></JSXTest2_1>
        <br />
        {/* 这种方式也支持 */}
        <JSXTest2_1>
          {{
            footer: () => 'footer 插槽内容',
          }}
        </JSXTest2_1>
        <JSXTest2_2>
          {{
            default: () => <div>测试111</div>,
          }}
        </JSXTest2_2>
      </div>
    );
  },
};
