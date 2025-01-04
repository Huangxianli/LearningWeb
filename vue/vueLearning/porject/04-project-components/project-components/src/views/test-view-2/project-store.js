import { Store } from '@/utils/x-table-store/index';
import { Store as SelectStore } from '@/utils/x-select-store/index';

import { Model } from "@/utils/model";

const colInfo = [
  {
    label: "项目编号",
    prop: "projectNumber",
    minWidth: '120',
    isClickCol: true,
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "项目名称",
    prop: "projectName",
    minWidth: '120',
    isClickCol: true,
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "项目金额",
    prop: "projectAmount",
    minWidth: '120'
  },
  {
    label: "项目进度",
    prop: "projectProgress",
    minWidth: '120',
    isClickCol: true,
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "合同",
    prop: "contract",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "收款",
    prop: "receipt",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "开票（收/付）",
    prop: "invoice",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "付款",
    prop: "payment",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "立项",
    prop: "projectApproval",
    minWidth: '120'
  },
  {
    label: "开工单",
    prop: "workOrder",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "项目阶段",
    prop: "projectPhase",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "是否外委",
    prop: "isOutsourced",
    minWidth: '120'
  },
  {
    label: "外委申请",
    prop: "outsourcingApplication",
    minWidth: '120'
  },
  {
    label: "外委采购",
    prop: "outsourcingProcurement",
    minWidth: '120'
  },
  {
    label: "外委详情",
    prop: "outsourcingDetails",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "外委总费用（万元）",
    prop: "outsourcingTotalCost(tenThousandYuan)",
    minWidth: '200'
  },
  {
    label: "项目任务进度",
    prop: "projectTaskProgress",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "项目人员架构",
    prop: "projectPersonnelStructure",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "项目产值",
    prop: "projectOutput",
    minWidth: '120'
  },
  {
    label: "已申报产值",
    prop: "declaredOutput",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "请款申请",
    prop: "fundRequestApplication",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  },
  {
    label: "项目资料柜",
    prop: "projectFileCabinet",
    minWidth: '120',
    isClickCell (row, tableData) {
      row, tableData
      return true;
    }
  }
];
function setAllDatat () {
  const data = [];
  for (let i = 1; i < 1003; i++) {
    const rowData = {};
    colInfo.forEach(col => {
      rowData[col.prop] = `${col.label}-${i}`;
    });
    rowData.id = 1;
    data.push(rowData);
  }
  return data;
}

export class ProjectStore extends Store {
  url = "123";
  // autoLoad = false;
  useStaticData = true;
  staticTableData = setAllDatat();
}

export class ProjectModel extends Model { }

export class ProjectModelStore extends SelectStore { }