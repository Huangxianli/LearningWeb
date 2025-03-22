<template>
  <div class="collapse-container">
    <!-- 文本容器 -->
    <div ref="content" class="content" :class="{ collapsed: isCollapsed }" :style="contentStyle">
      <slot>{{ text }}</slot>
    </div>

    <!-- 右侧展开按钮 -->
    <div v-if="showToggle" class="toggle-btn" @click="toggle">
      {{ isCollapsed ? expandText : collapseText }}
    </div>
  </div>
</template>

<script>
export default {
  // ... 保持原有props和data不变 ...
}
</script>

<style scoped>
.collapse-container {
  position: relative;
  line-height: 1.5;
  padding-right: 60px;
  /* 为按钮预留空间 */
}

.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.toggle-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #409eff;
  cursor: pointer;
  background: white;
  padding-left: 8px;
  z-index: 1;
}

/* 展开状态下按钮位置调整 */
.content:not(.collapsed)+.toggle-btn {
  position: static;
  float: right;
  margin-left: 8px;
}

/* 非WebKit备用方案 */
@supports not (-webkit-line-clamp: 2) {
  .content.collapsed {
    max-height: calc(1.5em * var(--lines));
    position: relative;
  }

  .content.collapsed::after {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, transparent, white 50%);
  }
}
</style>