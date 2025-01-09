import { Stroe } from '@/components/store';
import { total, queryTableData } from './test-view-1-mock-data';

export class TestView1Store extends Stroe {
  autoLoad = true;
  needPagination = true;
  url = '';

  mockData = queryTableData;
  total1 = total;
};