import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { ProductImageListStoreState } from './models';

export const useProductImageListStore = createWithEqualityFn<ProductImageListStoreState>()(
  devtools(
    (set) => ({
      preRegisteredToS3ProductImageList: [],
      appendPreRegisteredToS3ProductImage: (preRegisteredToS3ProductImage) =>
        set(
          (prevState) => ({
            preRegisteredToS3ProductImageList: [
              ...prevState.preRegisteredToS3ProductImageList,
              preRegisteredToS3ProductImage,
            ],
          }),
          false,
          {
            type: 'useProductImageListStore/appendPreRegisteredToS3ProductImage',
          },
        ),
      clearPreRegisteredToS3ProductImageList: () =>
        set({ preRegisteredToS3ProductImageList: [] }, false, {
          type: 'useProductImageListStore/clearPreRegisteredToS3ProductImageList',
        }),
    }),
    {
      anonymousActionType: 'useProductImageListStore Action',
      name: 'useProductImageListStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
  shallow,
);
