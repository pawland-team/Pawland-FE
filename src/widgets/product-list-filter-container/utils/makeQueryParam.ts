const addSearchListQueryParam = (page: number, size: number, group: string, value: string) => {
  const params: { [key: string]: string[] | boolean | string } = {
    region: [],
    species: [],
    category: [],
    isFree: false,
    orderBy: '최신순',
  };

  if (group === 'region' || group === 'species' || group === 'category') {
    console.log(value);
    (params[group] as string[]) = [...value];
  } else {
    params[group] = value;
  }

  // const queryParams = new URLSearchParams(params.toString());
  // queryParams.set('page', page.toString());
  // queryParams.set('size', size.toString());
  console.log(params.region);
  console.log(
    `/product?page=${page}&size=${size}&region=${params.region}&species=${params.species}&category=${params.category}&isFree=${params.isFree}&orderBy=${params.orderBy}`,
  );

  return `/product?page=${page}&size=${size}&region=${params.region}&species=${params.species}&category=${params.category}&isFree=${params.isFree}&orderBy=${params.orderBy}`;
};

export { addSearchListQueryParam };
