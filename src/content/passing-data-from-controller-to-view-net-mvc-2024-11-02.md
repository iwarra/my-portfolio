---
title: Passing data from controller to view / .NET MVC
date: 2024-10-07T12:00:00.000Z
category:
  - C#
  - .Net
language: en
summary: How to pass data from the controller to view in ASP.NET MVC project
---

ViewData and ViewBag are used to transfer data from controller to view. \
ViewData is a dictionary of objects. It is a controller property that exposes an instance of the ViewDataDictionary class.

```js
ViewData["Message"] = "Hello from ViewData!";
```

ViewBag is very similar to ViewData. ViewBag is a wrapper that provides dynamic properties for the underlying ViewData collection.

```js
ViewBag.Message = "Hello from ViewBag!";
```

The best way is to pass a Model or ViewModel, a custom class specifically designed to structure data for a view.
