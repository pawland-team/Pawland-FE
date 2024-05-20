import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatQueryKeys } from '@entities/chat/apis';
import { productQueryKeys } from '@entities/product/apis';
import { completeTransaction } from '@shared/apis/order-api';

export const useCompleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<
    boolean,
    Error,
    {
      orderId: number;
      productId: number;
    },
    unknown
  >({
    mutationFn: completeTransaction,
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.chatRoomList() });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.productDetail(productId) });
    },
  });
};
