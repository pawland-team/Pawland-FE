import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productQueryKeys } from '@entities/product/apis';
import { registerProduct } from '@shared/apis/product-api';

export const useRegisterProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all() });
    },
  });
};
