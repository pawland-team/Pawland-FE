// import { useGetDetailPetTour } from '@entities/pet-allowed/hooks';
import { useGetTourInformation } from '@entities/pet-allowed/hooks/use-get-tour-information.query';
import { StartFunnel } from '@features/pet-allowed';
import { FinalFunnel } from '@features/pet-allowed/ui/funnel/final-funnel';
import { SelectRegion } from '@features/pet-allowed/ui/funnel/select-region';
// import { StartFunnel } from '@features/pet-allowed';
import { SelectType } from '@features/pet-allowed/ui/funnel/select-type';
import { useFunnel } from '@shared/hooks/use-funnel';

const PET_ALLOW_SEARCH_FUNNEL = {
  start: 'start',
  type: 'type',
  region: 'region',
  final: 'final',
};

const PetAllowedPage = () => {
  const { start, type, region, final } = PET_ALLOW_SEARCH_FUNNEL;
  const funnelSteps = [start, type, region, final] as const;

  const [Funnel, activeStepIndex, setStep] = useFunnel(funnelSteps, {
    initialStep: start,
  });
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
      <Funnel>
        <Funnel.Step name={start}>
          <StartFunnel onNext={() => setStep(type)} />
        </Funnel.Step>
        <Funnel.Step name={type}>
          <SelectType onPrev={() => setStep(start)} onNext={() => setStep(region)} />
        </Funnel.Step>
        <Funnel.Step name={region}>
          <SelectRegion onPrev={() => setStep(type)} onNext={() => setStep(final)} />
        </Funnel.Step>
        <Funnel.Step name={final}>
          <FinalFunnel />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export { PetAllowedPage };

// https://apis.data.go.kr/B551011/KorService1/detailPetTour1?serviceKey=C2BAJNUfe%2FDDlce48L8JXUgWtPcmx0OIkl%2BoQnRemqgQs8RtmI6EqGK8Nt%2BQkJ5EKxmVV45LLidNSsuaUTeiMA%3D%3D&pageNo=1&numOfRows=20&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON
// http://localhost:3000/apis.data.go.kr/B551011/KorService1/detailPetTour1?serviceKey=C2BAJNUfe/DDlce48L8JXUgWtPcmx0OIkl+oQnRemqgQs8RtmI6EqGK8Nt+QkJ5EKxmVV45LLidNSsuaUTeiMA==&pageNo=1&numOfRows=20&MobileOS=IOS&MobileApp=PAWLAND&_type=JSON
