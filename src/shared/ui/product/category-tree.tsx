import styled from 'styled-components';

interface CategoryTreeProps {
  region?: string;
  species?: string;
  category?: string;
}

const CategoryTree = ({ region, species, category }: CategoryTreeProps) => {
  if (region && species && category) {
    return (
      <CategoryTreeBox>
        {region} &gt; {species} &gt; {category}
      </CategoryTreeBox>
    );
  }

  if (region && species) {
    return (
      <CategoryTreeBox>
        {region} &gt; {species}
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
