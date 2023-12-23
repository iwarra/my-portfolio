---
title: Getting started with accessibility
date: 2023-12-15T15:50:44.813Z
category:
  - Accessibility
language: en
summary: Tips on how to get started with accessibility.
---
## Never underestimate the good old semantic HTML

Using the right building blocks for your project may sound like a no-brainer. Still, we have all used a div tag instead of a better-suited element because we were in a rush and “it doesn’t matter, it works and it looks the same”. However, HTML tags exist for a reason and usually come with extra benefits when used correctly. What might not be perceived as a problem by us when developing the app can cause confusion or problems for users using assistive technologies, such as screen readers. Use the right elements and you are halfway there.

## Remove all CSS to be able to see the bare structure that the web reader will “see”

When all of the styling is removed (which you can do in the developer tools of your browser of choice) you will be left with the bare structure of your website. That is what certain users use when navigating the web. It can be a great exercise to see if the composition makes sense and if you’re pleased with how the information is presented and accessed.
Some extensions can remove all CSS for you quite quickly which can come in handy.

## Test with different extensions

Many great extensions help with testing and understanding accessibility problems. You can use them to check the contrast, layout, and all kinds of errors that might sneak in. Many articles recommend different ones if you feel like diving in and finding what best suits you. Here are some I found very useful:

Wave: Easy to use (right click and select ‘Wave this page’), offers visual feedback and helpful tips;

Google Lighthouse: Built into Chrome (you can find a Lighthouse tab in the dev tools), easy to use, and offers the possibility to choose what you want to test (like SEO, accessibility,…) and a report at the end.

WCAG Contrast Checker: What I love about this one is that it allows me to see what the page looks like for users with dyschromatopsia (a deficiency in color vision)."