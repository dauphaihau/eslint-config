/*
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Violation: Missing displayName
export const Button = ({ children, onClick, disabled = false }: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      // Violation: Duplicate props
      disabled={true}
      // Violation: Unknown property
      unknownProp="value"
    >
      {children}
    </button>
  );
};

export { Button };
*/
