export interface GetDetailPetTourParams {
  page: number;
  size: number;
}

export interface GetDetailPetTourResponse {
  response: {
    header: {
      resultMsg: string;
      resultCode: string;
    };
    body: {
      /**
       * 전체 결과 수
       */
      totalCount: string;
      /**
       * 한 페이지 결과수
       */
      numOfRows: string;
      /**
       * 현재 페이지 번호
       */
      pageNo: string;
      items: {
        item: {
          /**
           * 동반가능동물
           */
          acmpyPsblCpam: string;
          /**
           * 관련 렌탈 품목
           */
          relaRntlPrdlst: string;
          /**
           * 동반시 필요사항
           */
          acmpyNeedMtr: string;
          /**
           * 관련 비치 품목
           */
          relaFrnshPrdlst: string;
          /**
           * 기타 동반정보
           */
          etcAcmpyInfo: string;
          /**
           * 관련 구매 품목
           */
          relaPurcPrdlst: string;
          /**
           * 관련 사고 대비사항
           */
          relaAcdntRiskMtr: string;
          /**
           * 동반유형코드(동반구분)
           */
          acmpyTypeCd: string;
          /**
           * 관련 구비 시설
           */
          relaPosesFclty: string;
          /**
           * 콘텐츠ID
           */
          contentid: string;
          /**
           * 반려견 관광정보
           */
          petTursmInfo: string;
        };
      };
    };
  };
}
