// Invalid naming examples - these should fail naming rules

// Invalid: snake_case variable (should be camelCase)
const my_variable = 42; // Error: should be myVariable

// // Invalid: PascalCase variable (should be camelCase)
// const MyVariable = 42; // Error: should be myVariable

// // Invalid: UPPER_CASE variable that's not const (should be camelCase)
// const MY_VARIABLE = 42; // Error: should be myVariable

// // Invalid: short identifier (id-length)
// const a = 1; // Error: identifier is too short

// // Invalid: vague placeholder names (id-denylist)
// const arr = [1, 2, 3]; // Error: prefer a domain-specific name like users/items
// const obj = { id: 1 }; // Error: prefer a domain-specific name like user/payload
// const data = fetchData(); // Error: prefer a domain-specific name like responseBody/result

// // Invalid: exported const must be UPPER_CASE
// export const apiKey = 'secret'; // Error: should be API_KEY

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

// // Invalid: snake_case property (should be camelCase)
// const obj = {
//   snake_case_property: 'value', // Error: should be snakeCaseProperty
//   PascalCaseProperty: 'value', // Error: should be pascalCaseProperty
// };

// // Invalid: snake_case class property
// class TestClass {
//   snake_case_prop = 'test'; // Error: should be snakeCaseProp
//   PascalCaseProp = 'value'; // Error: should be pascalCaseProp
// }
