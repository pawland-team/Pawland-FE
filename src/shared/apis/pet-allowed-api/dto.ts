/**
 * 반려 동물 동반 param dto
 */
export interface GetDetailPetTourParams {
  page: number;
  size: number;
}

/**
 * 반려 동물 동반 response dto
 */
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

/**
 * 관광 정보 통합 조회 param dto
 */
export interface GetTourInformationParams {
  page: number;
  size: number;
  /**
   * 콘텐츠ID
   */
  contentId: number;
  /**
   * 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
   */
  contentTypeId: number;
}

/**
 * 관광 정보 통합 조회 response dto
 */
export interface GetTourInformationResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: [
          {
            contentid: string;
            contenttypeid: string;
            title: string;
            createdtime: string;
            modifiedtime: string;
            tel: string;
            telname: string;
            homepage: '\u003Ca href="http://www.jeondeungsa.org/" target="_blank" title="새창: 전등사 홈페이지로 이동"\u003Ehttp://www.jeondeungsa.org\u003C/a\u003E';
            booktour: string;
            firstimage: string;
            firstimage2: string;
            cpyrhtDivCd: string;
            areacode: string;
            sigungucode: string;
            cat1: string;
            cat2: string;
            cat3: string;
            addr1: string;
            addr2: string;
            zipcode: string;
            mapx: string;
            mapy: string;
            mlevel: string;
            overview: string;
          },
        ];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
