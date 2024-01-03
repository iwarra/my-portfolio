---
title: Unwrapping refs in Vue - exception
date: 2024-01-02T11:36:00.279Z
category:
  - Vue
language: en
summary: Exception when unwrapping refs in Vue when used on object properties.
---

Refs are automatically unwrapped in the template tag if they are top-level properties in the rendering context.\
This doesn't apply when using ref as object properties. For those, we can either use destructuring or .value property.

```vue
const object = { id: ref(1) } {{ object.id + 1 }} // will not work in the
template tag
```

```vue
const { id } = object {{ id + 1 }} // works after destructuring
```
