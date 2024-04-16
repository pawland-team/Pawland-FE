import { Todo } from '@shared/apis/todo-api';

interface TodoListProps {
  todoList: Todo[];
}

/**
 * 할 일 목록 컴포넌트
 */
export const TodoList = ({ todoList }: TodoListProps) => {
  return (
    <section>
      <h2>할 일</h2>
      <div data-testid='todolist'>
        {todoList.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </section>
  );
};
