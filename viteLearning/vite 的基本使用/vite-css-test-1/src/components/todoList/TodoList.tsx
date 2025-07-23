import AddInput from './AddInput';

import todoListCss from './todoList.module.css';
const TodoList = () => {
  return (
    <>
      <div className={todoListCss.todo_list}>
        <div className={todoListCss.todo_list_box}>
          <AddInput></AddInput>
        </div>
      </div>
    </>
  );
};
export default TodoList;
