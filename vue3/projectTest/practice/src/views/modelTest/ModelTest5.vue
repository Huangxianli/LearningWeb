<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import type { User } from './types';
const usersTemp: User[] = [];
for (let i = 0; i < 100; i++) {
  usersTemp.push({
    id: i + 1 + '',
    userName: 'name' + i,
    userAccount: 'account' + i,
  });
}
const users: Ref<User[]> = ref(usersTemp);

const currentUserInfo = defineModel<User | undefined>({
  required: true,
});
const inputValue: Ref<string> = ref('');
watchEffect(() => {
  inputValue.value = currentUserInfo.value?.userName ?? '';
});
const inputHandler = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  inputValue.value = value;
  users.value = usersTemp.filter((item) => item.userName.includes(value));
  if (users.value.length === 1) {
    // inputValue.value = users.value[0].userName;
    currentUserInfo.value = users.value[0];
    showDropDone.value = false;
    users.value = usersTemp;
  }
};
const clickHandler = (e: Event) => {
  const id = (e.target as HTMLTableRowElement)?.dataset.id;
  if (id) {
    const choiceUser = users.value.find((item) => item.id === id);
    // inputValue.value = choiceUser?.userName ?? '';
    currentUserInfo.value = choiceUser;
    showDropDone.value = false;
    users.value = usersTemp;
  }
};

const showDropDone: Ref<boolean> = ref(false);
const focusHandler = () => {
  showDropDone.value = true;
};
</script>

<template>
  <el-card>
    <input
      type="text"
      :value="inputValue"
      @input="inputHandler"
      @focus="focusHandler"
    />
    <div v-if="showDropDone" class="input_dropdone_box">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>工号</th>
          </tr>
        </thead>
      </table>
      <div v-if="users.length" class="table-body-box">
        <table>
          <tbody @click="clickHandler">
            <tr v-for="user in users" :id="user.id">
              <td :data-id="user.id">{{ user.userName }}</td>
              <td :data-id="user.id">{{ user.userAccount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="no-data">暂无数据</div>
    </div>
  </el-card>
</template>

<style scoped>
.input_dropdone_box {
  width: 204px;
  border: 1px solid #ccc;
  height: 100x;
  padding: 2px;
}
table {
  border-collapse: collapse;
  border: 1px solid #ccc;
  width: 100%;
}
tbody {
  width: 100%;
  max-height: 140px;
  overflow: auto;
}
.table-body-box {
  width: 100%;
  max-height: 140px;
  overflow: auto;
}
tr {
  height: 28px;
  width: 100%;
}
th,
td {
  width: 100px;
  border: 1px solid #ccc;
  cursor: pointer;
}
th {
  background: rgb(245, 247, 250);
}
.no-data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
