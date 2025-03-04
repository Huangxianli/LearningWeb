<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

console.log(route.params.goodsId);

const { goodsId } = defineProps<{ goodsId: string }>();
console.log(goodsId);

</script>

<template></template>

<style scoped></style>