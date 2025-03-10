# SignalsCrudAngularv19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

# Features in Angular v19

<!-- - **Standalone Components**: Simplifies component creation without the need for NgModules.
- **Typed Forms**: Enhances form handling with strong typing.
- **Directive Composition API**: Allows combining multiple directives into a single directive.
- **Improved Server-Side Rendering**: Enhances performance and developer experience.
- **Enhanced RxJS Integration**: Better handling of reactive programming patterns.
- **Strictly Typed Reactive Forms**: Ensures type safety in reactive forms.
- **Optional NgModules**: Reduces boilerplate code by making NgModules optional.
- **Improved Angular CLI**: Faster build times and enhanced development experience.
- **Better Error Handling**: More descriptive error messages and stack traces.
- **Updated Dependency Injection**: More flexible and powerful DI system. -->

# Resource
## What is a Resource in Angular?
This functionallity allows asynchronous data fetching in our components implementation.

To use a resource in Angular, we need to create a service that fetches data from a server and returns it to the component. We can then use this service in our component to fetch data and display it in the view.

**Syntax:** 
```typescript
myResource = resource({
  request: params,
  loader: () => Promise<any>,
});

myResource.value(); // returns the value of the resource
myResource.isLoading(); // returns boolean status.
myResource.error(); // returns the error if the resource has an error

```
# Computed Signal
## What is a Computed Signal in Angular?
This functionallity allows to create a signal that depends on other signals. When the signals it depends on change, the computed signal is automatically updated.

To use a computed signal in Angular, we need to create a signal that depends on other signals. We can then use this signal in our component to display the computed value in the view.

**Syntax:** 
```typescript
mySignal1 = signal(2);
mySignal2 = signal(2);


myComputedSignal = computed(() => {
  return mySignal1.value() + mySignal2.value(); // 2 + 2 = 4
});

//Get the value of the computed signal
myComputedSignal.value(); // returns 4

//If the signals value change, the computed signal will be updated automatically.
mySignal1.set(3);
mySignal2.set(3);

myComputedSignal.value(); // returns 6

```


