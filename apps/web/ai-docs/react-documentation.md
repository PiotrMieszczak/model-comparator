# React Documentation

This document contains React documentation fetched from the official React documentation website using Context7.

## Core Concepts

### State Management with useState

React's `useState` Hook allows functional components to manage state. It returns an array with the current state value and a setter function.

**Basic Syntax:**
```javascript
const [state, setState] = useState(initialState)
```

**Example - Counter Component:**
```javascript
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

**Multiple State Variables:**
```javascript
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

### Effects and Lifecycle

#### useEffect Hook

The `useEffect` Hook lets you perform side effects in functional components. It accepts a function and an optional dependency array.

**Basic Patterns:**
```javascript
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

**Example - Chat Room Connection:**
```javascript
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

### State Updates and Immutability

React requires state updates to be immutable. Always create new objects/arrays instead of mutating existing ones.

**Updating Objects:**
```javascript
// ❌ Wrong: Direct mutation
position.x = 5;

// ✅ Correct: Create new object
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

**Updating Arrays:**
```javascript
// ✅ Correct: Create new array with updated item
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
}));
```

### Component Patterns

#### Basic Function Component
```javascript
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

#### Component with Props
```javascript
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

#### Rendering Lists with Keys
```javascript
<li key={user.id}>
  {user.name}: {user.taskCount} tasks left
</li>
```

### Advanced Patterns

#### useReducer for Complex State
```javascript
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ✅ Correct: creating a new object
      return {
        ...state,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      // ✅ Correct: creating a new object
      return {
        ...state,
        name: action.nextName
      };
    }
    // ...
  }
}
```

#### Context for Global State
```javascript
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

### React 19 Features

#### New `use` Hook
React 19 introduces the `use` API for reading resources like Promises and Context:

```javascript
import {use} from 'react';

function Comments({commentsPromise}) {
  // `use` will suspend until the promise resolves.
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}

function Page({commentsPromise}) {
  // When `use` suspends in Comments,
  // this Suspense boundary will be shown.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

#### Ref as Prop
Function components can now receive `ref` directly as a prop:

```javascript
function MyInput({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />
}

//...
<MyInput ref={ref} />
```

### Controlled Components

Controlled components have their state managed by React:

```javascript
// ✅ Good: controlled input with onChange
<input value={something} onChange={e => setSomething(e.target.value)} />
```

**Example - Form with Multiple Inputs:**
```javascript
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('20');
  const ageAsNumber = Number(age);
  
  return (
    <>
      <label>
        First name:
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
        />
        <button onClick={() => setAge(ageAsNumber + 10)}>
          Add 10 years
        </button>
      </label>
      {firstName !== '' &&
        <p>Your name is {firstName}.</p>
      }
      {ageAsNumber > 0 &&
        <p>Your age is {ageAsNumber}.</p>
      }
    </>
  );
}
```

### Best Practices

1. **Component Purity**: Components should be pure functions that don't mutate props or state directly
2. **Hook Rules**: Only call Hooks at the top level of functional components or custom Hooks
3. **Dependency Arrays**: Include all reactive values in useEffect dependency arrays
4. **State Structure**: Choose state structure to avoid contradictory states
5. **Immutable Updates**: Always create new objects/arrays when updating state
6. **Key Props**: Use unique, stable keys when rendering lists

### Common Patterns

#### Lifting State Up
Move state to a common parent when multiple components need to share it:

```javascript
// ✅ Good: the component is fully controlled by its parent
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }
  // ...
}
```

#### Resetting State with Key
Use the `key` prop to reset component state:

```javascript
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}
```

#### Avoiding Effects
Many operations don't need Effects - calculate during render when possible:

```javascript
export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const visibleTodos = getVisibleTodos(todos, showActive); // ✅ Calculated during render
  // ...
}
```

This documentation provides a comprehensive overview of React's core concepts, patterns, and best practices based on the official React documentation.