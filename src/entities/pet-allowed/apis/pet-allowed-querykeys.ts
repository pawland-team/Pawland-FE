import { queryOptions } from '@tanstack/react-query';

import { GetDetailPetTourParams, GetTourInformationParams } from '@shared/apis/pet-allowed-api/dto';
import { getDetailPetTour } from '@shared/apis/pet-allowed-api/get-detail-pet-tour-api';
import { getTourInformation } from '@shared/apis/pet-allowed-api/get-tour-information-api';

export const petAllowedQueryKeys = {
  all: () => ['pet-allowed'],
  detailPetTour: ({ page, size }: GetDetailPetTourParams) => [...petAllowedQueryKeys.all(), { page, size }],
  tourInformation: ({ page, size, contentId, contentTypeId }: GetTourInformationParams) => [
    ...petAllowedQueryKeys.all(),
    { page, size, contentId, contentTypeId },
  ],
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
  tourInformation: ({ page, size, contentId, contentTypeId }: GetTourInformationParams) =>
    queryOptions({
      queryKey: petAllowedQueryKeys.all(),
      queryFn: () => getTourInformation({ page, size, contentId, contentTypeId }),
    }),
};
