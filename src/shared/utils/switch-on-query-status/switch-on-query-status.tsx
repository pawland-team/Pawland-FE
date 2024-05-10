import { QueryStatus } from '@tanstack/react-query';

// QueryStatus;

type OnQueryStatus = 'onError' | 'onPending' | 'onSuccess';

type ReactNodeOnQueryOnStatus = {
  [key in OnQueryStatus]?: React.ReactNode;
};

interface SwitchQueryProps extends ReactNodeOnQueryOnStatus {
  status: QueryStatus;
}

/**
 * @description 단축 평가를 대체하기 위해 사용. 굳이 쓰지 않아도 된다.
 * @example
 * <SwitchQuery
 *  status={status}
 *  onPending={<div>Loading...</div>}
 *  onError={<div>Error</div>}
 *  onSuccess={status === 'success' && <TodoList todoList={data} />}
 * />
 */
export const SwitchOnQueryState = ({ status, onError, onPending, onSuccess }: SwitchQueryProps) => {
  switch (status) {
    case 'error':
      return onError;
    case 'pending':
      return onPending;
    case 'success':
      return onSuccess;
    default:
      break;
  }
};
