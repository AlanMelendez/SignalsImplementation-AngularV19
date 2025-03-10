# SignalsCrudAngularv19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.
# Project Structure
Key files:
- [Add Contact Component](./src/app/components/add-contact/add-contact.component.ts)
- [Add Contact Template](./src/app/components/add-contact/add-contact.component.html)
- [API Service](./src/app/services/api.service.ts)

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

# Resource Signal
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

An a Computed Signal is only updated when the signals it depends on change therefore the computed signal is just READ-ONLY.

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


# Input Signal (@Input & @Output)
## What is an Input Signal in Angular?
This functionallity allows to pass data from a parent component to a child component.

To use an input signal in Angular, we need to create a signal in the parent component and pass it to the child component using the input() you need declare with default value.
The input signal automatically updates in the child component when the parent component changes the signal value.

No need use ngOnChanges to detect changes in the input signal. (It's the better way to avoid the use of ngOnChanges)

**Syntax:** 
```typescript
//Parent Component
inputSignal = input<string>('');

//Child Component
@Input() mySignal: Signal<number>;

//Use the signal in the child component
this.mySignal.value(); // returns 2

```


# Writable Signal
## What is a Writable Signal in Angular?

It's a **writable** signal that dependent on another signal.
When the signal it depends on changes, the writable signal is automatically updated.

This signal is major used in forms to update the value of the form fields.

**Syntax:** 
```typescript
// Reactive signal linked on it's own signal
mySignal = linkedSignal(()=> this.mySignal());

```

**Example 01:** 
```typescript

  apiService = inject(ApiService);
  id = input<string('1');

  name = linkedSignal(() => this.contactResource.value()?.name);
  email = linkedSignal(() => this.contactResource.value()?.email);
  phone = linkedSignal(() => this.contactResource.value()?.phone);

   contactResource = resource({
    request: this.id,
    loader: ({request: id}) => this.apiService.getContact(Number(id))
  });

```

**Example 02:** 
```typescript

    apiService = inject(ApiService);
    id = input<string('1');

   constructor() {
    //Set data to the form fields with type ContactForm and linked to the contactResource signal
    this.formData = linkedSignal(() => ({
      name: this.contactResource.value()?.name || '',
      email: this.contactResource.value()?.email || '',
      phone: this.contactResource.value()?.phone || ''
    }));
  }

  // This signal is a object that contains the form fields with type ContactForm
  protected  formData = signal<ContactForm>({
    name: '',
    email: '',
    phone: ''
  });

  // Get data from the server
   contactResource = resource({
    request: this.id,
    loader: ({request: id}) => this.apiService.getContact(Number(id))
  });

```




