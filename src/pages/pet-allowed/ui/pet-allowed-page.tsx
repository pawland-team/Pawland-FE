import { useGetDetailPetTour } from '@entities/pet-allowed/hooks';

import * as S from './style';

const PetAllowedPage = () => {
  const { data } = useGetDetailPetTour({ page: 1, size: 20 });

  console.log(data);

  return <S.PetAllowedArea>aha</S.PetAllowedArea>;
};

export { PetAllowedPage };

// https://apis.data.go.kr/B551011/KorService1/detailPetTour1?serviceKey=C2BAJNUfe%2FDDlce48L8JXUgWtPcmx0OIkl%2BoQnRemqgQs8RtmI6EqGK8Nt%2BQkJ5EKxmVV45LLidNSsuaUTeiMA%3D%3D&pageNo=1&numOfRows=20&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON
// http://localhost:3000/apis.data.go.kr/B551011/KorService1/detailPetTour1?serviceKey=C2BAJNUfe/DDlce48L8JXUgWtPcmx0OIkl+oQnRemqgQs8RtmI6EqGK8Nt+QkJ5EKxmVV45LLidNSsuaUTeiMA==&pageNo=1&numOfRows=20&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON
