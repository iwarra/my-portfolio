---
title: Netlify _redirects file to resolve the "Page Not Found" on refresh
date: 2024-09-05T12:57:46.747Z
category:
  - Vue
language: en
summary: How to fix "Page Not Found" error that occurs on page refresh. Page deployed with Netlify .
---

For a simple Vue.js page deployed with Netlify the problem of getting "Page Not Found" error when a page is refreshed can be fixed by adding a \_redirects file. In it we configure the server (in this case, Netlify) to serve the index.html file for all routes. This file needs to be in the public folder and should contain the following line:

```js
/\* /index.html 200
```
