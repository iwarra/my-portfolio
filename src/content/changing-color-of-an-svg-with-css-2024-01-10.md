---
title: Changing color of an SVG with CSS
date: 2024-01-10T07:16:07.885Z
category:
  - CSS
language: en
summary: Changing SVG's color with CSS.
---
If SVG's fill value is set as currentColor it will inherit the color of your font family. This makes it easy to change the SVG's color with simple CSS.

```html
<svg width="1.13em" height="1em"><path fill="currentColor"></path></svg>
```

```css
svg {
 color: blue;
}
```