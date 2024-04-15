import { Todo } from '@shared/api/todo-api';

interface UrgentTodoListProps {
  urgentTodoList: Todo[];
}

/**
 * 긴급할 일 목록 컴포넌트
 * @description
 * 실제로는 할 일을 filter해서 구분하는 것이 좋겠죠?ㅎㅎ
 * 예시 만들기 귀찮아서 그냥 이렇게 구분했습니다.
 */
export const UrgentTodoList = ({ urgentTodoList }: UrgentTodoListProps) => {
  return (
    <div>
      <h2>급한 일 목록</h2>
      {urgentTodoList.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};
