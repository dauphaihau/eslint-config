export class MyClass {
  static publicStaticField;
  static protectedStaticField;
  static privateStaticField;

  publicInstanceField;
  protectedInstanceField;
  privateInstanceField;

  constructor() {
    this.publicStaticField = 'publicStaticField';
    this.protectedStaticField = 'protectedStaticField';
    this.privateStaticField = 'privateStaticField';
  }

  publicInstanceMethod() {
    console.log('publicInstanceMethod');
  }
  protectedInstanceMethod() {
    console.log('protectedInstanceMethod');
  }
  privateInstanceMethod() {
    console.log('privateInstanceMethod');
  }
}

const myClass = new MyClass();
myClass.publicInstanceMethod();
myClass.protectedInstanceMethod();
myClass.privateInstanceMethod();
