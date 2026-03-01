// Violation: Missing displayName (for anonymous/arrow functions)
export const App = (): JSX.Element => {
  return (
    <div>
      <h1>React App</h1>
      {/* Violation: Unescaped entity */}
      <p>It's working & configured</p>
    </div>
  );
};