import type { ReactNode } from 'react';

interface BadComponentProps {
  children: ReactNode;
}

// Violation: Missing displayName
// Violation: Component name should be PascalCase (but this one is, so this is fine)
function badComponent({ children }: BadComponentProps): JSX.Element {
  return (
    <div>
      {/* Violation: Using children as prop */}
      <div children={children} />
      {/* Violation: Lowercase component name */}
      <div>
        <customElement>Test</customElement>
      </div>
    </div>
  );
}

export { badComponent };
