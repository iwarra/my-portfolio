---
title: Remove auto zoom in
date: 2024-02-05T11:22:58.355Z
category:
  - HTML
language: en
summary: How to remove auto zoom in on elements like input.
---

To remove auto zoom in on certain elements when they are in focus add max-scale=1 to your index.html file.
This can be useful to avoid unexpected behavior on smaller screens.

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1">
```
