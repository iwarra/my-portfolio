<template>
  <li class="skills-item">
    <component 
      v-if="iconType == 'component'" :is="icon" />
    <img 
      v-else-if="iconType == 'img'" :src="icon" alt="" class="skills-icon">
    <span> {{ name }} </span>
  </li>
</template>

<script setup>
const props = defineProps(['name', 'icon', 'iconType'])

</script>

<style lang="scss" scoped>
.skills-item {
  padding: .8rem 1.2rem;
  font-size: 1.2rem;
  background-color: var(--primary-background);
  color: var(--font-secondary);
  border-radius: var(--borderRadius-small);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .skills-icon {
    height: 25px;
  }
  
  span {
    margin-left: .5rem;
    font-weight: 600;
  }
}
</style>