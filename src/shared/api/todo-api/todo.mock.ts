import { rest } from 'msw';

import { AddTodoRequestBody, Todo } from './dto';

const todos: Todo[] = [
  {
    id: 1,
    title: '밥먹기',
    isUrgent: false,
  },
  {
    id: 2,
    title: '공부하기',
    isUrgent: true,
  },
  {
    id: 3,
    title: '자기',
    isUrgent: false,
  },
  {
    id: 4,
    title: '놀기',
    isUrgent: false,
  },
];

/**
 * Higher-order request handlers 작성법 참고하여 분리하기(선택사항)
 * https://mswjs.io/docs/best-practices/typescript#higher-order-request-handlers
 */
export const todoHandlers = [
  // 할일 목록
  rest.get(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/todos`, (_req, res, ctx) => {
    return res(ctx.json(todos));
  }),

  // 급한 할일 목록
  rest.get(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/todos/urgent`, (req, res, ctx) => {
    const urgentTodos = todos.filter((todo) => todo.isUrgent);

    return res(ctx.json(urgentTodos));
  }),

  // 할일 추가
  rest.post(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/todos`, async (req, res, ctx) => {
    const newTodo = await req.json<AddTodoRequestBody>();
    todos.push({ id: todos.length + 1, title: newTodo.title, isUrgent: false });

    return res(ctx.json(todos));
  }),
];
