export const baseTableColumns = [
  {
    prop: 'name',
    label: '姓名',
    width: '100'
  },
  {
    prop: 'age',
    label: '年龄',
    width: '100'
  },
  {
    prop: 'gender',
    label: '性别',
    width: '100'
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    colType: 'opreationIcon',
    prop: 'operation',
    label: '操作',
    width: 100,
    fixed: 'right',
    iconConfig: {
      iconClass: 'el-icon-edit',
      tipInfo: '编辑'
    }
  }
];