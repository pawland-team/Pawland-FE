import * as S from './style';

interface ProductRegisterCategoryMetaProps {
  metaTitle: string;
  metaDescription: React.ReactNode;
}

export const ProductRegisterCategorySubMeta = ({ metaDescription, metaTitle }: ProductRegisterCategoryMetaProps) => {
  return (
    <S.SubMeta>
      {metaTitle}
      <br />
      <S.SubMetaAnnotation>{metaDescription}</S.SubMetaAnnotation>
    </S.SubMeta>
  );
};
