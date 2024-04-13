// 얘네는 /api/todo-api/dto에 정의해놓고 가져오는 게 더 나을 듯

export interface AddTodoParam {
  userId: string;
}

export interface AddTodoRequestBody {
  title: string;
}

export interface Todo {
  id: number;
  title: string;
}
