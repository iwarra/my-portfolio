---
title: Styling input type file button
date: 2024-01-14T09:33:36.994Z
category:
  - CSS
language: en
summary: How to style the button that is a part of the input of type file. 
---
This pseudo-element allows us to select and style the button of the input element of the file type. 

```html
<input type="file">
```

```css
input::file-selector-button {
  background-color: white;
  color: black;
  padding: 0.5rem 1rem;
}
```
