import JSXTest2_1 from './JSXTest2_1';
import type { ListItem } from './types';

export default {
  setup() {
    return () => (
      <div>
        {/* 插槽在 jsx 中的使用 */}
        <JSXTest2_1
          v-slots={{
            default: ({ list = [] }: { list: ListItem[] }) => (
              <ul>
                {list.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            ),
          }}
        ></JSXTest2_1>
        <br />
        {/* 这种方式也支持 */}
        <JSXTest2_1>
          {{
            footer: () => 'footer 插槽内容',
          }}
        </JSXTest2_1>
      </div>
    );
  },
};
