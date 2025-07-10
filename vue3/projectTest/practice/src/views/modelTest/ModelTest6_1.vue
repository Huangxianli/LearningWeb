<script setup lang="tsx">
const [modelValue1, modifiers] = defineModel<string, 'upper' | 'lower'>(
  'modelValue1',
  {
    required: false,
    get(value) {
      return value;
    },
    set(value) {
      if (modifiers.lower) {
        return value.toLocaleLowerCase();
      }
      if (modifiers.upper) {
        return value.toLocaleUpperCase();
      }
      return value;
    },
  }
);

const InputJSX = () => (
  <>
    <input type="text" v-model={modelValue1.value} />
  </>
);
</script>

<template>
  <input v-model="modelValue1" />
  <div>defineModel()： {{ modelValue1 }}</div>
  <InputJSX />
</template>

<style scoped></style>
