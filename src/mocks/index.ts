async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');

    // 노드 환경에서 사용하는 Mock Server 옵션 추가
    // server.listen(필요한옵션);
    server.listen({ onUnhandledRequest: 'bypass' });
  } else if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');

    // Service Worker Mocking 옵션 추가
    // worker.start(필요한옵션);
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

export { initMSW };
