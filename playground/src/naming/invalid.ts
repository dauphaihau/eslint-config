// // Invalid naming examples - these should fail naming rules

// // Invalid: snake_case variable (should be camelCase)
// const my_variable = 42; // Error: should be myVariable

// // Invalid: PascalCase variable (should be camelCase)
// const MyVariable = 42; // Error: should be myVariable

// // Invalid: UPPER_CASE variable that's not const (should be camelCase)
// const MY_VARIABLE = 42; // Error: should be myVariable

// // Invalid: camelCase const that matches UPPER_CASE pattern but is lowercase
// const api_key = 'secret'; // Error: should be API_KEY or apiKey

// // Invalid: snake_case function (should be camelCase)
// function my_function() { // Error: should be myFunction
//   return 'test';
//   // Invalid: PascalCase function (should be camelCase)
// }

// function MyFunction() { // Error: should be myFunction
//   return 'test';
// }

// // Invalid: camelCase class (should be PascalCase)
// class myClass { // Error: should be MyClass
//   property = 'test';
// }

// // Invalid: snake_case class (should be PascalCase)
// class my_class { // Error: should be MyClass
//   property = 'test';
// }

// // Invalid: camelCase interface (should be PascalCase)
// interface myInterface { // Error: should be MyInterface
//   property: string
// }

// // Invalid: camelCase type (should be PascalCase)
// type myType = { // Error: should be MyType
//   value: string
// };

// // Invalid: snake_case property (should be camelCase)
// const obj = {
//   snake_case_property: 'value', // Error: should be snakeCaseProperty
//   PascalCaseProperty: 'value', // Error: should be pascalCaseProperty
// };

// // Invalid: snake_case class property
// class TestClass {
//   public snake_case_prop = 'test'; // Error: should be snakeCaseProp
//   private PascalCaseProp = 'value'; // Error: should be pascalCaseProp
// }
