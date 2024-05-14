import { PreSignedURLResponse } from './dto';
import { clientWithTokenApi } from '../instance';

interface GetPreSignedURLParam {
  fileName: string;
}

/**
 *
 * ? 내가 이해한 pre-signed url은 s3에 지정한 시간 동안 s3에 접근할 수 있는 url
 * - 굳이 여기서 post요청인 이유가 있나?
 * - fileName을 굳이 여기서 보내야 하나?
 * - fileName은 끝나고 마지막에 한 번에 보내는 게 맞지 않나?
 * - 내가 잘못 알고 있을 수도 있는 부분:
 *    - pre-signed url은 발급 받을 때 fileName이 필요한지 여부
 *    - 요청했을 때 백엔드가 미리 fileName을 받아서 s3에 파일을 저장해 놓는 것인지 (방을 미리 파놓는 거?)
 */
export const getPreSignedURL = async ({ fileName }: GetPreSignedURLParam) => {
  const response = await clientWithTokenApi.post<PreSignedURLResponse>('/api/image', {
    fileName,
  });

  return response.data;
};
