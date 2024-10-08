const store = {
  namespaced: true,
  state: () => ({
    newName: '',
    tableData: [],
  }),
  getters: {},
  mutations: {
    setNewName (state, payload) {
      state.newName = payload.newName;
    },
    addNewName (state) {
      state.tableData.push(
        {
          rowId: state.tableData.length ? state.tableData[state.tableData.length - 1].rowId + 1 : 0,
          name: state.newName
        }
      )
    },
    deleteTableRow (state, payload) {
      state.tableData = state.tableData.filter(row => row.rowId !== payload.rowId)
    },
  },
  actions: {},
};
export default store;