# S 单一职责原则

核心思想是：**一个类应该只有一个引起它变化的原因**

## 什么是单一职责原则

```tsx
class Employee {
  // 计算薪水
  public calculatePay(): number {
    console.log('正在计算薪水...');
    return 10000;
  }

  // 存数据库
  public saveToDatabase(): void {
    console.log('正在保存到数据库...');
  }

  // 生成报告
  public generateReport(): string {
    console.log('正在生成 HTML 报告...');
    return '<html>...</html>';
  }
}
```

在上面的这个示例中，计算薪水的公式、存储数据库的方式、生成报告的方式发生了改变，都会要修改这个类，那么就违背了*一个类应该只有一个引起它变化的原因*这个单一职责原则

其实从上面的类来看，涉及到了 3 个职责，可以吧它划分成 3 个类

```ts
class PayCalculator {
  public calculate(employeeId: number): number {
    console.log(`正在计算员工 ${employeeId} 的薪水...`);
    return 10000;
  }
}

class EmployeeRepository {
  public save(employeeId: number, salary: number): void {
    console.log(`正在将员工 ${employeeId} 的薪资 ${salary} 保存到数据库...`);
  }
}

class ReportGenerator {
  public generate(employeeId: number, salary: number): string {
    console.log(`正在为员工 ${employeeId} 生成 HTML 报告...`);
    return `<html>员工 ${employeeId}: 薪资 ${salary}</html>`;
  }
}

// 现在要将这 3 个流程串起来，那么这个时候，就需要一个管理者来处理，创建一个管理类
class EmployeeService {
  public handleMonthlyWork(id: number): void {
    const calculator = new PayCalculator();
    const repository = new EmployeeRepository();
    const generator = new ReportGenerator();
    // 操作
    const salary = calculator.calculate(id);
    repository.save(id, salary);
    const reportHtml = generator.generate(id, salary);
  }
}
```

## S 的深层定义

单一职责原则更深层的定义：**为了谁而变**，一个模块应该只对一个“角色”（指现实中的人或者部门）负责

例如 HR 和 CFO 计算工时，HR 和 CFO 是两个类，获取工时 和 计算工时是两个方法，那么在最初使的时候，由于两个人要的计算工时的公式是一致的，我们将计算工时的方法抽离成一个新的类
