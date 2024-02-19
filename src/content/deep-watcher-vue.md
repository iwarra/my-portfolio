---
title: Deep Watcher in Vue
date: 2024-02-19T12:18:58.355Z
category:
  - Vue
language: en
summary: Ensuring your watcher tracks nested properties in Vue.
---

When watch() is called directly on a reactive object it automatically tracks the mutations of its nested properties.

However, that is not the case when a getter returns a reactive object. The watcher than fires only if the getter returns a different object. We can change this by adding the deep option in the watcher.

```vue
watch(stateToWatch, () => { // Your logic goes here }, { deep: true } )
```

Note: Can affect performance when used on large data structures.
