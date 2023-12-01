<template>
  <div>
    <img src="/arrow-left.svg" 
      alt="arrow pointing left" 
      role="button"
      aria-label="previous" 
      class="arrow-icon"
      @click="$emit('arrowClicked', 'left')"
    >
      <slot></slot>
    <img 
      src="/arrow-right.svg" 
      alt="arrow pointing right" 
      role="button"
      aria-label="next"  
      class="arrow-icon"
      @click="$emit('arrowClicked', 'right')"
    >
  </div>
</template>

<script setup>
  const emit = defineEmits(['arrowClicked']);
</script>
