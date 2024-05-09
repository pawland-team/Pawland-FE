import { clientWithTokenApi } from '../instance';

export const postCancelWished = async (id: number) => {
  const response = await clientWithTokenApi.post(`/api/product/wish/cancel/${id}`, {
    id,
  });

  return response.data;
};
