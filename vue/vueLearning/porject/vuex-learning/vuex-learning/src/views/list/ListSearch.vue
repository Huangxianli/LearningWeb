<template>
  <div class="list-sreach">
    <input class="list-sreach-input" type="text" placeholder="请输入查询条件" />
    <div class="list-sreach-buttons">
      <button class="list-sreach-button" @click="handleClick">搜索</button>
      <button class="list-sreach-button" @click="handleClick">重置</button>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    handleClick () { },
  }
}
</script>

<style scoped>
.list-sreach {
  margin: 5px;
  display: flex;
  justify-content: space-between;
}

.list-sreach-input {
  flex-grow: 1;
}

.list-sreach-buttons {
  display: flex;
  flex-wrap: nowrap;
}

.list-sreach-button {
  margin-left: 8px;
}
</style>