export class MyClass {
  public static publicStaticField: string;
  protected protectedStaticField: string;
  private privateStaticField: string;

  public publicInstanceField: string;
  protected protectedInstanceField: string;
  private privateInstanceField: string;

  constructor() {
    this.publicStaticField = 'publicStaticField';
    this.protectedStaticField = 'protectedStaticField';
    this.privateStaticField = 'privateStaticField';
  }

  public publicInstanceMethod(): void {
    console.log('publicInstanceMethod');
  }
  protected protectedInstanceMethod(): void {
    console.log('protectedInstanceMethod');
  }
  private privateInstanceMethod(): void {
    console.log('privateInstanceMethod');
  }
}

const myClass = new MyClass();
myClass.publicInstanceMethod();
myClass.protectedInstanceMethod();
myClass.privateInstanceMethod();