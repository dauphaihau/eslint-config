// // Testing leading underscore rules
// // Variables, functions, and properties can have leading underscores

// // Valid: leading underscore on variables
// const _privateVar = 'private';
// const _tempVar = 'temp';
// const _globalVar = 'global';

// // Valid: leading underscore on functions
// function _privateFunction() {
//   return 'private';
// }

// const _arrowFunction = () => {
//   return 'arrow';
// };

// // Valid: leading underscore on properties
// const obj = {
//   _privateProperty: 'hidden',
//   publicProperty: 'visible',
// };

// // Valid: leading underscore on class properties
// class MyClass {
//   private _privateProp = 'hidden';
//   public _publicProp = 'visible'; // Leading underscore allowed even on public
//   protected _protectedProp = 'protected';

//   private _privateMethod() {
//     return 'private';
//   }

//   public _publicMethod() {
//     return 'public with underscore';
//   }
// }

// // Valid: leading underscore on interface properties
// interface MyInterface {
//   _privateProp: string
//   publicProp: number
// }

// // Valid: leading underscore on type properties
// type MyType = {
//   _privateField: string
//   publicField: number
// };
