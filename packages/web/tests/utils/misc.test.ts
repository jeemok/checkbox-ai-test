import dayjs from 'dayjs';
import { getStatusByDueDate } from '@/utils/misc';

describe('#misc', () => {
  describe('getStatusByDueDate', () => {
    it('should return overdue for past dates', () => {
      expect(getStatusByDueDate(dayjs().subtract(1, 'day').toISOString())).toEqual('Overdue'); // 1 day earlier
      // less than 1 day earlier should be still due soon
      expect(getStatusByDueDate(dayjs().subtract(1, 'second').toISOString())).toEqual('Due soon');
    });

    it('should return "not urgent" for a week later', () => {
      expect(getStatusByDueDate(dayjs().add(5, 'day').toISOString())).toEqual('Due soon'); // 5 days later
      expect(getStatusByDueDate(dayjs().add(6, 'day').toISOString())).toEqual('Due soon'); // 6 days later
      expect(getStatusByDueDate(dayjs().add(7, 'day').toISOString())).toEqual('Not urgent'); // 7 days later
      expect(getStatusByDueDate(dayjs().add(8, 'day').toISOString())).toEqual('Not urgent'); // 8 days later
    });

    it('should return "due soon" for less than a week', () => {
      expect(getStatusByDueDate(dayjs().toISOString())).toEqual('Due soon'); // today
      expect(getStatusByDueDate(dayjs().add(1, 'day').toISOString())).toEqual('Due soon'); // 1 day later
      expect(getStatusByDueDate(dayjs().add(6, 'day').toISOString())).toEqual('Due soon'); // 6 days later
      expect(getStatusByDueDate(dayjs().add(7, 'day').toISOString())).toEqual('Not urgent'); // 7 days later
    });
  });
});
