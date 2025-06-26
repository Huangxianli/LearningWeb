import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
export enum Sex {
  MALE = 0,
  FEMALE = 1,
}
export const SEX_LABEL_MAP = {
  [Sex.MALE]: '男',
  [Sex.FEMALE]: '女',
} as const;

type SelectOption<T extends object, K extends keyof T> = {
  label: T[K];
  value: K;
};

export const SEX_OPTIONS: Array<SelectOption<typeof SEX_LABEL_MAP, keyof typeof SEX_LABEL_MAP>> = [
  {
    label: SEX_LABEL_MAP[Sex.MALE],
    value: Sex.MALE,
  },
  {
    label: SEX_LABEL_MAP[Sex.FEMALE],
    value: Sex.FEMALE,
  },
];

export type SexLabelValue = (typeof SEX_LABEL_MAP)[Sex];

export type TableDataRow = {
  id: number;
  name: string;
  age: number;
  sex: Sex;
};

export const FILTER_LABLE_MAP = {
  name: '姓名',
  age: '年龄',
  sex: '性别',
} as const;

export type FilterForm = {
  [K in keyof Pick<TableDataRow, 'name' | 'age' | 'sex'>]+?: Pick<
    TableDataRow,
    'name' | 'age' | 'sex'
  >[K];
};

export type FilterItem = {
  id: string;
  keyName: (typeof FILTER_LABLE_MAP)[keyof FilterForm];
  value: FilterItem['keyName'] extends 'sex' ? SexLabelValue : string;
};

export const useTableFilterPiniaTestStore = defineStore('tableFiilterPiniaTest', () => {
  const tableData: Ref<TableDataRow[]> = ref([
    {
      id: 1,
      name: 'name-1',
      age: 1,
      sex: Sex.MALE,
    },
    {
      id: 2,
      name: 'name-2',
      age: 2,
      sex: Sex.MALE,
    },
    {
      id: 3,
      name: 'name-3',
      age: 3,
      sex: Sex.FEMALE,
    },
    {
      id: 4,
      name: 'name-4',
      age: 4,
      sex: Sex.FEMALE,
    },
  ]);
  const tableFilterData: Ref<TableDataRow[]> = ref([...tableData.value]);
  const isFilter = ref<boolean>(false);
  const filterForm: Ref<FilterForm> = ref({
    name: undefined,
    age: undefined,
    sex: undefined,
  });
  const setFilterForm = (newFilterForm: FilterForm) => {
    filterForm.value = {
      ...newFilterForm,
    };
    setFilterList();
    setFilterTableData();
  };

  const filterList: Ref<FilterItem[]> = ref([]);
  const setFilterList = () => {
    filterList.value = (Object.keys(filterForm.value) as (keyof FilterForm)[])
      .filter((item) => filterForm.value[item] || filterForm.value[item] === 0)
      .map((item, index) => {
        if (item === 'sex') {
          return {
            id: index + '',
            keyName: FILTER_LABLE_MAP[item],
            value: SEX_LABEL_MAP[filterForm.value[item] as keyof typeof SEX_LABEL_MAP],
          };
        } else {
          return {
            id: index + '',
            keyName: FILTER_LABLE_MAP[item],
            value: filterForm.value[item] as string,
          };
        }
      });
  };

  const setFilterTableData = () => {
    tableFilterData.value = tableData.value.filter((item) => {
      return (
        item['name'].includes(filterForm.value.name ?? '') &&
        ((!filterForm.value.age && filterForm.value.age !== 0) ||
          String(item['age']) === String(filterForm.value.age)) &&
        ((!filterForm.value.sex && filterForm.value.sex !== 0) ||
          String(item['sex']) === String(filterForm.value.sex))
      );
    });
  };

  const setIsFilter = (filter: boolean) => {
    isFilter.value = filter;
  };

  return {
    tableFilterData,
    isFilter,
    filterForm,
    filterList,
    setFilterForm,
    setFilterList,
    setFilterTableData,
    setIsFilter,
  };
});
