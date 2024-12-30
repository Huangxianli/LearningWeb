// 基于XTableStore的业务实现

import { Store } from "@/utils/x-table-store";
import { Model } from "@/utils/model";
import { Store as SelectStore } from "@/utils/x-select-store";
import { Store as RadioStore } from '@/utils/x-raido-stroe/index'
export class UnallocatedTask extends Store {
  url = "123";
  // autoLoad = false;

}

export class TaskModel extends Model {
  url = '12312';

}

export class TaskTypeStore extends SelectStore {
  url = "TaskTypeStore";
  autoLoad = true;
}

export class TsRelatedProjectStore extends RadioStore { }