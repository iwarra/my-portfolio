<template>
  <div class="projects-wrapper">
    <img src="/arrow-left.svg" 
      alt="arrow pointing left" 
      role="button"
      aria-label="previous" 
      class="arrow-icon"
      @click="$emit('clicked', 'left')"
    >
      <slot></slot>
    <img 
      src="/arrow-right.svg" 
      alt="arrow pointing right" 
      role="button"
      aria-label="next"  
      class="arrow-icon"
      @click="$emit('clicked', 'right')"
    >
  </div>
</template>

<script setup>
  const emit = defineEmits(["clicked"])
</script>

<style lang="scss" scoped>

</style>

<!-- this to be added as attribute on index.vue -> Carousel attribute -->
<!-- @clicked="(direction) => projects = slide(projects, direction)" -->