<template>
  <div :class="styling"></div>
</template>


<script setup>
  const props = defineProps(['styling']);
</script>


<style lang="scss" scoped>
.incline {
  transform: rotate(-3deg) skew(-3deg);
  transform-origin: top left;
  width: calc(100% + 2px);
  height: var(--spacing);
  margin-bottom: calc(var(--spacing) / 2);
  position: relative;
  z-index: 1;
}

.decline {
  transform: rotate(3deg) skew(3deg);
  transform-origin: top left;
  width: calc(100% + 2px);
  height: var(--spacing);
  position: relative;
  z-index: 1;
}

@media (min-width: 1000px) {
  .incline {
    transform: rotate(-2deg) skew(-2deg);
  }

  .decline {
    transform: rotate(2deg) skew(2deg);
  }
}
</style>