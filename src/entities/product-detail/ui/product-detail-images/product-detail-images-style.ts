import styled from 'styled-components';

export const ProductDetailImagesArea = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  width: 100%;
`;

export const DetailThumbnailBox = styled.div`
  position: relative;

  overflow: hidden;

  width: 582px;
  height: 540px;

  border-radius: 10px;

  img {
    object-fit: cover;
  }
`;

export const DetailSubImageBox = styled.div`
  position: relative;

  overflow: hidden;

  width: 582px;
  height: 540px;

  border-radius: 10px;
`;
