/*
// Test file with obvious React violations

// Violation: Missing key in list
export function TestList(): JSX.Element {
  const items = ['a', 'b', 'c'];
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

// Violation: Duplicate props
export function TestButton(): JSX.Element {
  return (
    <button disabled={false} disabled={true}>
      Click
    </button>
  );
}

// Violation: Unknown property
export function TestDiv(): JSX.Element {
  return <div unknownProp="test">Test</div>;
}

// Violation: Unescaped entities
export function TestText(): JSX.Element {
  return <p>It's a test & it works</p>;
}

// Violation: Using children as prop
export function TestChildren(): JSX.Element {
  return <div children="test" />;
}
*/
