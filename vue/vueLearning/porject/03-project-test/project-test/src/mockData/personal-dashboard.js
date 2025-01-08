const personalDashboardData = (function () {
  const tabsKey = ['ongoingTasks', 'completedTasks', 'allTasks'];
  const data = {};
  function mockTableData (key) {
    const tableData = [];
    let row = {};
    for (let i = 0; i < 268; i++) {
      row = {
        taskName: '任务名称' + i,
        belongingProject: '所属项目' + i,
        taskType: '任务类型' + i,
        belongingMilestone: '所属里程碑' + i,
        releaseTime: '发布时间' + i,
      };
      tableData.push(row);
    }
    data[key] = tableData;
  }
  tabsKey.forEach(key => {
    mockTableData(key);
  });
  return data;
})();
export default personalDashboardData;