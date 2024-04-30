const formatPrice = (price: number) => {
  if (price === 0) {
    return '무료 나눔';
  }

  return price.toLocaleString();
};

export { formatPrice };
