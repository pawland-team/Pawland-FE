import { GetDetailPetTourParams, GetDetailPetTourResponse } from './dto';
import { korDataWithToken } from '../instance';

export const getDetailPetTour = async ({ page, size }: GetDetailPetTourParams) => {
  const response = await korDataWithToken.get<GetDetailPetTourResponse>(
    `/detailPetTour1?serviceKey=${process.env.NEXT_PUBLIC_PET_ALLOWED_API_KEY}&pageNo=${page}&numOfRows=${size}&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON`,
  );

  return response.data;
};
