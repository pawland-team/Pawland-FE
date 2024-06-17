import { ChangeEvent, forwardRef } from 'react';

import * as S from './common-checkbox-style';

export interface CommonCheckBoxProps {
  /**
   * input의 타입 (default checkbox)
   */
  type?: string;
  /**
   * input 태그의 id 그리고 label 태그의 htmlFor에도 동시에 들어감
   */
  label: string;
  /**
   * checkbox를 하나로 묶어주는 역할을 하는 텍스트를 넣어야함 (name과 arialabel에 들어가면 됨)
   */
  group: string;
  /**
   * 보여져야하는 텍스트 (ex: label은 region인데 보여지기는 한글로 나와야하니까.)
   */
  value: string;
  /**
   * default false지만 처음부터 체크되어있어야하는 경우에만 true 사용하면 됨.
   */
  isChecked?: boolean;
  /**
   * 체크박스가 변경될 때 실행되는 함수
   */
  handleChangeCheckBox: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 *
 * @param label  id 그리고 htmlFor에도 동시에 들어감
 * @param group checkbox를 하나로 묶어주는 역할을 하는 텍스트를 넣어야함 (name과 arialabel에 들어감)
 * @param value 보여져야하는 텍스트 (ex: label은 region인데 보여지기는 한글로 나와야하니까.)
 * @param isChecked default false지만 처음부터 체크되어있어야하는 경우에만 true 사용하면 됨.
 */

const CommonCheckBox = forwardRef<HTMLElement | null, CommonCheckBoxProps>(
  ({ type = 'checkbox', label, group, value, isChecked = false, handleChangeCheckBox }, ref) => {
    return (
      <S.CommonCheckBoxContainer>
        <div className={isChecked ? 'checkbox checked' : 'checkbox'} />
        <label
          htmlFor={label}
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
        >
          {value}
        </label>
        <input type={type} name={group} id={label} checked={isChecked} onChange={handleChangeCheckBox} />
      </S.CommonCheckBoxContainer>
    );
  },
);

CommonCheckBox.displayName = 'CommonCheckBox';

export { CommonCheckBox };
