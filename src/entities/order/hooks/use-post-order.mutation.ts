import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myProductQueryKeys } from '@entities/profile/apis';
import { postOrder } from '@shared/apis/order-api';

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myProductQueryKeys.all() });
    },
  });
};
