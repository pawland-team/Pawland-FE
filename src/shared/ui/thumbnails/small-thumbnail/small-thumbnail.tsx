import * as S from './small-thumbnail-style';

interface SmallThumbnailProps {
  imageUrl: string;
}

export const SmallThumbnail = ({ imageUrl }: SmallThumbnailProps) => {
  const finalImageUrl =
    imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http'))
      ? imageUrl
      : '/images/mock/small-thumbnail.png';

  return <S.SmallThumbnail width={95} height={95} src={finalImageUrl} alt='썸네일 이미지' />;
};
