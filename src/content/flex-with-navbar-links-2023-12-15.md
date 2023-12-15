---
title: Flex with navbar links
date: 2022-12-28T15:53:25.790Z
language: en
summary: Positioning links in the navbar with the help of display flex.
---
Flex is very helpful when positioning links in the navbar. The thing I use over and over again when creating simple headers is the flex display for all the elements in the header (and these are usually the logo and the navigation links). 

I want to separate those and give each their place to shine. That’s where `justify-content: space-between `does the trick. You can use justify/align with different space options that allow you to distance the element. The space-between puts the first element at the start and the last one at the end which is what I want with the logo and the links occupying the header.