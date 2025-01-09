const data = [];

function tableAllData () {
  const colProps = ['col1', 'col2'];
  for (let i = 1; i < 304; i++) {
    const row = {};
    colProps.forEach(prop => {
      row[prop] = `${prop}-${i}`;
    });
    row.id = i;
    data.push(row);
  };
};
tableAllData();

export const total = 304;

export function queryTableData (pageSize = 5, currentPage = 1) {
  return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}