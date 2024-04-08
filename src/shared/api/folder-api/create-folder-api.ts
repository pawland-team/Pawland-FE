import { AxiosResponse } from 'axios';

import { clientWithTokenApi } from '../instance';
import { Folder } from './dto';

export type CreateNewFolderResponse = Folder[];

interface CreateNewFolderRequestBody {
  name: string;
}

export interface CreateFolderParam {
  name: string;
}

export const createFolderApi = async ({ name }: CreateFolderParam) => {
  const response = await clientWithTokenApi.post<
    CreateNewFolderResponse,
    AxiosResponse<CreateNewFolderResponse>,
    CreateNewFolderRequestBody
  >('/folders', {
    name,
  });

  return response.data;
};
