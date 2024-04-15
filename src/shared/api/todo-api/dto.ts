export interface AddTodoParam {
  userId: string;
}

export interface AddTodoRequestBody {
  title: string;
}

export interface Todo {
  id: number;
  title: string;
  isUrgent: boolean;
}
