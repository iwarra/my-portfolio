---
title: Share data in Blazor app
date: 2024-12-30T15:58:00.000Z
category:
  - .Net
language: en
summary: How to share data in a Blazor app
---
There are different ways to pass data in a Blazor app.\
\
1. Send from parent to child. We do this by using Component Parameters. These are defined as a C# public property/properties and decorated with the `[Parameter]` attribute.

2. Send from parent to all (selected) ancestors. This is done with the use of cascading parameters. The data is shared inside the built-in CascadingValue element in the parent, and all the ancestors rendered within this tag can access it. 

3. Use the AppState pattern where you have a class with the properties you want to store and you register it as a service and then inject it where needed. 

//Add it as a coped service to your project:
