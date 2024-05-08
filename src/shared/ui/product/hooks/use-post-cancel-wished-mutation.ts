import { useMutation } from '@tanstack/react-query';

import { postCancelWished } from '@shared/apis/product-api';

export const usePostCancelWishedMutation = () => {
  return useMutation({
    mutationFn: (id: number) => postCancelWished(id),
  });
};
