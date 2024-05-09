import { useMutation } from '@tanstack/react-query';

import { postMakeWished } from '@shared/apis/product-api';

export const usePostMakeWishedMutation = () => {
  return useMutation({
    mutationFn: (id: number) => postMakeWished(id),
  });
};
