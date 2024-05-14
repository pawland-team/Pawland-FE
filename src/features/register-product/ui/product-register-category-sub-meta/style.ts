import styled from 'styled-components';

export const SubMeta = styled.div`
  font-size: 2rem;
  font-weight: 400;
  line-height: normal;
  color: #686868;
`;

export const SubMetaAnnotation = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: normal;
  color: ${({ theme: { color } }) => color.gray_9E9E9E};
`;
