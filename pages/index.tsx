import { HomePage } from '@pages/home';

const Home = () => {
  return <HomePage />;
};

export default Home;

// TODO : 메인 리스트도 getServerSideProps로 정적 생성한 것을 pre-fetch 할 수 있도록 만들자.
// 그 전에 pre-fetch 하기 전과 후의 네트워크 상태를 기록하자.
