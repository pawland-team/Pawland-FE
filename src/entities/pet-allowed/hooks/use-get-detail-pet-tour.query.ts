import { useQuery } from '@tanstack/react-query';

import { GetDetailPetTourParams } from '@shared/apis/pet-allowed-api/dto';

import { petAllowedQuery } from '../apis';

export const useGetDetailPetTour = ({ page, size }: GetDetailPetTourParams) => {
  return useQuery({
    ...petAllowedQuery.detailPetTour({ page, size }),
  });
};
