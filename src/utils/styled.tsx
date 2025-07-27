import React from 'react';

export function makeForwardRefComponent<T extends React.ComponentType<any>>(
  Component: T,
) {
  const Forwarded = React.forwardRef<any, React.ComponentProps<T>>(
    (props, ref) => {
      return <Component {...(props as any)} ref={ref} />;
    },
  );

  Forwarded.displayName = `ForwardRef(${
    Component.displayName || Component.name || 'Component'
  })`;
  return Forwarded;
}
