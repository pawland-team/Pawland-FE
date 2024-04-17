import { rest } from 'msw';

import { User } from './dto';

const user: User = {
  id: '1',
  name: 'Voldemort',
};

export const userHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/user`, (_req, res, context) => {
    return res(context.json(user));
  }),
];
