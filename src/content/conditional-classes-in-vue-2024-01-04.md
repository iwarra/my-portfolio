---
title: Conditional classes in Vue
date: 2024-01-04T16:32:58.355Z
category:
  - Vue
language: en
summary: Using conditionals and computed class object in Vue.
---
Tags can have classes declared in Vue the same way as in HTML:

```html
<div class="container">
```

To show a class conditionally use:

```vue
<div :class="{ container: isTrue}"> 
<!-- isTrue being a ref that we can toggle between true and false. -->
```

Class and dynamic class (:class) can co-exist on the same element. Binding can also be done to a computed property that returns an object.

```vue
const classObj = computed(() => {
return {
  'container': true,
  visible: ifVisible
  }
})
```