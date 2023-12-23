---
title: All the ways to pass data in Vue
date: 2023-09-12T14:57:46.747Z
category:
  - Vue
language: en
summary: All the ways to pass data in Vue.js - from parent component to child
  and the other way around.
---
## Props – Sending data from parent to child

For sending a value from parent to child component Vue offers props. They can be of different types (string, number,…) and you can do type validation to avoid potential errors. When the value of the prop changes in the parent component, it will be passed down to its children. Yes, a prop can be passed down to more child components. The children can however not change the prop as we want to avoid mutating the parent’s state. So the binding is one-sided.

## Provide / Inject – Sending data without prop drilling

Sending data from a component that is high in the component tree to a deeply nested child can get tricky. To do this with props we need to pass the prop from component 1 to component 2,  from component 2 to component 3, and till we reach our destination. This can take quite a few steps and is known as prop drilling. To avoid it, and the confusion that it might bring,  we have the provide/inject option. Inside the parent, we will have the provide function that accepts two arguments.

`provide( injection key, provided value)`

To get the data provided by the ancestor we use the inject function.

`const injectedValue = inject( injection key )`

Can be used for sending data directly from the App.vue file and can have multiple values provided with different keys for differentiation. It can be used with refs, keeping in mind that they are not automatically unwrapped (so use the properties like .value when needed).

## Custom events – Sending info from child to parent component

The custom events are great for sending info up the component tree. The child can communicate with the parent by triggering an event that the parent will then listen to.

Inside the child we need to define emit and use it where needed:

``` javascript
const emit = defineEmits([‘close’]);
function handleLogOut() {    
  userStore.resetUsername(); 
  userStore.setLogIn(false);  
  localStorage.removeItem(“user”);  
  emit(“close”);   //close the menu on log out  
}
```

Inside the parent, we call the event:

`<UserMenu @close=”closeDropdown” />  //calls the function closeDropdown that is defined in the parent component`

In the example I took from my project, I’m not passing any info, but emit does accept two parameters – the event name and the data that we want to pass.

## State management – Sharing info in a larger project

When scaling up it can be hard to keep track of all the data being sent and that’s where stores come into the picture. Using state management like Pinia or Vuex can make your life easier. Defining stores that can manage data and the functionality around them makes Vue so much easier to use.