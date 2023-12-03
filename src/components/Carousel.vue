<template>
  <div>
    <img src="/arrow-left.svg" 
      alt="arrow pointing left" 
      role="button"
      aria-label="previous" 
      class="arrow-icon"
      @click="$emit('arrowClicked', 'left')"
    >
    <ul :class="selector"
      @pointerdown.prevent="(event) => drag.start(event.clientX, selector)" 
      @pointerup.prevent="emitDirection"
    >
      <slot></slot>
    </ul>
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
  const emit = defineEmits(['arrowClicked', 'dragged']);
  const props = defineProps(['selector'])

  const emitDirection = (event) => {
    emit("dragged", drag.end(event.clientX))
  }
</script>

<style>
.projects-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
  cursor: grab;
}

@media (min-width: 580px) {
  .projects-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 1rem;
  }
} 

@media (min-width: 1000px) {
  .projects-list {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
  }
}

.testimonials-list {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 0;
}

@media (min-width: 850px) {
  .testimonials-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 1rem;
  }
} 
  
</style>
