const cols = [
  {
    key: 'name',
    dataIndex: 'name', // 该值匹配data中的属性
    title: '名字',
    fixed: 'left',
    width: 150,
    children: [
      {
        key: 'nameChildren1',
        dataIndex: 'nameChildren1',
        title: '名字1',
        width: 50, // 注意 width 会受 scroll 影响，不一定会生效
        fixed: 'left',
        ellipsis: true, // 由于 width 受 scroll 影响，所以即使设置了为 true 也不一定生效
      },
      {
        key: 'nameChildren2',
        dataIndex: 'nameChildren2',
        title: '名字2',
        width: 150,
        fixed: 'left',
        ellipsis: true,
        sorter: (a, b) =>
          a.key - b.key,
        sortOrder: 'descend',
        filters: [
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
        ],
        onFilter (value, row) {
          return value === row.key;
        },
        filterMode: 'tree',
        filterSearch: true
      }
    ]
  },
  {
    key: 'age',
    dataIndex: 'age',
    title: '年龄',
    width: 300,
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: '地址',
    width: 100,
    fixed: 'left',
  },
  {
    key: 'address1',
    dataIndex: 'address1',
    title: '地址1',
    ellipsis: true,
  },
  {
    key: 'address2',
    dataIndex: 'address2',
    title: '地址2',
    width: 500,
    fixed: 'right',
    hidden: true, // 限制是否显示
  }
];

export { cols };