import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, screen } from '@testing-library/react';

import { useGetTodoList } from '@entities/todo/hooks';
import { Todo } from '@shared/api/todo-api';

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
    // given
    const { result } = renderHook(() => useGetTodoList(), { wrapper: createWrapper() });

    // ✅ wait until the query has transitioned to success state
    let data: Todo[] = [];

    // given - Home 화면이 그려진다.
    if (result.current.status === 'success') {
      data = result.current.data;
      render(<TodoList todoList={data} />);

      // then - TodoList 컴포넌트가 그려진다.
      // expect(screen.getByText('할 일')).toBeInTheDocument();
      const todo = await screen.findByText('공부하기');
      expect(todo).toBeInTheDocument();
    }
  });
});
