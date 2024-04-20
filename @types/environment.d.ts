declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    // 추가적인 환경 변수가 있다면 여기에 추가합니다.
    NEXT_PUBLIC_API_MOCKING: string;
    NEXT_PUBLIC_LOCAL_HOST: string;
    NEXT_PUBLIC_WS_URL: string;
    NEXT_PUBLIC_PORT_ONE: string;
  }
}
