import { ChangeEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

type BasePreviewImageTypes = {
  id: number;
  url: string;
};

type BaseSubmitFileTypes = {
  id: number;
  file: File;
};

interface UseDragAndSetFilesState {
  imageForPreview: BasePreviewImageTypes;
  imageForSubmit: BaseSubmitFileTypes;
}

interface UseDragAndSetFilesParam {
  /**
   * - `true`: 여러 개의 파일을 선택할 수 있게 함.
   * - `false` / `undefined`: 하나의 파일만 선택할 수 있게 함.
   * @default undefined
   */
  isMultipleFile?: boolean;
  /**
   * - `true`: 여러 번 파일 탐색기를 여닫으면서 선택했던 사진들을 모두 축적할 수 있게 함.
   * - `false` / `undefined`: 덮어쓰기. 이전 파일들을 해제하고 새로운 파일들로 덮어씀
   * @default undefined
   */
  shouldAccumulateFiles?: boolean;
}

interface UseDragAndSetFilesReturn {
  /**
   * - 처리된 파일 리스트
   * - 내부에 preview와 submit용 이미지가 담겨 있음.
   */
  fileList: UseDragAndSetFilesState[];
  /**
   * 드래그 앤 드롭 가능한 요소 위에 드롭 가능한 아이템을 끌고 있는 상태로 마우스가 올라가 있는지 여부
   */
  isDraggingOnTargetElement: boolean;
  /**
   * - label 태그나 input 태그에 드래그 이벤트를 붙이기 위한 ref
   * - 보통 label 태그에 붙임.
   */
  dragRef: MutableRefObject<HTMLLabelElement | null>;
  /**
   * - input의 type이 file일 때 onChange 이벤트 핸들러로 사용
   */
  onChangeFiles: (e: ChangeEvent<HTMLInputElement> | any) => void;
}

/**
 * ### 드래그 앤 드롭 기능을 구현하고 이미지 파일을 프리뷰하는 커스텀 훅
 * - URL.createObjectURL 메서드를 통해 프리뷰 이미지 리스트를 만드는 기능만 있고 제출용 이미지를 리스트에 담지는 않는다.
 * - 제출용 이미지도 리스트에 포함해 달라고 요청하면 추가해 드릴 수 있음.
 */
export const useDragAndSetFiles = ({
  isMultipleFile,
  shouldAccumulateFiles,
}: UseDragAndSetFilesParam): UseDragAndSetFilesReturn => {
  /**
   * 드래그 중일 때와 아닐 때 스타일 구분할 수 있게 state
   */
  const [isDraggingOnTargetElement, setIsDraggingOnTargetElement] = useState(false);
  /**
   * 현재는 preview용 url string type 이미지들만 들어있는 리스트임.
   * TODO: 추후에 필요하다면 File 타입 이미지도 담아야 함.
   */
  // const [files, setFiles] = useState<BasePreviewImageTypes[]>([]);
  const [fileList, setFileList] = useState<UseDragAndSetFilesState[]>([]);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  /**
   * 선택한 파일들 각각의 고유값 id를 임의로 생성
   */
  const fileId = useRef<number>(0);
  /**
   * 드래그 이벤트 참조를 label 태그에 붙이기.
   */
  const dragRef = useRef<HTMLLabelElement | null>(null);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDraggingOnTargetElement(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOnTargetElement(false);
  }, []);

  const onChangeFiles = useCallback(
    // TODO: any Type 고치기
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      /**
       * - input으로 등록한 이미지는 multiple이든 아니든 상관하지 않고 files에 fileList 형태를 가진다.
       * - 즉, multiple이 아니더라도 fileList 형태로 들어온다.
       * - multiple(false) -> e.g. FileList [File]
       * - multiple(true) -> e.g. FileList [File, File, File]
       */
      let rawFiles: File[] = [];
      /**
       * preview 할 url을 담을 배열
       */
      const prevProcessedFileList: UseDragAndSetFilesState[] = fileList;
      /**
       * 최종 반환될 처리된 파일 리스트
       */
      let processedFileList: UseDragAndSetFilesState[];

      if (e.type === 'drop') {
        // console.log('drop down data ⤵️');
        // console.dir(e.dataTransfer?.files);

        rawFiles = Array.from(e.dataTransfer?.files as File[]);
      } else {
        // console.log('input change data ⤵️');
        // console.dir(e.target.files);
        rawFiles = Array.from(e.target.files as File[]);
      }

      // urlFiles = rawFiles.map((file) => URL.createObjectURL(file));
      const newProcessedFileList: UseDragAndSetFilesState[] = rawFiles.map<UseDragAndSetFilesState>((file) => {
        const currentFileId = fileId.current++;

        return {
          imageForPreview: { id: currentFileId, url: URL.createObjectURL(file) },
          imageForSubmit: { id: currentFileId, file },
        };
      });

      if (isMultipleFile === true && shouldAccumulateFiles === true) {
        // 여러 번 파일 탐색기를 여닫으면서 선택했던 사진들을 모두 축적할 수 있게 하려는 경우
        processedFileList = [...prevProcessedFileList, ...newProcessedFileList];
      }

      if (isMultipleFile === true && !shouldAccumulateFiles) {
        // 덮어쓸거면 이전 파일들을 해제하고 새로운 파일들로 덮어씀
        for (const prevProcessedFile of prevProcessedFileList) {
          URL.revokeObjectURL(prevProcessedFile.imageForPreview.url);
        }

        processedFileList = newProcessedFileList;
      } else {
        // multiple이 아닐 때
        // 이전 파일이 있으면 revokeObjectURL로 해제
        if (prevProcessedFileList.length > 0) {
          URL.revokeObjectURL(prevProcessedFileList[0].imageForPreview.url);
        }

        processedFileList = newProcessedFileList;
      }

      setFileList(processedFileList);
    },
    [fileList, isMultipleFile, shouldAccumulateFiles],
  );

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log('dropped');
    onChangeFiles(e);
    setIsDraggingOnTargetElement(false);
  }, []);

  /**
   * 마운트 될 때
   */
  const initDragEvents = useCallback(() => {
    const dragRefCurrent = dragRef.current;

    if (dragRefCurrent !== null) {
      /**
       * dragenter : 드래그한 요소나 텍스트 블록을 적합한 드롭 대상 위에 올라갔을 때 발생(맨 처음 한 번). ...a dragged item enters a valid drop target.
       * dragover: 요소나 텍스트 블록을 적합한 드롭 대상 위로 지나갈 때 발생한다. (매 수백 밀리초마다 발생한다.)
       * dragleave: 드래그하는 요소나 텍스트 블록이 적합한 드롭 대상에서 벗어났을 때 발생한다.
       * drop: 요소나 텍스트 블록을 적합한 드롭 대상에 드롭했을 때 발생한다.
       */
      dragRefCurrent.addEventListener('dragenter', handleDragEnter);
      dragRefCurrent.addEventListener('dragover', handleDragOver);
      dragRefCurrent.addEventListener('dragleave', handleDragOut);
      dragRefCurrent.addEventListener('drop', handleDrop);
    }
  }, []);

  /**
   * 언마운트 될 때
   */
  const resetDragEvents = useCallback(() => {
    const dragRefCurrent = dragRef.current;

    if (dragRefCurrent !== null) {
      dragRefCurrent.removeEventListener('dragenter', handleDragEnter);
      dragRefCurrent.removeEventListener('dragover', handleDragOver);
      dragRefCurrent.removeEventListener('dragleave', handleDragOut);
      dragRefCurrent.removeEventListener('drop', handleDrop);
    }
  }, []);

  useEffect(() => {
    initDragEvents();

    return () => {
      resetDragEvents();

      if (fileList.length) {
        fileList.forEach((file) => {
          URL.revokeObjectURL(file.imageForPreview.url);
        });
      }
    };
  }, []);

  return {
    fileList,
    isDraggingOnTargetElement,
    dragRef,
    onChangeFiles,
  };
};
