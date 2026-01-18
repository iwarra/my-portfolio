---
title: Share data in Blazor app
date: 2024-12-30T15:58:00.000Z
category:
  - .Net
  - Blazor
language: en
summary: How to share data in a Blazor app
---

There are different ways to pass data in a Blazor app.

1. Send from parent to child. We do this by using Component Parameters. These are defined as a C# public property/properties and decorated with the [Parameter] attribute.

```js
<h2>Hello: @FirstName</h2>
@code {
    [Parameter]
    public string FirstName { get; set; }
}
```

In the parent:

```js
<ChildComponent FirstName="Jane" />
```

2. Send from parent to all (selected) ancestors. This is done with the use of cascading parameters. The data is shared inside the built-in CascadingValue element in the parent, and all the ancestors rendered within this tag can access it.

```js
<CascadingValue Name="FirstName" Value="James">
    <!-- Any descendant component rendered here will be able to access the cascading value. -->
</CascadingValue>
```

In descendant:

```js
<h2>Hello: @FirstName</h2>

@code {
[CascadingParameter(Name="FirstName")]
private string FirstName { get; set; }
}
```

3. Use the AppState pattern where you have a class with the properties you want to store and you register it as a service and then inject it where needed.

```js
public class ExampleState
{
public int ExampleState { get; set; }
}
```

Add it as a scoped service to your project:

```js
builder.Services.AddScoped<ExampleState>();
```

Inject where needed:

```js
@inject ExampleState State
```
