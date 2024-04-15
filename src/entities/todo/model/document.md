## models.ts

shared api dto에서 타입을 그대로 가져와서 새 타입 별칭으로 할당하거나,
가공해서 새로운 타입을 만드는 경우 model 폴더 내부 models.ts에 적어줍니다.

## store.ts

전역 스토어(를 쓸지는 아직 모르겠지만)를 쓴다면, store.ts에 정의하고 models.ts에서 가져온 타입을 사용하게 됩니다.
[참고](https://github.com/moneyflow-dev/moneyflow/blob/main/src/entities/account/model/store.ts)
