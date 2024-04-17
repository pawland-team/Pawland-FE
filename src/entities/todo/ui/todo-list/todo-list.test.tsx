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
  // beforeEach(() => {
  //   jest.spyOn(console, 'error').mockImplementation(() => {});
  // });

  // afterAll(() => {
  //   jest.restoreAllMocks();
  // });

  it('TodoList Component Render', async () => {
    // given - useGetTodoList 훅을 사용하여 할 일 목록을 가져온다.
    const { result } = renderHook(() => useGetTodoList(), { wrapper: createWrapper() });

    let data: Todo[] = [];

    // when - success 상태일 때
    // ✅ wait until the query has transitioned to success state
    if (result.current.status === 'success') {
      data = result.current.data;
      render(<TodoList todoList={data} />);

      // then - TodoList 컴포넌트 내부 아이템 요소가 렌더링 되었는지 확인한다.
      // expect(screen.getByText('할 일')).toBeInTheDocument();
      const todo = await screen.findByText('공부하기');
      expect(todo).toBeInTheDocument();
    }
  });
});
