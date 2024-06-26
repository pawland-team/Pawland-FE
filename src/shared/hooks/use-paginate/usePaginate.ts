import { useCallback, useMemo, useState } from 'react';

export type usePaginateParams = {
  /**
   * DB 아이템 총 개수
   */
  totalCount: number;
  /**
   * 한 페이지에 보여질 아이템 개수
   * @default 8
   */
  itemsPerPage?: number;
  /**
   * 페이지 그룹 당 페이지 개수
   * (= 페이지 네비게이션 바에 보여질 페이지 숫자의 개수)
   * @default 5
   */
  pagesPerGroup?: number;
  /**
   * 마운트 이후 초기 페이지 번호
   * 컴포넌트의 마운트 이후 가질 초기 페이지 번호를 지정해야 한다.
   * @default 1
   */
  initialPageOnMount?: number;
};

type CurrentPageGroup = number[];
type TotalPages = number;
type ChangePage = (pagenumber: number | string) => void;
type JumpToPreviousPageGroup = () => void;
type JumpToNextPageGroup = () => void;
type CanJumpToPreviousPageGroup = boolean;
type CanJumpToNextPageGroup = boolean;

/**
 *
 * @example
 * ```js
 * const ListContents = () => {
 *   const [sort, setSort] = useState('time');
 *   const [result, setResult] = useState({});
 *   const pagesPerGroup = 5;
 *   const itemsPerPage = 8;
 *   const navigate = useNavigate();
 *
 *   const { changePage, currentPage, setCurrentPage, ...usePaginateRest } = usePaginate({
 *     totalCount: result?.count,
 *     itemsPerPage,
 *     pagesPerGroup,
 *   });
 *
 *   const { result: res } = useAsyncOnMount(
 *     () => getQuestionLists({ offset: (currentPage - 1) * itemsPerPage, sortOrder: sort, limit: itemsPerPage }),
 *     [sort, currentPage],
 *   );
 *
 *   const changeQuestionListSortingOrder = (selectedOptionText) => {
 *     setSort(questionListSort[selectedOptionText]);
 *   };
 *
 *   useEffect(() => {
 *     setResult(res);
 *   }, [res]);
 *
 *   useEffect(() => {
 *     setCurrentPage(1);
 *   }, [sort, setCurrentPage]);
 *
 *   return (
 *     <StContentsWrapper>
 *       <StSortControllerWrapper>
 *         <StH1>누구에게 질문할까요?</StH1>
 *         {Boolean(result?.count) && <ArrowDropdown callbackFn={changeQuestionListSortingOrder} />}
 *       </StSortControllerWrapper>
 *       {result?.count ? (
 *         <>
 *           <GridContentsArea result={result} setResult={setResult} changePage={changePage} currentPage={currentPage} />
 *           <PageTurnner changePage={changePage} currentPage={currentPage} {...usePaginateRest} />
 *         </>
 *       ) : (
 *         <>
 *           <NoLists>아직 마음을 열고있는 사람이 없습니다</NoLists>
 *           <StMindOpenButton onClick={() => navigate('/', { replace: true })}>내 마음 열러가기</StMindOpenButton>
 *         </>
 *       )}
 *     </StContentsWrapper>
 *   );
 * };
 *
 * ```
 */
const usePaginate = ({
  totalCount,
  itemsPerPage = 8,
  pagesPerGroup = 5,
  initialPageOnMount = 1,
}: usePaginateParams) => {
  /**
   * 내부에 useEffect까지 위치시킬까?
   */
  const [currentPage, setCurrentPage] = useState(initialPageOnMount); // 마운트 이후 시작 페이지 번호

  const totalPages: TotalPages = useMemo(() => {
    return totalCount ? Math.ceil(totalCount / itemsPerPage) : 0;
  }, [totalCount, itemsPerPage]);

  const currentPageGroup: CurrentPageGroup = useMemo(
    () =>
      Array.from(
        { length: pagesPerGroup },
        (_, i) => i + Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1,
        // (_, i) => i + (Math.ceil(currentPage / pagesPerGroup) - 1) * pagesPerGroup + 1,
      ).filter((page) => page <= totalPages),
    [pagesPerGroup, currentPage, totalPages],
  );

  const changePage: ChangePage = useCallback(
    (pagenumber) => {
      const targetPageNumber = Number(pagenumber);

      if (targetPageNumber > 0 && targetPageNumber <= totalPages) setCurrentPage(targetPageNumber);
    },
    [totalPages],
  );

  const jumpToPreviousPageGroup: JumpToPreviousPageGroup = () => {
    if (Math.ceil(currentPage / pagesPerGroup) === 1) return;

    setCurrentPage((prevPage) => {
      return (Math.ceil(prevPage / pagesPerGroup) - 1) * pagesPerGroup;
    });
  };

  const jumpToNextPageGroup: JumpToNextPageGroup = () => {
    if (Math.ceil(currentPage / pagesPerGroup) * pagesPerGroup + 1 > totalPages) return;

    setCurrentPage((prevPage) => {
      return Math.ceil(prevPage / pagesPerGroup) * pagesPerGroup + 1;
    });
  };

  const canJumpToPreviousPageGroup: CanJumpToPreviousPageGroup = Math.ceil(currentPage / pagesPerGroup) !== 1;

  const canJumpToNextPageGroup: CanJumpToNextPageGroup =
    Math.ceil(currentPage / pagesPerGroup) * pagesPerGroup + 1 <= totalPages;
  // const canJumpToNextPageGroup = totalCount > Math.ceil(currentPage / pagesPerGroup) * pagesPerGroup * itemsPerPage;

  return {
    changePage,
    jumpToPreviousPageGroup,
    jumpToNextPageGroup,
    setCurrentPage,
    currentPage,
    totalPages,
    currentPageGroup,
    canJumpToPreviousPageGroup,
    canJumpToNextPageGroup,
  };
};

export { usePaginate };
