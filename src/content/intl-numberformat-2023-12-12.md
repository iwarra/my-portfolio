---
title: Intl.NumberFormat
date: 2023-12-12T17:03:15.947Z
category:
  - JavaScript
language: en
excerpt: Using Intl.NumberFormat to easily transform and format numbers.
---
Intl.NumberFormat allows us to easily transform any number into a currency displayed according to a specific country/currency style.

let total = 12345.6752;\
let formatCurrency = new Intl.NumberFormat(undefined, {style: 'currency', currency: 'EUR' });\nconst totalEUR = formatCurrency.format(total)

//gives us ‘€12,345.68′

Let’s look at it step by step. We declared formatCurrency that creates a new Intl.NumberFormat constructor that takes two arguments: a locale (we pass in undefined as we want to use visitors’ default language) and an object of options. In there we define the style property as currency, and once we do that we also have to define which currency we want. As a result, we get the rounded number displayed with the chosen currency.The options object that we passed as the second argument offers more handy options (like units).

P.S. Note two little details – there is no default currency. If style property is currency then you have to define it yourself. And second – you’ll be given back a string so keep that in mind,not to get lost between type changes.