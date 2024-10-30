import { Empty, Table } from 'antd';


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

let data = [];
function getAllMinColkey (cols = [], colskey = []) {
  const minColsKey = colskey ?? [];
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].children?.length) {
      getAllMinColkey(cols[i].children, minColsKey);
    } else {
      minColsKey.push(cols[i].key);
    }
  }
  return minColsKey;
};

function setData () {
  const colsKey = getAllMinColkey(cols);
  // const colsKey = minColsKey.map(col => col.key);
  for (let i = 0; i < 10; i++) {
    const rowData = {
      key: i
    };
    colsKey.forEach(key => {
      rowData[key] = `${key} - ${i}`;
      // rowData[key] = `你 想 现，在 世 纪 东 方 雷 克 萨 经，复 刻 三 个 咖 啡 水 岸 东 方`;
    });
    data.push(rowData);
  }
};

// setData();

function BaseTableTest () {
  console.log(cols);
  return (
    <>
      <Table
        dataSource={data}
        columns={cols}
        bordered
        title={data => (
          <h3>表格的标题</h3>
        )}
        footer={data => (
          <h3>表格的结尾</h3>
        )}
        // 最小什么时候出现滚动条，没有设置的话就不会出现滚动条，即使设置的宽度已经超过了，表格容器的宽度，会压缩列的宽度
        scroll={
          {
            x: true,
            // x: 'max-content',
            y: 39 * 6
          }
        }
        size='small'
        locale={{
          emptyText: (
            <Empty
              image={''}
              description={
                (<>描述</>)
              }
            >
              没有数据
            </Empty >
          )
        }}
      ></Table >
    </>
  );
};
export default BaseTableTest;