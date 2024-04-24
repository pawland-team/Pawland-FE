import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, screen } from '@testing-library/react';

import { useGetTodoList } from '@entities/todo/hooks';
import { Todo } from '@shared/apis/todo-api';

import { TodoList } from './todo-list';

const createWrapper = () => {
  // https://tanstack.com/query/latest/docs/framework/react/guides/testing?from=reactQueryV3#_top
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // https://tanstack.com/query/latest/docs/framework/react/guides/testing?from=reactQueryV3#set-gctime-to-infinity-with-jest
        gcTime: Infinity,
      },
    },
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'TestWrapper';

  return Wrapper;
};

describe('TodoList Component test', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('TodoList Component Render', async () => {
    // given - todolist api를 호출하여
    const { result } = renderHook(() => useGetTodoList(), { wrapper: createWrapper() });

    // ✅ wait until the query has transitioned to success state
    let data: Todo[] = [];

    // when - status가 성공상태가 되고 TodoList가 화면에 렌더링되면
    if (result.current.status === 'success') {
      data = result.current.data;
      render(<TodoList todoList={data} />);

      // then - 가져온 내용이 TodoList 컴포넌트에 채워져 있다.
      // expect(screen.getByText('할 일')).toBeInTheDocument();
      const todo = await screen.findByText('공부하기');
      expect(todo).toBeInTheDocument();
    }
  });
});
