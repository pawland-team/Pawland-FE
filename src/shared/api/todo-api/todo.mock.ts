import { http, HttpResponse } from 'msw';

import { AddTodoParam, AddTodoRequestBody, Todo } from './dto';

const todos: Todo[] = [
  {
    id: 1,
    title: '밥먹기',
  },
  {
    id: 2,
    title: '공부하기',
  },
  {
    id: 3,
    title: '자기',
  },
  {
    id: 4,
    title: '놀기',
  },
];

/**
 * Higher-order request handlers 작성법 참고하여 분리하기(선택사항)
 * https://mswjs.io/docs/best-practices/typescript#higher-order-request-handlers
 */
export const todoHandlers = [
  // 할일 목록
  // http.get('/todos', ({ cookies, params, request, requestId }) => {
  http.get('/todos', (_info) => {
    // return new Response(ctx.status(200), ctx.json(todos));
    return HttpResponse.json(todos, {
      status: 200,
      statusText: 'OK',
    });
  }),

  // 할일 추가
  http.post<AddTodoParam, AddTodoRequestBody, Todo[]>('/todos', async ({ request }) => {
    const newTodo = await request.json();
    todos.push({ id: todos.length + 1, title: newTodo.title });

    return HttpResponse.json(todos);
  }),
];
