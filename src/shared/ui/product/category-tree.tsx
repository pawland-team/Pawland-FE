import styled from 'styled-components';

interface CategoryTreeProps {
  region?: string;
  species?: string;
  productType?: string;
}

const CategoryTree = ({ region, species, productType }: CategoryTreeProps) => {
  if (region && species) {
    return (
      <CategoryTreeBox>
        {region} &gt; {species}
      </CategoryTreeBox>
    );
  }

  if (region && species && productType) {
    return (
      <CategoryTreeBox>
        {region} &gt; {species} &gt; {productType}
      </CategoryTreeBox>
    );
  }

  return <CategoryTreeBox>{region}</CategoryTreeBox>;
};

export { CategoryTree };

export const CategoryTreeBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color.gray_BDBDBD};
`;
