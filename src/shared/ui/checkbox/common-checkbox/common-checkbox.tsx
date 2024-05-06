import { ChangeEvent } from 'react';

import * as S from './common-checkbox-style';

export interface CommonCheckBoxProps {
  label: string;
  group: string;
  value: string;
  isChecked?: boolean;
  handleChangeCheckBox: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 *
 * @param label  id 그리고 htmlFor에도 동시에 들어감
 * @param group checkbox를 하나로 묶어주는 역할을 하는 텍스트를 넣어야함 (name과 arialabel에 들어가면 됨)
 * @param value 보여져야하는 텍스트 (ex: label은 region인데 보여지기는 한글로 나와야하니까.)
 * @param checked default false지만 처음부터 체크되어있어야하는 경우에만 true 사용하면 됨.
 */

const CommonCheckBox = ({ label, group, value, isChecked = false, handleChangeCheckBox }: CommonCheckBoxProps) => {
  return (
    <S.CommonCheckBoxContainer>
      <div className={isChecked ? 'checkbox checked' : 'checkbox'} />
      <label htmlFor={label}>{value}</label>
      <input type='checkbox' name={group} id={label} checked={isChecked} onChange={handleChangeCheckBox} />
    </S.CommonCheckBoxContainer>
  );
};

export { CommonCheckBox };
