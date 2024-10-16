export const baseTableColumns = [
  {
    prop: 'baseData',
    label: '基础信息',
    childColConfig: [
      {
        prop: 'name',
        label: '姓名',
        width: '100',
        childColConfig: [
          {
            prop: 'fistName',
            label: '姓氏',
            width: '120',
          },
          {
            prop: 'secondName',
            label: '名字',
            width: '120',
          }
        ]
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
    ]
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