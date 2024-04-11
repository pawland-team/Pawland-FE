import { formatDateShorter } from './format-date-shorter';

describe('formatDateShorter test', () => {
  it('should return formatted date', () => {
    expect(formatDateShorter('2024-03-12T09:52:06.381Z')).toBe('2024.03.12');
  });
});
