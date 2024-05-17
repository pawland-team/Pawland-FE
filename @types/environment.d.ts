declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    // 추가적인 환경 변수가 있다면 여기에 추가합니다.
    NEXT_PUBLIC_API_MOCKING: string;
    NEXT_PUBLIC_LOCAL_HOST: string;
    NEXT_PUBLIC_WSS_URL: string;
    NEXT_PUBLIC_PORT_ONE: string;
    DEPLOYED_FRONT_SERVER_URL: string;
    SERVER_URL_ON_SSR: string;
    NEXT_PUBLIC_NAVER_CLIENT_ID: string;
    NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_BUCKET_BASE_URL: string;
  }
}
