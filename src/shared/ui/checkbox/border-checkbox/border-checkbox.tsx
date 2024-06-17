import * as S from './border-checkbox-style';
import { CommonCheckBoxProps } from '../common-checkbox/common-checkbox';

const BorderCheckBox = ({
  type = 'checkbox',
  label,
  group,
  value,
  isChecked = false,
  handleChangeCheckBox,
}: CommonCheckBoxProps) => {
  return (
    <S.BorderCheckBoxContainer className={isChecked ? 'checked' : ''}>
      <div className='checkbox' />
      <label htmlFor={label}>{value}</label>
      <input type={type} name={group} id={label} checked={isChecked} onChange={handleChangeCheckBox} />
    </S.BorderCheckBoxContainer>
  );
};

export { BorderCheckBox };
