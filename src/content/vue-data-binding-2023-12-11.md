---
title: Vue Data Binding
category:
  - Vue
  - JavaScript
language: en
excerpt: "Two-way data binding in Vue with the use of v-model. "
---
To bind data from forms (such as input, select value, etc) use v-model in the template combined with reactivityAPIs on the JavaScript side. 

`<input v-model="inputValue" name="search" placeholder="Search posts">`

 // In JS:

`const inputValue = ref("")`\
`const searchPosts = () => { `\
`    let searchTerm = inputValue.value.toLowerCase()`\
`    return posts.value.filter(post => post.title.toLowerCase().includes(searchTerm) `\
`}`\
\
This is useful for searching and filtering functionality.