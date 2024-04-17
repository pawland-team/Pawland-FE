import { todoHandlers } from '@shared/apis/todo-api';
import { userHandlers } from '@shared/apis/user-api';

// export const handlers = [...todoHandlers, ...folderHandlers, ...otherHandlers];
export const handlers = [...todoHandlers, ...userHandlers];
