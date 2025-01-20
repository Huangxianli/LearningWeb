import { Stroe, Model, SelectStore } from '@/components/store';
import { total, queryTableData, queryData, querySelectData } from './test-view-1-mock-data';

export class TestView1Store extends Stroe {
  autoLoad = true;
  needPagination = true;
  url = '';

  mockData = queryTableData;
  total1 = total;
};

export class TestView1Model extends Model {
  autoLoad = false;
  proxy = {
    url: {
      create: '...',
      change: '...',
      read: '...',
    }
  }

  mockData = queryData;

}

export class TestView1SelectStore extends SelectStore {
  url = '...';
  autoLoad = true;
  mockData = querySelectData;
}