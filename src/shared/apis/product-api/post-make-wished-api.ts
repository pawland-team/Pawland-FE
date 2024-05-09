import { clientWithTokenApi } from '../instance';

export const postMakeWished = async (id: number) => {
  const response = await clientWithTokenApi.post(`/api/product/wish/${id}`, {
    id,
  });

  return response.data;
};
