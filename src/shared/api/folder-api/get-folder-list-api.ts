import { clientWithTokenApi } from '../instance';
import { FolderWithLinkCount } from './dto';

export type FolderCategoryResponse = FolderWithLinkCount[];

export const getFolderListApi = async () => {
  const response = await clientWithTokenApi.get<FolderCategoryResponse>('/folders');

  return response.data;
};
