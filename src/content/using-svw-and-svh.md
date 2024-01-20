---
title: Using svw and svh
date: 2024-01-19T11:48:36.994Z
category:
  - CSS
language: en
summary: Using relative length units for small viewport's width and length to improve the mobile experience.
---
Using svw and svh allows us to adjust sizing when browser's interfaces expand dynamically. By using these we can tell our content to fill the entire viewport.

```css
.dropdown-menu {
		max-width: 85svw;
	}
```

My example adjusts the size of a dropdown menu on mobile.