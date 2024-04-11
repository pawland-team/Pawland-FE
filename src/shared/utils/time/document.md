## 베럴 파일 패턴과 코드 스플리팅에 대한 이해(feat. Chunk)

번들 파일의 크기를 적당한 크기로 분할해놓는 방법에 대해 알아보세요.

1. [웹 앱의 번들 크기를 줄이기 위해 할 수 있는 모든 것](https://velog.io/@lky5697/reduce-webapp-bundle-size)
2. [모듈 import 범위에 따른 코드 스플릿](<https://olimjo.tistory.com/373#1-4.%20%EB%AA%A8%EB%93%88%20import%20%EB%B2%94%EC%9C%84%EC%97%90%20%EB%94%B0%EB%A5%B8%20%EC%BD%94%EB%93%9C%20%EC%8A%A4%ED%94%8C%EB%A6%BF%20(%EC%B6%94%EA%B0%80)-1>)

베럴 파일 패턴에서 아래 두 방식의 차이점에 대해 알아보세요.

```ts
// 방식 1
import { formatDateShorter } from @shared/utils/time/format-date-shorter

// 방식 2
import { formatDateShorter } from @shared/utils/time
```

## 모든 유틸을 해당 모듈에서 전부 쓴다면 아래 두 불러오기 방식의 청크 파일 크기는 동일합니다.

```ts
// 방식 1
import { formatDateShorter, formatDateWithTime } from @shared/utils/time


// 방식 2
import { formatDateShorter } from @shared/utils/time/format-date-shorter
import { formatDateWithTime } from @shared/utils/time/format-date-with-time
```
