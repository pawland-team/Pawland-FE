import { useQuery } from '@tanstack/react-query';

import { GetTourInformationParams } from '@shared/apis/pet-allowed-api/dto';

import { petAllowedQuery } from '../apis';

export const useGetTourInformation = ({ page, size, contentId, contentTypeId }: GetTourInformationParams) => {
  return useQuery({
    ...petAllowedQuery.tourInformation({ page, size, contentId, contentTypeId }),
  });
};
