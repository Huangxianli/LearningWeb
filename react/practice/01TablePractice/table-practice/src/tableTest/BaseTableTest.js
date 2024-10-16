import { Table } from 'antd';

const cols = [
  {
    key: 'name',
    dataIndex: 'name',
    title: '名字',
  },
  {
    key: 'age',
    dataIndex: 'age',
    title: '年龄',
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: '地址',
  }
];

let data = [
];
function setData () {
  const colsKey = cols.map(col => col.key);
  for (let i = 0; i < 10; i++) {
    const rowData = {
      key: i
    };
    colsKey.forEach(key => {
      rowData[key] = key + i;
    });
    data.push(rowData);
  }
};
setData();

function BaseTableTest () {
  return (
    <>
      <Table dataSource={data} columns={cols}></Table>
    </>
  );
};
export default BaseTableTest;