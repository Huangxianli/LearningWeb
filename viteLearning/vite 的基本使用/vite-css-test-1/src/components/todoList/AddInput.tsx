import todoListCss from './todoList.module.css';

const AddInput = () => {
  return (
    <>
      <div className={todoListCss.todo_list_input_box}>
        <input
          className={todoListCss.todo_list_input}
          type="text"
          placeholder="请输入要添加的代办事项"
        />
        <button className={todoListCss.todo_list_add_button}>添加</button>
      </div>
    </>
  );
};

export default AddInput;
