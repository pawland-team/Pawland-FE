// import { useGetDetailPetTour } from '@entities/pet-allowed/hooks';
import { useGetTourInformation } from '@entities/pet-allowed/hooks/use-get-tour-information.query';
import { StartFunnel } from '@features/pet-allowed';

const PetAllowedPage = () => {
  // const { data } = useGetDetailPetTour({ page: 1, size: 20 });

  const { data: tourInformationData } = useGetTourInformation({
    page: 1,
    size: 20,
    contentId: 125534,
    contentTypeId: 12,
  });

  // console.log(`useGetDetailPetTour${data}`);
  console.log(tourInformationData);

  return (
    <>
      <StartFunnel />
    </>
  );
};

export { PetAllowedPage };

// https://apis.data.go.kr/B551011/KorService1/detailPetTour1?serviceKey=C2BAJNUfe%2FDDlce48L8JXUgWtPcmx0OIkl%2BoQnRemqgQs8RtmI6EqGK8Nt%2BQkJ5EKxmVV45LLidNSsuaUTeiMA%3D%3D&pageNo=1&numOfRows=20&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON
// http://localhost:3000/apis.data.go.kr/B551011/KorService1/detailPetTour1?serviceKey=C2BAJNUfe/DDlce48L8JXUgWtPcmx0OIkl+oQnRemqgQs8RtmI6EqGK8Nt+QkJ5EKxmVV45LLidNSsuaUTeiMA==&pageNo=1&numOfRows=20&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON
