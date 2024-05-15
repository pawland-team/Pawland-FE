/**
 * 배열의 중복된 아이템을 삭제함 (중복되면 하나만 남기는게 아니라, 해당 값 자체를 없앰..?)
 */

export const removeDuplicatesFromArray = <T>(arr: T[]) => {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
};
