---
title: Create unique values with Web Crypto API
date: 2023-03-09T11:57:46.747Z
category:
  - JavaScript
language: en
summary: Use crypto to create unique random values
---

When needing to generate a unique random value, for an id for example, we can use the crypto interface.

Can be declared in the browser in the following way:

```javascript
const uniqueID = crypto.randomUUID();
```

It returns a randomly generated, 36 character long v4 UUID.
