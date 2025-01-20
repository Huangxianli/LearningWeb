<template>
  <section class="main-content-box">
    <!-- <section class="main-content-box-inner"> -->
    <slot>
    </slot>
  </section>
  <!-- </section> -->
</template>

<script>
export default {

}
</script>

<style>
.main-content-box {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 12px 20px;
  background-color: #ffffff;
  overflow: auto
}

/* .main-content-box-inner {
  min-width: 1200px;
  margin: 12px 20px;
} */
</style>