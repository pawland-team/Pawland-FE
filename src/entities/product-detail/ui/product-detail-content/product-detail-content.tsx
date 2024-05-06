interface ProductDetailContentProps {
  detailContent: string;
}

const ProductDetailContent = ({ detailContent }: ProductDetailContentProps) => {
  return <div dangerouslySetInnerHTML={{ __html: detailContent }} />;
};

export { ProductDetailContent };
