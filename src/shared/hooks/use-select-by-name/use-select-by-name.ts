import { BaseSyntheticEvent, useEffect, useMemo } from 'react';
import {
  DeepPartialSkipArrayKey,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';

interface UseSelectByNameReturn<
  TFieldValues extends FieldValues,
  EventType extends BaseSyntheticEvent = BaseSyntheticEvent,
> extends UseFormReturn<TFieldValues, any, undefined> {
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
}

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
  // shouldValidate = true,
}: {
  initialFieldValue: TFieldValues;
  regexForTestingName: RegExp;
  shouldValidate?: boolean;
}): UseSelectByNameReturn<TFieldValues, EventType> => {
  /**
   * obj 인자 프로퍼티명과 프로퍼티값이 변경될 때만 memoizedField를 업데이트한다.
   */
  const memoizedField = useMemo(
    () => initialFieldValue,
    [Object.keys(initialFieldValue)[0], initialFieldValue[Object.keys(initialFieldValue)[0]]],
  );

  const { formState, getFieldState, setValue, setError, reset, clearErrors, register, control, ...rest } =
    useFormContext<TFieldValues>();
  const { isSubmitSuccessful } = formState;

  const fieldObj = useWatch({
    control,
    // defaultValue: memoizedField as DeepPartialSkipArrayKey<TFieldValues>,
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

  // // ~~초기값 설정~~
  // ! 초기값은 useForm에서 설정하기 때문에 아래 코드 주석 처리
  // useEffect(() => {
  //   setValue(Object.keys(memoizedField)[0] as Path<TFieldValues>, memoizedField[Object.keys(memoizedField)[0]], {
  //     shouldValidate,
  //   });
  // }, [memoizedField]);

  // 제출 성공 시 초기화
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return {
    formState,
    control,
    fieldObj,
    reset,
    handleChangeCheckBox,
    setValue,
    setError,
    clearErrors,
    register,
    getFieldState,
    ...rest,
  };
};
