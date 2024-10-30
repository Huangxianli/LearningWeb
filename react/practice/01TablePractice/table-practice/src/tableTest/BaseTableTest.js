import { Empty, Table, Tooltip, Checkbox } from 'antd';
import { cols } from './baseTableCoslConfig.js';
import { useState } from 'react';


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

setData();

function BaseTableTest () {
  console.log(cols);
  const [selectedRowsKey, setSelectedRowsKey] = useState([1]);
  function getCheckboxProps (row) {
    return {
      disabled: row.key === 1,
    }
  };
  function renderCell (checked, record, index, originNode) {
    return (
      <>
        {
          record.key !== 1 ?
            <Checkbox checked={checked} ></Checkbox> :
            <Tooltip title={'因为什么原因禁止选择'}>
              <Checkbox checked={checked} disabled></Checkbox>
            </Tooltip>
        }
      </>
    );
  };
  function onChange (selectedRowKeys, selectedRows) {
    setSelectedRowsKey([...selectedRowKeys]);
  };
  function onSelectInvert (changeableRowKeys) {
    const newSelectedRowsKey = changeableRowKeys.filter(item => !selectedRowsKey.includes(item));
    setSelectedRowsKey(newSelectedRowsKey);
  };
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
            x: 500,
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
        rowSelection={{
          type: 'checkbox',
          fixed: true,
          // renderCell: renderCell,
          getCheckboxProps: getCheckboxProps,
          // hideSelectAll: true,
          selectedRowKeys: selectedRowsKey,
          onChange: onChange,
          selections: [{
            key: 'invert', text: '反选', onSelect: onSelectInvert
          }],
          defaultSelectedRowKeys: [1]
        }}
      ></Table >
      <section>
        {`已经选择的行的key：${selectedRowsKey.join(',')}`}
      </section>
    </>
  );
};
export default BaseTableTest;