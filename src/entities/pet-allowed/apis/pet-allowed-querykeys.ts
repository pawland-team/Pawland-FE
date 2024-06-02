import { queryOptions } from '@tanstack/react-query';

import { GetDetailPetTourParams } from '@shared/apis/pet-allowed-api/dto';
import { getDetailPetTour } from '@shared/apis/pet-allowed-api/get-detail-pet-tour-api';

export const petAllowedQueryKeys = {
  all: () => ['pet-allowed'],
  detailPetTour: ({ page, size }: GetDetailPetTourParams) => [...petAllowedQueryKeys.all(), { page, size }],
};

export const petAllowedQuery = {
  all: () =>
    queryOptions({
      queryKey: petAllowedQueryKeys.all(),
    }),
  detailPetTour: ({ page, size }: GetDetailPetTourParams) =>
    queryOptions({
      queryKey: petAllowedQueryKeys.all(),
      queryFn: () => getDetailPetTour({ page, size }),
    }),
};
