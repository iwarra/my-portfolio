---
title: Infinite scrolling with Intersection Observer API
date: 2023-12-24T11:42:48.083Z
category:
  - JavaScript
language: en
summary: "Intersection Observer API allows us to watch how the target element
  interacts with its root, which can be its ancestor or the browser viewport. "
---
Declare an observer with **IntersectionObserver** that takes two parameters: a callback and an options object. 

```javascript
const observer = new IntersectionObserver(() => getPosts({loadMore: true}), {
root: null,
rootMargin: "0%",
threshold: 0, // between 0-1; how much of the target to be visible before loading
})
```

We observe the interaction between two elements: the root and the target. The target is the element we want to watch and we'll observe it in relationship to the root. Root null means the browser viewport, the default value if no element is defined (the el must be the target's ancestor).

Call the observe method on the observer with the target element as a parameter:

```javascript
observer.observe(document.querySelector("footer"))
```

Has different use cases, like infinite scrolling in the example above.