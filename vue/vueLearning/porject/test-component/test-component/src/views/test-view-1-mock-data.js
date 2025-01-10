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
};

export function queryData () {
  return {
    formItem1: 'formItem1',
    formItem2: 'formItem2',
    formItem3: 'formItem3',
    formItem4: 'formItem4',
  }
}

export function querySelectData () {
  const options = [];
  let option = {};
  for (let i = 1; i < 5; i++) {
    option = {
      label: `label-${i}`,
      value: `value-${i}`,
      key: `key-${i}`,
    }
    options.push(option);
  }
  return options;
}