// 在你的项目中的 .d.ts 文件 (例如：env.d.ts 或者 vue-jsx.d.ts)
// 确保这个文件被 tsconfig.json 中的 "include" 包含

import 'vue'; // 必须导入 'vue' 来使其成为模块扩展
import { outClickExcludes } from './directives/outClickExcludes';

declare module 'vue' {
  // 扩展 JSX 的 HTMLAttributes
  interface HTMLAttributes {
    onClickOnce?: (...args: any[]) => any;
    onClickCapture?: (...args: any[]) => any;
    onClickPassive?: (...args: any[]) => any;
    // 你可以根据需要添加其他驼峰式的事件修饰符
    // 例如 onMouseoverOnce?: (...args: any[]) => any;
  }

  export interface GlobalDirectives {
    // 告诉 TypeScript，现在有一个全局指令叫 vOutClickExcludes
    // 它的类型就是我们从文件中导出的那个 outClickExcludes 的类型
    vOutClickExcludes: typeof outClickExcludes;
  }
}
