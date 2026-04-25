/*
import type { ReactNode } from 'react';

interface ListProps {
  items: Array<{ id: string; content: ReactNode }>;
}

// Violation: Missing displayName
function List({ items }: ListProps): JSX.Element {
  return (
    <ul>
      // Violation: Missing key
      {items.map((item) => (
        <li>
          {item.content}
        </li>
      ))}
      // Violation: Using array index as key
      {items.map((item, index) => (
        <li key={index}>
          {item.content}
        </li>
      ))}
    </ul>
  );
}

export { List };
*/
