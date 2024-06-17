import { GetTourInformationParams, GetTourInformationResponse } from './dto';
import { korDataWithToken } from '../instance';

export const getTourInformation = async ({ page, size, contentId, contentTypeId }: GetTourInformationParams) => {
  const response = await korDataWithToken.get<GetTourInformationResponse>(
    `/detailCommon1?serviceKey=${process.env.NEXT_PUBLIC_PET_ALLOWED_API_KEY}&MobileOS=ETC&MobileApp=PAWLAND&_type=json&contentId=${contentId}&contentTypeId=${contentTypeId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=${size}&pageNo=${page}`,
  );

  return response.data;
};

// https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=...&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=125534&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1
