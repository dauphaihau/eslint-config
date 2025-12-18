// // Testing type-like naming (classes, interfaces, types) - should be PascalCase

// // Valid: PascalCase classes
// class UserService {
//   getUser() {
//     return null;
//   }
// }

// class ApiClient {
//   fetch() {
//     return Promise.resolve({});
//   }
// }

// // Valid: PascalCase interfaces
// interface UserData {
//   id: string
//   name: string
// }

// interface ApiResponse {
//   data: unknown
//   status: number
// }

// // Valid: PascalCase types
// type UserId = string;
// type ApiConfig = {
//   baseUrl: string
//   timeout: number
// };

// type EventHandler = (event: Event) => void;

// // Valid: Generic types with PascalCase
// class Container<T> {
//   value: T;
// }

// interface Repository<TEntity> {
//   find(id: string): TEntity | null
// }

// type Result<T, E> = {
//   success: boolean
//   data?: T
//   error?: E
// };

// // Valid: Union types with PascalCase
// type Status = 'pending' | 'completed' | 'failed';
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
