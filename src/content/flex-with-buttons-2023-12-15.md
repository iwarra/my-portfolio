---
title: Flex with buttons
date: 2022-12-29T15:54:56.512Z
category:
  - CSS
language: en
summary: Tips on styling button elements when using them with display flex.
---
Using flex with a group of elements that include a button makes the button stretch to fill the height/width of the container. 

Regulate this by using:

```css 
align-self: start;
```

Or end, center – whichever you prefer for the button element. This way it will not stretch and can be styled the perfect size."