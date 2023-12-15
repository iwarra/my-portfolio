---
title: Image alt attribute
date: 2023-12-08T15:46:27.030Z
category:
  - HTML
language: en
summary: How to correctly use alt attribute with decorative images.
---
As the name suggests alt attribute provides alternative information about an image that for whatever reason can't be accessed. 

For decorative images:\
An empty alt attribute on an img tag makes the screen reader skip the element.

`<img src="image.jpg" alt=""> // skipped by the screen reader`

Not having the alt attribute at all makes the screen reader read the file name to the user.