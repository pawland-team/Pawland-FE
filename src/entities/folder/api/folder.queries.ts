import { queryOptions } from '@tanstack/react-query';

import { getFolderListApi } from '@shared/api/folder-api';

export const folderKeys = {
  all: () => ['folders'],
  folderInfo: (folderId: number) => [...folderKeys.all(), folderId],
};

export const folderQuery = {
  all: () =>
    queryOptions({
      queryKey: folderKeys.all(),
      queryFn: getFolderListApi,
    }),
};
