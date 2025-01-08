
import { PROJECT_LIST_TABLE_CONFIG } from '@/views/PLTableConfig'
export const PROJECT_LIST_TABLE_DATA = (function () {
  const tableData = [];
  // const colProps = PROJECT_LIST_TABLE_CONFIG.map(col => col.prop);
  for (let i = 0; i <= 79; i++) {
    const rowData = {};
    PROJECT_LIST_TABLE_CONFIG.forEach(col => {
      if (col.prop !== 'operation') {
        rowData[col.prop] = `${col.label}${i}`
      }
    })
    tableData.push(rowData);
  }
  return tableData
})();