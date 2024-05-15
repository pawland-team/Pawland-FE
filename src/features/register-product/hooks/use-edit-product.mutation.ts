import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productQueryKeys } from '@entities/product/apis';
import { editProduct } from '@shared/apis/product-api';

export const useEditProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all() });
    },
  });
};
