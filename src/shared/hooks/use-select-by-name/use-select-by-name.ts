import { BaseSyntheticEvent, useEffect, useMemo } from 'react';
import {
  DeepPartialSkipArrayKey,
  FieldValues,
  Path,
  PathValue,
  UseFormClearErrors,
  useFormContext,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';

/**
 * @description
 * 태그의 `e.target.value`가 아니라 `e.target.name`으로 체크박스를 구분할 때 사용
 * ### 주의사항:
 * - 반드시 상위에 `FormProvider`가 있어야 한다.
 *
 * @example
 * ```tsx
 * const { fieldObj, handleChangeCheckBox } = useSelectByName<
 *   { selectedSpeciesCategory: Species | null },
 *   ChangeEvent<HTMLInputElement>
 * >({
 *   initialFieldValue: {
 *     selectedSpeciesCategory: null,
 *   },
 *   regexForTestingName: SPECIES_REGEX,
 * });
 * ```
 *
 * @default shouldValidate: true
 */
export const useSelectByName = <
  TFieldValues extends FieldValues,
  EventType extends BaseSyntheticEvent = BaseSyntheticEvent,
>({
  initialFieldValue,
  regexForTestingName,
  shouldValidate = true,
}: {
  initialFieldValue: TFieldValues;
  regexForTestingName: RegExp;
  shouldValidate?: boolean;
}): {
  /**
   * 필드 (obj)
   */
  fieldObj: DeepPartialSkipArrayKey<TFieldValues>;
  /**
   * HTML 이벤트 핸들러
   * @example
   * onClick, onChange, ... 등
   */
  handleChangeCheckBox: (e: EventType) => void;
  setValue: UseFormSetValue<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
} => {
  /**
   * obj 인자 프로퍼티명과 프로퍼티값이 변경될 때만 memoizedField를 업데이트한다.
   */
  const memoizedField = useMemo(
    () => initialFieldValue,
    [Object.keys(initialFieldValue)[0], initialFieldValue[Object.keys(initialFieldValue)[0]]],
  );

  const {
    formState: { isSubmitSuccessful },
    setValue,
    setError,
    reset,
    clearErrors,
    control,
  } = useFormContext<TFieldValues>();

  const fieldObj = useWatch({
    control,
    defaultValue: memoizedField as DeepPartialSkipArrayKey<TFieldValues>,
    exact: true,
  });

  /**
   * input onChange 이벤트 핸들러
   */
  const handleChangeCheckBox = (e: EventType) => {
    if (regexForTestingName.test(e.target.name)) {
      setValue(
        Object.keys(memoizedField)[0] as Path<TFieldValues>,
        e.target.name as PathValue<TFieldValues, Path<TFieldValues>>,
      );
    }
  };

  // 초기값 설정
  useEffect(() => {
    setValue(Object.keys(memoizedField)[0] as Path<TFieldValues>, memoizedField[Object.keys(memoizedField)[0]], {
      shouldValidate,
    });
  }, [memoizedField]);

  // 제출 성공 시 초기화
  useEffect(() => {
    if (isSubmitSuccessful) {
      // setValue(
      //   Object.keys(initialFieldValue)[0] as Path<TFieldValues>,
      //   initialFieldValue[Object.keys(initialFieldValue)[0]],
      // );
      reset();
    }
  }, [isSubmitSuccessful]);

  return {
    fieldObj,
    handleChangeCheckBox,
    setValue,
    setError,
    clearErrors,
  };
};
