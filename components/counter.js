import React, { useState } from 'react';

export default function Counter({initialValue = 0}) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}