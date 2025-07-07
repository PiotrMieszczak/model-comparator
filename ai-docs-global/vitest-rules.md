TITLE: Install Vitest with various package managers
DESCRIPTION: Commands to install Vitest as a development dependency using npm, yarn, pnpm, or bun. Vitest requires Vite >=v5.0.0 and Node >=v18.0.0.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/index.md#_snippet_0

LANGUAGE: bash
CODE:

```
npm install -D vitest
```

LANGUAGE: bash
CODE:

```
yarn add -D vitest
```

LANGUAGE: bash
CODE:

```
pnpm add -D vitest
```

LANGUAGE: bash
CODE:

```
bun add -D vitest
```

---

TITLE: Creating Vitest Mock Functions and Spies
DESCRIPTION: Demonstrates how to create a mock function using `vi.fn()` to track calls and a spy on an existing object method using `vi.spyOn()` in Vitest, showing basic usage and how to access call information.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/mock.md#_snippet_0

LANGUAGE: js
CODE:

```
import { vi } from 'vitest'

const fn = vi.fn()
fn('hello world')
fn.mock.calls[0] === ['hello world']

const market = {
  getApples: () => 100
}

const getApplesSpy = vi.spyOn(market, 'getApples')
market.getApples()
getApplesSpy.mock.calls.length === 1
```

---

TITLE: Basic Vitest Test Suite Example
DESCRIPTION: This snippet demonstrates how to define a test suite and individual tests using Vitest. It includes examples of `expect` assertions for equality and boolean checks, `assert` for basic comparisons, and `toMatchSnapshot` for snapshot testing, showcasing common testing patterns.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/README.md#_snippet_0

LANGUAGE: typescript
CODE:

```
import { assert, describe, expect, it } from 'vitest'

describe('suite name', () => {
  it('foo', () => {
    expect(1 + 1).toEqual(2)
    expect(true).to.be.true
  })

  it('bar', () => {
    assert.equal(Math.sqrt(4), 2)
  })

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })
})
```

---

TITLE: Vitest `vi.fn` Function for Spying and Mocking
DESCRIPTION: Creates a spy on a function, which can also be initiated without an existing function. It records call arguments, return values, and instances each time it's invoked, allowing manipulation of its behavior using various methods. If no function is provided, the mock will return `undefined` when called.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_20

LANGUAGE: APIDOC
CODE:

```
- Type: (fn?: Function) => Mock
```

LANGUAGE: ts
CODE:

```
const getApples = vi.fn(() => 0)

getApples()

expect(getApples).toHaveBeenCalled()
expect(getApples).toHaveReturnedWith(0)

getApples.mockReturnValueOnce(5)

const res = getApples()
expect(res).toBe(5)
expect(getApples).toHaveNthReturnedWith(2, 5)
```

---

TITLE: Configure Vitest in vite.config.js with Vitest Config Types Reference (Vitest 4+)
DESCRIPTION: Example showing the recommended way to configure Vitest within `vite.config.js` for Vitest 4 and later, using `defineConfig` from `vite` and referencing types from `vitest/config`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_1

LANGUAGE: typescript
CODE:

```
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ... Specify options here.
  },
})
```

---

TITLE: Vitest: Assert Function Called With Specific Arguments
DESCRIPTION: This assertion verifies if a spy function was called at least once with a specific set of parameters. It requires a spy function to be passed to `expect`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_40

LANGUAGE: APIDOC
CODE:

```
(...args: any[]) => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).toHaveBeenCalledWith('apples', 10)
  expect(buySpy).toHaveBeenCalledWith('apples', 20)
})
```

---

TITLE: Vitest beforeEach Hook for Test Setup
DESCRIPTION: Demonstrates the `beforeEach` hook in Vitest, which registers a callback to run before each test in the current context. This is ideal for common setup tasks like clearing mocks or initializing test data. It also shows how to provide an optional cleanup function that runs after each test.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_46

LANGUAGE: TypeScript
CODE:

```
import { beforeEach } from 'vitest'

beforeEach(async () => {
  // Clear mocks and add some testing data before each test run
  await stopMocking()
  await addUser({ name: 'John' })
})
```

LANGUAGE: TypeScript
CODE:

```
import { beforeEach } from 'vitest'

beforeEach(async () => {
  // called once before each test run
  await prepareSomething()

  // clean up function, called once after each test run
  return async () => {
    await resetSomething()
  }
})
```

LANGUAGE: APIDOC
CODE:

```
beforeEach:
  Type: (fn: () => Awaitable<void>, timeout?: number) => void
  Description: Register a callback to be called before each of the tests in the current context runs. If the function returns a promise, Vitest waits until the promise resolves before running the test.
  Parameters:
    fn:
      Type: () => Awaitable<void>
      Description: The callback function to execute before each test. Can be asynchronous.
    timeout:
      Type: number (optional)
      Description: The maximum time (in milliseconds) to wait for the callback to complete. Defaults to 5 seconds.
  Returns: void
  Notes: Can also return an asynchronous cleanup function (equivalent to afterEach).
```

---

TITLE: Compare values for deep equality with Vitest toEqual
DESCRIPTION: The `toEqual` matcher asserts if an actual value is equal to the received one or has the same structure if it is an object (compares them recursively). It differs from `toBe` which checks for strict identity. Type: `(received: any) => Awaitable<void>`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_24

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

const stockBill = {
  type: 'apples',
  count: 13,
}

const stockMary = {
  type: 'apples',
  count: 13,
}

test('stocks have the same properties', () => {
  expect(stockBill).toEqual(stockMary)
})
```

LANGUAGE: ts
CODE:

```
test('stocks are not the same', () => {
  expect(stockBill).not.toBe(stockMary)
})
```

LANGUAGE: APIDOC
CODE:

```
For `Error` objects, non-enumerable properties such as `name`, `message`, `cause` and `AggregateError.errors` are also compared. For `Error.cause`, the comparison is done asymmetrically:

// success
expect(new Error('hi', { cause: 'x' })).toEqual(new Error('hi'))

// fail
expect(new Error('hi')).toEqual(new Error('hi', { cause: 'x' }))

To test if something was thrown, use [`toThrowError`](#tothrowerror) assertion.
```

---

TITLE: Mocking Functions with Vitest's vi.fn()
DESCRIPTION: Demonstrates how to create and use mock functions in Vitest, including checking if a function is mocked and accessing mock call arguments and results using the `vi` object.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/features.md#_snippet_4

LANGUAGE: ts
CODE:

```
import { expect, vi } from 'vitest'

const fn = vi.fn()

fn('hello', 1)

expect(vi.isMockFunction(fn)).toBe(true)
expect(fn.mock.calls[0]).toEqual(['hello', 1])

fn.mockImplementation((arg: string) => arg)

fn('world', 2)

expect(fn.mock.results[1].value).toBe('world')
```

---

TITLE: Vitest expect.soft and expect Interaction
DESCRIPTION: Shows how `expect.soft` interacts with a regular `expect` assertion. If a standard `expect` fails, the test terminates immediately, and all previously encountered `expect.soft` errors are reported along with the terminating error.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_4

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

test('expect.soft test', () => {
  expect.soft(1 + 1).toBe(3) // mark the test as fail and continue
  expect(1 + 2).toBe(4) // failed and terminate the test, all previous errors will be output
  expect.soft(1 + 3).toBe(5) // do not run
})
```

---

TITLE: Vitest: Assert Function Has Been Called
DESCRIPTION: This assertion verifies that a spy function has been called at least once. It requires a spy function (e.g., created with `vi.spyOn` or `vi.fn()`) to be passed to `expect`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_38

LANGUAGE: APIDOC
CODE:

```
() => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function', () => {
  const buySpy = vi.spyOn(market, 'buy')

  expect(buySpy).not.toHaveBeenCalled()

  market.buy('apples', 10)

  expect(buySpy).toHaveBeenCalled()
})
```

---

TITLE: Vitest: Mocking System Date and Time for Consistent Testing
DESCRIPTION: This Vitest example demonstrates how to control the system date and time using `vi.useFakeTimers()` and `vi.setSystemTime()`. It ensures that date-dependent logic, like business hour checks, can be tested consistently by setting a specific time for each test case. Mocks are properly cleaned up with `vi.useRealTimers()` in `afterEach`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/mocking.md#_snippet_0

LANGUAGE: js
CODE:

```
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const businessHours = [9, 17]

function purchase() {
  const currentHour = new Date().getHours()
  const [open, close] = businessHours

  if (currentHour > open && currentHour < close) {
    return { message: 'Success' }
  }

  return { message: 'Error' }
}

describe('purchasing flow', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('allows purchases within business hours', () => {
    // set hour within business hours
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)

    // access Date.now() will result in the date set above
    expect(purchase()).toEqual({ message: 'Success' })
  })

  it('disallows purchases outside of business hours', () => {
    // set hour outside business hours
    const date = new Date(2000, 1, 1, 19)
    vi.setSystemTime(date)

    // access Date.now() will result in the date set above
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
```

---

TITLE: Vitest Browser: Basic Element Assertion
DESCRIPTION: Demonstrates a fundamental assertion in Vitest browser tests, checking if an element identified by text content is present in the document.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/index.md#_snippet_18

LANGUAGE: javascript
CODE:

```
const greeting = screen.getByText(/hello world/iu)

  await expect.element(greeting).toBeInTheDocument()
})
```

---

TITLE: Assert that a collection or string includes a value/subset using Vitest's include
DESCRIPTION: Asserts that `haystack` includes `needle`. This versatile assertion can be used to check for the presence of a value in an array, a substring in a string, or a subset of properties in an object.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/assert.md#_snippet_44

LANGUAGE: APIDOC
CODE:

```
(haystack: string, needle: string, message?: string) => void
<T>(haystack: readonly T[] | ReadonlySet<T> | ReadonlyMap<any, T>, needle: T, message?: string) => void
<T extends object>(haystack: WeakSet<T>, needle: T, message?: string) => void
<T>(haystack: T, needle: Partial<T>, message?: string) => void
```

LANGUAGE: ts
CODE:

```
import { assert, test } from 'vitest'

test('assert.include', () => {
  assert.include([1, 2, 3], 2, 'array contains value')
  assert.include('foobar', 'foo', 'string contains substring')
  assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property')
})
```

---

TITLE: Assert Displayed Form Element Value with toHaveDisplayValue
DESCRIPTION: This matcher checks the user-visible displayed value of form elements. It works with <input>, <select>, and <textarea> elements, similar to `toHaveValue`, but focuses on the rendered text content rather than the internal `value` attribute. It supports string and RegExp matching.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/assertion-api.md#_snippet_34

LANGUAGE: APIDOC
CODE:

```
toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): Promise<void>
  value: The expected displayed value(s) as a string, RegExp, or an array of strings/RegExps.
  Returns: Promise<void>
```

LANGUAGE: HTML
CODE:

```
<label for="input-example">First name</label>
<input type="text" id="input-example" value="Luca" />

<label for="textarea-example">Description</label>
<textarea id="textarea-example">An example description here.</textarea>

<label for="single-select-example">Fruit</label>
<select id="single-select-example">
  <option value="">Select a fruit...</option>
  <option value="banana">Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado">Avocado</option>
</select>

<label for="multiple-select-example">Fruits</label>
<select id="multiple-select-example" multiple>
  <option value="">Select a fruit...</option>
  <option value="banana" selected>Banana</option>
  <option value="ananas">Ananas</option>
  <option value="avocado" selected>Avocado</option>
</select>
```

LANGUAGE: TypeScript
CODE:

```
const input = page.getByLabelText('First name')
const textarea = page.getByLabelText('Description')
const selectSingle = page.getByLabelText('Fruit')
const selectMultiple = page.getByLabelText('Fruits')

await expect.element(input).toHaveDisplayValue('Luca')
await expect.element(input).toHaveDisplayValue(/Luc/)
await expect.element(textarea).toHaveDisplayValue('An example description here.')
await expect.element(textarea).toHaveDisplayValue(/example/)
await expect.element(selectSingle).toHaveDisplayValue('Select a fruit...')
await expect.element(selectSingle).toHaveDisplayValue(/Select/)
await expect.element(selectMultiple).toHaveDisplayValue([/Avocado/, 'Banana'])
```

---

TITLE: Example Usage of vi.mock
DESCRIPTION: Demonstrates a basic example of using `vi.mock` to mock a module. This snippet shows how to define a mock implementation for a specific module, which will then be used in your tests.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/packages/mocker/EXPORTS.md#_snippet_3

LANGUAGE: ts
CODE:

```
import { mocked } from './some-module.js'

vi.mock('./some-module.js', () => {
  return { mocked: true }
})

mocked === true
```

---

TITLE: Vitest Basic Browser Configuration Example
DESCRIPTION: This example demonstrates a fundamental `vitest.config.ts` setup to enable browser testing using Playwright, specifically configuring a Chromium instance with a custom setup file. It illustrates how to structure the `test.browser` object.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/config.md#_snippet_0

LANGUAGE: ts
CODE:

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
          setupFile: './chromium-setup.js',
        },
      ],
    },
  },
})
```

---

TITLE: Skipping Vitest Test Suites with describe.skip
DESCRIPTION: Demonstrates how to use `describe.skip` to prevent a specific test suite from running. This is useful for temporarily disabling tests or suites that are under development or known to fail.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_32

LANGUAGE: ts
CODE:

```
import { assert, describe, test } from 'vitest'

describe.skip('skipped suite', () => {
  test('sqrt', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```

---

TITLE: toBeUndefined Vitest Assertion for Undefined Values
DESCRIPTION: The `toBeUndefined` matcher is the inverse of `toBeDefined`, asserting that a value is strictly equal to `undefined`. This is useful for testing scenarios where a function is expected not to return any explicit value.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_12

LANGUAGE: APIDOC
CODE:

```
() => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

function getApplesFromStock(stock: string) {
  if (stock === 'Bill') {
    return 13
  }
}

test('mary doesn\'t have a stock', () => {
  expect(getApplesFromStock('Mary')).toBeUndefined()
})
```

---

TITLE: Execute Only Specific Vitest Tests with test.only
DESCRIPTION: The `test.only` modifier restricts test execution to only those tests marked with it, which is highly useful for debugging specific test cases. Additionally, it can be combined with running Vitest on a specific file to isolate tests further.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_9

LANGUAGE: ts
CODE:

```
import { assert, test } from 'vitest'

test.only('test', () => {
  // Only this test (and others marked with only) are run
  assert.equal(Math.sqrt(4), 2)
})
```

LANGUAGE: shell
CODE:

```
# vitest interesting.test.ts
```

---

TITLE: Write a Vitest test for the sum function
DESCRIPTION: An example Vitest test file (sum.test.js) that imports the sum function and uses expect and test from Vitest to verify its output. By default, test files must contain .test. or .spec. in their name.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/index.md#_snippet_2

LANGUAGE: js
CODE:

```
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

---

TITLE: Run Vitest Tests from Command Line
DESCRIPTION: This command-line snippet shows the simplest way to execute all tests configured within a Vitest project using `npx`, which allows running local package executables.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/README.md#_snippet_1

LANGUAGE: bash
CODE:

```
$ npx vitest
```

---

TITLE: Organizing Vitest Tests with describe
DESCRIPTION: Demonstrates the basic usage of `describe` to group related `test` cases for better organization and clearer reporting in Vitest. It defines a suite for a 'person' object and includes tests for its properties.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_29

LANGUAGE: ts
CODE:

```
import { describe, expect, test } from 'vitest'

const person = {
  isActive: true,
  age: 32,
}

describe('person', () => {
  test('person is defined', () => {
    expect(person).toBeDefined()
  })

  test('is active', () => {
    expect(person.isActive).toBeTruthy()
  })

  test('age limit', () => {
    expect(person.age).toBeLessThanOrEqual(32)
  })
})
```

---

TITLE: Vitest: Matching Values Against Snapshots with toMatchSnapshot
DESCRIPTION: `toMatchSnapshot` verifies that a value matches its most recently recorded snapshot. An optional `hint` argument can be provided to improve snapshot naming and organization, especially when multiple snapshots exist within a single test block. Snapshots can be updated by pressing 'u' or using CLI options.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_33

LANGUAGE: APIDOC
CODE:

```
<T>(shape?: Partial<T> | string, hint?: string) => void
```

LANGUAGE: typescript
CODE:

```
import { expect, test } from 'vitest'

test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchSnapshot()
})
```

LANGUAGE: typescript
CODE:

```
import { expect, test } from 'vitest'

test('matches snapshot', () => {
  const data = { foo: new Set(['bar', 'snapshot']) }
  expect(data).toMatchSnapshot({ foo: expect.any(Set) })
})
```

---

TITLE: Defining Nested Test Suites
DESCRIPTION: Shows how to create nested test suites using multiple `describe` calls. The `fullName` property of a nested suite combines the names of all parent suites separated by '>', providing a full path.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/advanced/api/test-suite.md#_snippet_2

LANGUAGE: ts
CODE:

```
import { describe, test } from 'vitest'

describe('the validation logic', () => {
  describe('validating cities', () => {
    // ...
  })
})
```

---

TITLE: Add Vitest test script to package.json
DESCRIPTION: Configuration for package.json to add a 'test' script that executes Vitest. This allows running tests using 'npm run test', 'yarn test', or 'pnpm test'.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/index.md#_snippet_3

LANGUAGE: json
CODE:

```
{
  "scripts": {
    "test": "vitest"
  }
}
```

---

TITLE: Configure Vitest in vitest.config.js using vitest/config
DESCRIPTION: Example of a dedicated `vitest.config.js` file, importing `defineConfig` directly from `vitest/config` for a standalone Vitest configuration.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_2

LANGUAGE: typescript
CODE:

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ... Specify options here.
  },
})
```

---

TITLE: Vitest toStrictEqual Matcher
DESCRIPTION: The `toStrictEqual` matcher asserts if the actual value is strictly equal to the received one, comparing recursively for objects and ensuring same types. It differs from `toEqual` by checking `undefined` properties, array sparseness, and exact object types (e.g., class instances vs. literal objects).
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_25

LANGUAGE: APIDOC
CODE:

```
Type: (received: any) => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

class Stock {
  constructor(type) {
    this.type = type
  }
}

test('structurally the same, but semantically different', () => {
  expect(new Stock('apples')).toEqual({ type: 'apples' })
  expect(new Stock('apples')).not.toStrictEqual({ type: 'apples' })
})
```

---

TITLE: Vitest `beforeAll` Hook API Reference
DESCRIPTION: Documents the `beforeAll` function signature, which registers a callback to run once before all tests. It accepts an asynchronous function and an optional timeout in milliseconds.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_48

LANGUAGE: APIDOC
CODE:

```
beforeAll(fn: () => Awaitable<void>, timeout?: number)
```

---

TITLE: Vitest: `beforeAll` Hook with Inline Cleanup Function
DESCRIPTION: Illustrates how `beforeAll` can return an asynchronous cleanup function. This returned function acts like `afterAll`, executing once after all tests have completed, ensuring proper resource teardown.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_50

LANGUAGE: ts
CODE:

```
import { beforeAll } from 'vitest'

beforeAll(async () => {
  // called once before all tests run
  await startMocking()

  // clean up function, called once after all tests run
  return async () => {
    await stopMocking()
  }
})
```

---

TITLE: VS Code Launch Configuration for Debugging Current Test File
DESCRIPTION: This JSON configuration for VS Code's `launch.json` allows debugging the currently open test file in Vitest. It uses a Node.js launch type, automatically attaches to child processes, and skips internal Node.js and `node_modules` files. The `program` points to Vitest's mjs entry point, and `args` pass `run` along with the relative file path of the test.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/debugging.md#_snippet_0

LANGUAGE: json
CODE:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

---

TITLE: Mock an Exported Function with vi.mock in Vitest
DESCRIPTION: Demonstrates how to mock an exported function using `vi.mock`. The `vi.mock` call is hoisted, executing before imports. This example shows the original function definition and its mock implementation.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/mocking.md#_snippet_26

LANGUAGE: TypeScript
CODE:

```
export function method() {}
```

LANGUAGE: TypeScript
CODE:

```
import { method } from './example.js'

vi.mock('./example.js', () => ({
  method: vi.fn()
}))
```

---

TITLE: Configure MSW for HTTP Request Mocking in Vitest
DESCRIPTION: This snippet demonstrates how to set up Mock Service Worker (MSW) to intercept and mock HTTP GET requests within Vitest tests. It includes defining request handlers, initializing the MSW server for Node.js environments, and managing its lifecycle with Vitest's `beforeAll`, `afterAll`, and `afterEach` hooks to ensure test isolation and proper cleanup.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/mocking.md#_snippet_11

LANGUAGE: javascript
CODE:

```
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body'
  }
  // ...
]

export const restHandlers = [
  http.get('https://rest-endpoint.example/path/to/posts', () => {
    return HttpResponse.json(posts)
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
```

---

TITLE: Vitest toHaveLength Matcher
DESCRIPTION: The `toHaveLength` matcher asserts if an object possesses a `.length` property and if its value matches a specified numeric value. This is useful for checking the length of strings, arrays, or objects that implement a `length` property.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_28

LANGUAGE: APIDOC
CODE:

```
Type: (received: number) => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

test('toHaveLength', () => {
  expect('abc').toHaveLength(3)
  expect([1, 2, 3]).toHaveLength(3)

  expect('').not.toHaveLength(3) // doesn't have .length of 3
  expect({ length: 3 }).toHaveLength(3)
})
```

---

TITLE: toBeNull Vitest Assertion for Null Values
DESCRIPTION: The `toBeNull` matcher specifically asserts that a value is `null`. It serves as a convenient alias for using `.toBe(null)`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_15

LANGUAGE: APIDOC
CODE:

```
() => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

function apples() {
  return null
}

test('we don\'t have apples', () => {
  expect(apples()).toBeNull()
})
```

---

TITLE: Configure Vitest for Basic Browser Testing
DESCRIPTION: This configuration snippet demonstrates how to enable browser mode in Vitest by setting `browser.enabled` to `true` and specifying a `provider` (e.g., 'playwright') along with at least one browser instance. Vitest uses port 63315 by default for browser testing.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/index.md#_snippet_4

LANGUAGE: ts
CODE:

```
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      // at least one instance is required
      instances: [
        { browser: 'chromium' },
      ],
    },
  }
})
```

---

TITLE: Vitest Mock Function: mockReturnValueOnce Method
DESCRIPTION: This method allows setting a specific return value for a mock function for a single invocation. It ensures type safety by only accepting values matching the original function's return type. When all `mockReturnValueOnce` implementations are exhausted, the mock falls back to a default implementation set by `vi.fn()` or `mockImplementation()`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/mock.md#_snippet_21

LANGUAGE: ts
CODE:

```
function mockReturnValueOnce(value: ReturnType<T>): MockInstance<T>
```

LANGUAGE: js
CODE:

```
const myMockFn = vi
  .fn()
  .mockReturnValue('default')
  .mockReturnValueOnce('first call')
  .mockReturnValueOnce('second call')

// 'first call', 'second call', 'default', 'default'
console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn())
```

---

TITLE: Vitest Immediate vs. Retriable `toHaveTextContent` Assertion
DESCRIPTION: Compares `expect.element` (retriable) with a regular `expect` (immediate) for `toHaveTextContent`. The regular `expect` will fail instantly if the condition is not met, unlike `expect.element` which retries.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/assertion-api.md#_snippet_3

LANGUAGE: ts
CODE:

```
// will fail immediately if .textContent is not `'Error!'`
expect(banner).toHaveTextContent('Error!')
```

---

TITLE: Basic Vitest Expect Assertions
DESCRIPTION: Demonstrates fundamental usage of `expect` in Vitest to assert a value. It shows examples using both the Chai API (`to.equal`) and the Jest API (`toBe`) for checking equality.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_2

LANGUAGE: ts
CODE:

```
import { expect } from 'vitest'

const input = Math.sqrt(4)

expect(input).to.equal(2) // chai API
expect(input).toBe(2) // jest API
```

---

TITLE: Extend Vitest Default Options in vitest.config.js
DESCRIPTION: Demonstrates how to retrieve and extend Vitest's default configuration options, specifically for `exclude` patterns, within a `vitest.config.js` file.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_3

LANGUAGE: typescript
CODE:

```
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})
```

---

TITLE: Update Vitest Coverage Configuration with `include` and `exclude`
DESCRIPTION: Vitest 4.0 removes `coverage.all` and `coverage.extensions`, defaulting to include only covered files. This example shows how to define `coverage.include` to specify source files for coverage reports and `coverage.exclude` for patterns to ignore, ensuring accurate and efficient coverage generation.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/migration.md#_snippet_1

LANGUAGE: ts
CODE:

```
export default defineConfig({
  test: {
    coverage: {
      // Include covered and uncovered files matching this pattern:
      include: ['packages/**/src/**.{js,jsx,ts,tsx}'],

      // Exclusion is applied for the files that match include pattern above
      // No need to define root level *.config.ts files or node_modules, as we didn't add those in include
      exclude: ['**/some-pattern/**'],

      // These options are removed now
      all: true,
      extensions: ['js', 'ts']
    }
  }
})
```

---

TITLE: Customizing Mock Implementation with mockImplementation
DESCRIPTION: Shows how to provide a custom implementation for a mock function using `mockImplementation()`. The example demonstrates how the mock behaves with the new logic and how to access the arguments passed during calls.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/mock.md#_snippet_7

LANGUAGE: ts
CODE:

```
const mockFn = vi.fn().mockImplementation((apples: number) => apples + 1)
// or: vi.fn(apples => apples + 1);

const NelliesBucket = mockFn(0)
const BobsBucket = mockFn(1)

NelliesBucket === 1 // true
BobsBucket === 2 // true

mockFn.mock.calls[0][0] === 0 // true
mockFn.mock.calls[1][0] === 1 // true
```

---

TITLE: Restore Mocks Before Each Test
DESCRIPTION: Specifies if `.mockRestore()` should be called on all spies before each test, clearing mock history, restoring implementations, and original descriptors of spied-on objects.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_110

LANGUAGE: APIDOC
CODE:

```
restoreMocks:
  Type: boolean
  Default: false
```

---

TITLE: Locating Elements with getByRole in Vitest
DESCRIPTION: Demonstrates how to use Vitest's `getByRole` method to locate and interact with elements in the provided HTML DOM structure, including asserting visibility, filling text fields, and clicking buttons based on their ARIA roles and names.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/locators.md#_snippet_2

LANGUAGE: ts
CODE:

```
await expect.element(
  page.getByRole('heading', { name: 'Sign up' })
).toBeVisible()

await page.getByRole('textbox', { name: 'Login' }).fill('admin')
await page.getByRole('textbox', { name: 'Password' }).fill('admin')

await page.getByRole('button', { name: /submit/i }).click()
```

---

TITLE: Configure Vitest Test Projects
DESCRIPTION: This example shows how to define and manage multiple test projects within a single Vitest configuration using the `projects` array. It allows specifying different glob patterns for config files or directories, and even running the same tests with varied environments (e.g., `happy-dom`, `node`) and setup files within the same Vitest process.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/index.md#_snippet_9

LANGUAGE: ts
CODE:

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      // you can use a list of glob patterns to define your projects
      // Vitest expects a list of config files
      // or directories where there is a config file
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      // you can even run the same tests,
      // but with different configs in the same "vitest" process
      {
        test: {
          name: 'happy-dom',
          root: './shared_tests',
          environment: 'happy-dom',
          setupFiles: ['./setup.happy-dom.ts'],
        },
      },
      {
        test: {
          name: 'node',
          root: './shared_tests',
          environment: 'node',
          setupFiles: ['./setup.node.ts'],
        },
      },
    ],
  },
})
```

---

TITLE: Performing Type Tests with Vitest and expect-type
DESCRIPTION: Illustrates how to write type-specific tests using `expectTypeOf` and `assertType` from the `expect-type` package within Vitest, enabling the detection of type regressions.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/features.md#_snippet_10

LANGUAGE: ts
CODE:

```
import { assertType, expectTypeOf, test } from 'vitest'
import { mount } from './mount.js'

test('my types work properly', () => {
  expectTypeOf(mount).toBeFunction()
  expectTypeOf(mount).parameter(0).toMatchTypeOf<{ name: string }>()

  // @ts-expect-error name is a string
  assertType(mount({ name: 42 }))
})
```

---

TITLE: Vitest Browser Test with Retriable `expect.element`
DESCRIPTION: This example demonstrates how to write an asynchronous browser test using `expect.element` for built-in retry-ability. It shows triggering an error and then asserting the presence and content of an error banner, ensuring the test passes even with delayed conditions.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/browser/assertion-api.md#_snippet_1

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'
import { page } from '@vitest/browser/context'

test('error banner is rendered', async () => {
  triggerError()

  // This creates a locator that will try to find the element
  // when any of its methods are called.
  // This call by itself doesn't check the existence of the element.
  const banner = page.getByRole('alert', {
    name: /error/i,
  })

  // Vitest provides `expect.element` with built-in retry-ability
  // It will repeatedly check that the element exists in the DOM and that
  // the content of `element.textContent` is equal to "Error!"
  // until all the conditions are met
  await expect.element(banner).toHaveTextContent('Error!')
})
```

---

TITLE: Vitest: Basic `afterAll` Hook for Teardown
DESCRIPTION: Shows how to use `afterAll` to perform asynchronous teardown operations, such as stopping mocks, once all tests in the current context have finished executing.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_52

LANGUAGE: ts
CODE:

```
import { afterAll } from 'vitest'

afterAll(async () => {
  await stopMocking() // this method is called after all tests run
})
```

---

TITLE: Vitest: Spying and Mocking Functions with vi.spyOn and vi.fn
DESCRIPTION: This example showcases Vitest's capabilities for spying on and mocking functions. It uses `vi.spyOn()` to track function calls and `vi.fn()` to create mock implementations, demonstrating how to assert call counts and modify return values. The `vi.restoreAllMocks()` function is used to clean up mocks after each test.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/mocking.md#_snippet_1

LANGUAGE: js
CODE:

```
import { afterEach, describe, expect, it, vi } from 'vitest'

const messages = {
  items: [
    { message: 'Simple test message', from: 'Testman' },
    // ...
  ],
  getLatest, // can also be a `getter or setter if supported`
}

function getLatest(index = messages.items.length - 1) {
  return messages.items[index]
}

describe('reading messages', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get the latest message with a spy', () => {
    const spy = vi.spyOn(messages, 'getLatest')
    expect(spy.getMockName()).toEqual('getLatest')

    expect(messages.getLatest()).toEqual(
      messages.items[messages.items.length - 1],
    )

    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockImplementationOnce(() => 'access-restricted')
    expect(messages.getLatest()).toEqual('access-restricted')

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should get with a mock', () => {
    const mock = vi.fn().mockImplementation(getLatest)

    expect(mock()).toEqual(messages.items[messages.items.length - 1])
    expect(mock).toHaveBeenCalledTimes(1)

    mock.mockImplementationOnce(() => 'access-restricted')
    expect(mock()).toEqual('access-restricted')

    expect(mock).toHaveBeenCalledTimes(2)

    expect(mock()).toEqual(messages.items[messages.items.length - 1])
    expect(mock).toHaveBeenCalledTimes(3)
  })
})
```

---

TITLE: Advancing Fake Timers to Next Timer with Vitest vi.advanceTimersToNextTimer
DESCRIPTION: The `vi.advanceTimersToNextTimer` method calls the next available timer in the queue. This is useful for making assertions between individual timer calls and can be chained for sequential advancement. The API definition specifies it takes no arguments and returns `Vitest`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_33

LANGUAGE: APIDOC
CODE:

```
() => Vitest
```

LANGUAGE: ts
CODE:

```
let i = 0
setInterval(() => console.log(++i), 50)

vi.advanceTimersToNextTimer() // log: 1
  .advanceTimersToNextTimer() // log: 2
  .advanceTimersToNextTimer() // log: 3
```

---

TITLE: Spying on Object Methods and Properties with vi.spyOn
DESCRIPTION: The `vi.spyOn` utility creates a spy on a method or getter/setter of an object, similar to `vi.fn()`. It returns a mock function that can be used to assert calls, arguments, and return values. It supports various scenarios including class methods and automatic restoration.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_26

LANGUAGE: APIDOC
CODE:

```
vi.spyOn
  Type: <T, K extends keyof T>(object: T, method: K, accessType?: 'get' | 'set') => MockInstance
```

LANGUAGE: TypeScript
CODE:

```
let apples = 0
const cart = {
  getApples: () => 42,
}

const spy = vi.spyOn(cart, 'getApples').mockImplementation(() => apples)
apples = 1

expect(cart.getApples()).toBe(1)

expect(spy).toHaveBeenCalled()
expect(spy).toHaveReturnedWith(1)
```

LANGUAGE: TypeScript
CODE:

```
const cart = {
  Apples: class Apples {
    getApples() {
      return 42
    }
  }
}

const spy = vi.spyOn(cart, 'Apples')
  .mockImplementation(function () {
    this.getApples = () => 0
  })
  .mockImplementation(class MockApples {
    getApples() {
      return 0
    }
  })
```

LANGUAGE: TypeScript
CODE:

```
it('calls console.log', () => {
  using spy = vi.spyOn(console, 'log').mockImplementation(() => {})
  debug('message')
  expect(spy).toHaveBeenCalled()
})
// console.log is restored here
```

LANGUAGE: TypeScript
CODE:

```
const cart = {
  getApples: () => 42,
}

const spy = vi.spyOn(cart, 'getApples').mockReturnValue(10)

console.log(cart.getApples()) // 10
vi.restoreAllMocks()
console.log(cart.getApples()) // 42
spy.mockReturnValue(10)
console.log(cart.getApples()) // still 42!
```

LANGUAGE: TypeScript
CODE:

```
import { calculator } from './src/calculator.ts'

vi.mock('./src/calculator.ts', { spy: true })

calculator(1, 2)

expect(calculator).toHaveBeenCalledWith(1, 2)
expect(calculator).toHaveReturned(3)
```

---

TITLE: Configure Global Variables and Hooks in Vitest Setup File
DESCRIPTION: Demonstrates how to use a `setupFiles` script to initialize global variables and define `afterEach` hooks that run before each test suite. It includes a check to prevent re-initialization and a cleanup function.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_70

LANGUAGE: ts
CODE:

```
import { config } from '@some-testing-lib'

if (!globalThis.defined) {
  config.plugins = [myCoolPlugin]
  computeHeavyThing()
  globalThis.defined = true
}

// hooks are reset before each suite
afterEach(() => {
  cleanup()
})

globalThis.resetBeforeEachTest = true
```

---

TITLE: Run All Initiated Timers
DESCRIPTION: This method executes every initiated timer until the timer queue is empty, including timers created during its own execution. An infinite interval will throw an error after a configurable loop limit.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_41

LANGUAGE: ts
CODE:

```
let i = 0
setTimeout(() => console.log(++i))
const interval = setInterval(() => {
  console.log(++i)
  if (i === 3) {
    clearInterval(interval)
  }
}, 50)

vi.runAllTimers()

// log: 1
// log: 2
// log: 3
```

---

TITLE: Wait for Asynchronous Condition in Vitest
DESCRIPTION: Documents the `vi.waitFor` method in Vitest, a helper function designed to wait for an asynchronous callback to successfully execute. It continuously retries the callback until it no longer throws an error or returns a rejected promise, or until a specified timeout is reached. This is particularly useful for waiting on server startup or other long-running asynchronous operations.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_49

LANGUAGE: APIDOC
CODE:

```
vi.waitFor:
  Type: <T>(callback: WaitForCallback<T>, options?: number | WaitForOptions) => Promise<T>
  Description: Wait for the callback to execute successfully. If the callback throws an error or returns a rejected promise it will continue to wait until it succeeds or times out.
  Parameters:
    callback: The asynchronous function to execute and wait for.
    options:
      - number: Equivalent to setting { timeout: options }.
      - WaitForOptions: An object with 'timeout' (default 1000ms) and 'interval' (default 50ms) properties.
  Returns: Promise<T> - A promise that resolves when the callback succeeds.
  Notes: If vi.useFakeTimers is used, vi.waitFor automatically calls vi.advanceTimersByTime(interval) in every check callback.
```

LANGUAGE: TypeScript
CODE:

```
import { expect, test, vi } from 'vitest'
import { createServer } from './server.js'

test('Server started successfully', async () => {
  const server = createServer()

  await vi.waitFor(
    () => {
      if (!server.isReady) {
        throw new Error('Server not started')
      }

      console.log('Server started')
    },
    {
      timeout: 500, // default is 1000
      interval: 20 // default is 50
    }
  )
  expect(server.isReady).toBe(true)
})
```

LANGUAGE: TypeScript
CODE:

```
// @vitest-environment jsdom

import { expect, test, vi } from 'vitest'
import { getDOMElementAsync, populateDOMAsync } from './dom.js'

test('Element exists in a DOM', async () => {
  // start populating DOM
  populateDOMAsync()

  const element = await vi.waitFor(async () => {
    // try to get the element until it exists
    const element = await getDOMElementAsync() as HTMLElement | null
    expect(element).toBeTruthy()
    expect(element.dataset.initialized).toBeTruthy()
    return element
  }, {
    timeout: 500, // default is 1000
    interval: 20 // default is 50
  })
  expect(element).toBeInstanceOf(HTMLElement)
})
```

---

TITLE: Convert Static Imports to Dynamic with vi.hoisted
DESCRIPTION: Illustrates how to manually convert a static ES module import into a dynamic one to allow code execution before the import, a pattern `vi.hoisted` automates.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_52

LANGUAGE: diff
CODE:

```
callFunctionWithSideEffect()
- import { value } from './some/module.js'
+ const { value } = await import('./some/module.js')
```

---

TITLE: Run All Queued Microtasks
DESCRIPTION: This method invokes every microtask that was queued using `process.nextTick`. It also ensures that any microtasks scheduled during its execution are run.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_40

LANGUAGE: APIDOC
CODE:

```
vi.runAllTicks:
  Type: () => Vitest
  Description: Calls every microtask that was queued by process.nextTick. This will also run all microtasks scheduled by themselves.
```

---

TITLE: Mock Timers with vi.useFakeTimers in Vitest
DESCRIPTION: This example showcases how to use Vitest's `vi.useFakeTimers` to control and advance time in tests, enabling efficient testing of functions that rely on `setTimeout` and `setInterval`. It demonstrates `vi.runAllTimers` and `vi.advanceTimersByTime` for precise time manipulation, ensuring that asynchronous timer-based logic can be tested synchronously and reliably.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/mocking.md#_snippet_14

LANGUAGE: javascript
CODE:

```
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

function executeAfterTwoHours(func) {
  setTimeout(func, 1000 * 60 * 60 * 2) // 2 hours
}

function executeEveryMinute(func) {
  setInterval(func, 1000 * 60) // 1 minute
}

const mock = vi.fn(() => console.log('executed'))

describe('delayed execution', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should execute the function', () => {
    executeAfterTwoHours(mock)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it('should not execute the function', () => {
    executeAfterTwoHours(mock)
    // advancing by 2ms won't trigger the func
    vi.advanceTimersByTime(2)
    expect(mock).not.toHaveBeenCalled()
  })
  it('should execute every minute', () => {
    executeEveryMinute(mock)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(2)
  })
})
```

---

TITLE: Set Environment Variables for Vitest Tests
DESCRIPTION: Defines environment variables available on `process.env` and `import.meta.env` during test execution. These variables are scoped to the tests and are not accessible in the main process, such as within `globalSetup`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_167

LANGUAGE: APIDOC
CODE:

```
env:
  Type: Partial<NodeJS.ProcessEnv>
```

---

TITLE: toBeTruthy Vitest Assertion for Truthy Values
DESCRIPTION: The `toBeTruthy` matcher asserts that a value evaluates to `true` when converted to a boolean. This is useful when the exact value is not important, but its boolean equivalence is. It covers all JavaScript values except `false`, `null`, `undefined`, `NaN`, `0`, `-0`, `0n`, `""`, and `document.all`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_13

LANGUAGE: APIDOC
CODE:

```
() => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'

const stocks = new Stocks()

test('if we know Bill stock, sell apples to him', () => {
  stocks.sync('Bill')
  expect(stocks.getInfo('Bill')).toBeTruthy()
})
```

---

TITLE: Nesting describe Blocks in Vitest
DESCRIPTION: Shows how to create hierarchical test suites by nesting `describe` blocks. This is useful for organizing tests based on different conditions or inputs for a single function, like `numberToCurrency`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_31

LANGUAGE: ts
CODE:

```
import { describe, expect, test } from 'vitest'

function numberToCurrency(value: number | string) {
  if (typeof value !== 'number') {
    throw new TypeError('Value must be a number')
  }

  return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

describe('numberToCurrency', () => {
  describe('given an invalid number', () => {
    test('composed of non-numbers to throw error', () => {
      expect(() => numberToCurrency('abc')).toThrowError()
    })
  })

  describe('given a valid number', () => {
    test('returns the correct currency format', () => {
      expect(numberToCurrency(10000)).toBe('10,000.00')
    })
  })
})
```

---

TITLE: Vitest assert.isDefined Usage Example
DESCRIPTION: Demonstrates how to use the `assert.isDefined` method in a Vitest test to check if a variable is not `undefined`. The example asserts that a string `name` is defined.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/assert.md#_snippet_33

---

TITLE: Vitest Configuration Structure within test Property
DESCRIPTION: Illustrates the general structure for placing Vitest-specific options within the `test` property of the configuration object.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_6

LANGUAGE: typescript
CODE:

```
export default defineConfig({
  test: {
    exclude: [],
  },
})
```

---

TITLE: Mock the Current Date with vi.setSystemTime in Vitest
DESCRIPTION: Explains how to mock the system's current date and time using `vi.setSystemTime`. This allows for consistent date-based testing. Remember that this value does not automatically reset between tests unless `vi.useRealTimers()` is called.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/mocking.md#_snippet_33

LANGUAGE: TypeScript
CODE:

```
const mockDate = new Date(2022, 0, 1)
vi.setSystemTime(mockDate)
const now = new Date()
expect(now.valueOf()).toBe(mockDate.valueOf())
// reset mocked time
vi.useRealTimers()
```

---

TITLE: Clearing Mock Call History with mockClear
DESCRIPTION: Illustrates the use of `mockClear()` to reset the call history of a mock function while preserving its custom implementation. This is useful for isolating assertions between different test scenarios.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/mock.md#_snippet_4

LANGUAGE: ts
CODE:

```
const person = {
  greet: (name: string) => `Hello ${name}`,
}
const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')
expect(person.greet('Alice')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Alice']])

// clear call history but keep mock implementation
spy.mockClear()
expect(spy.mock.calls).toEqual([])
expect(person.greet('Bob')).toBe('mocked')
expect(spy.mock.calls).toEqual([['Bob']])
```

---

TITLE: Vitest test.each with Template String Table and Mixed Data Types
DESCRIPTION: Shows the use of `test.each` with a template string table to define test data, including various data types (numbers, strings, arrays, objects). This example highlights the flexibility of `test.each` in handling diverse inputs and how they are used in a test assertion.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/index.md#_snippet_18

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'

test.each`
  a               | b      | expected
  ${1}            | ${1}   | ${2}
  ${'a'}          | ${'b'} | ${'ab'}
  ${[]}           | ${'b'} | ${'b'}
  ${{}}           | ${'b'} | ${'[object Object]b'}
  ${{ asd: 1 }}   | ${'b'} | ${'[object Object]b'}
`('returns $expected when $a is added $b', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
```

---

TITLE: Vitest: Assert Function Called Specific Number of Times
DESCRIPTION: This assertion checks if a spy function was called a precise number of times. It requires a spy function to be passed to `expect`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_39

LANGUAGE: APIDOC
CODE:

```
(amount: number) => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test, vi } from 'vitest'

const market = {
  buy(subject: string, amount: number) {
    // ...
  },
}

test('spy function called two times', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).toHaveBeenCalledTimes(2)
})
```

---

TITLE: Restoring All Mocks with vi.restoreAllMocks
DESCRIPTION: The `vi.restoreAllMocks` utility calls `.mockRestore()` on all spies. This clears mock history, restores all original mock implementations, and restores original descriptors of spied-on objects, effectively undoing all mocking effects.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_25

LANGUAGE: APIDOC
CODE:

```
vi.restoreAllMocks
  Description: Calls .mockRestore() on all spies. This will clear mock history, restore all original mock implementations, and restore original descriptors of spied-on objects.
```

---

TITLE: toBeFalsy Vitest Assertion for Falsy Values
DESCRIPTION: The `toBeFalsy` matcher asserts that a value evaluates to `false` when converted to a boolean. This is useful when the specific falsy value is not critical, but its boolean equivalence is. It covers `false`, `null`, `undefined`, `NaN`, `0`, `-0`, `0n`, `""`, and `document.all`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_14

LANGUAGE: APIDOC
CODE:

```
() => Awaitable<void>
```

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'

const stocks = new Stocks()

test('if Bill stock hasn\'t failed, sell apples to him', () => {
  stocks.syncStocks('Bill')
  expect(stocks.stockFailed('Bill')).toBeFalsy()
})
```

---

TITLE: Assert value instance with Vitest toBeInstanceOf
DESCRIPTION: The `toBeInstanceOf` matcher asserts if an actual value is an instance of the received class. Type: `(c: any) => Awaitable<void>`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_19

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'
import { Stocks } from './stocks.js'

const stocks = new Stocks()

test('stocks are instance of Stocks', () => {
  expect(stocks).toBeInstanceOf(Stocks)
})
```

---

TITLE: Assert value is less than with Vitest toBeLessThan
DESCRIPTION: The `toBeLessThan` matcher asserts if the actual value is strictly less than the received one. Equal values will fail the test. Type: `(n: number | bigint) => Awaitable<void>`.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_22

LANGUAGE: ts
CODE:

```
import { expect, test } from 'vitest'
import { getApples } from './stocks.js'

test('have less then 20 apples', () => {
  expect(getApples()).toBeLessThan(20)
})
```

---

TITLE: Configure Vitest Fake Timers
DESCRIPTION: Documents the `vi.useFakeTimers` method in Vitest, which enables mocking of global timer functions like `setTimeout`, `setInterval`, and `Date`. It explains its effect on subsequent timer calls until `vi.useRealTimers()` is invoked, and notes limitations regarding `process.nextTick` and `queueMicrotask` unless explicitly configured.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/vi.md#_snippet_46

LANGUAGE: APIDOC
CODE:

```
vi.useFakeTimers:
  Type: (config?: FakeTimerInstallOpts) => Vitest
  Description: To enable mocking timers, you need to call this method. It will wrap all further calls to timers (such as setTimeout, setInterval, clearTimeout, clearInterval, setImmediate, clearImmediate, and Date) until vi.useRealTimers() is called.
  Notes:
    - Mocking nextTick is not supported when running Vitest inside node:child_process by using --pool=forks.
    - The implementation is based internally on @sinonjs/fake-timers.
    - Does not automatically mock process.nextTick and queueMicrotask.
    - To enable mocking for 'nextTick' and 'queueMicrotask', use: vi.useFakeTimers({ toFake: ['nextTick', 'queueMicrotask'] }).
```

---

TITLE: API Reference: Vitest expect.stringContaining Matcher Type
DESCRIPTION: Defines the type signature for the `expect.stringContaining` asymmetric matcher, which checks if a string contains a specified substring.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/api/expect.md#_snippet_79

LANGUAGE: APIDOC
CODE:

```
expect.stringContaining:
  Type: (expected: any) => any
```

---

TITLE: Vitest Configuration: `environment` Option
DESCRIPTION: Defines the test environment for Vitest, such as 'node', 'jsdom', 'happy-dom', or custom environments. This option determines the global APIs available during test execution, simulating different runtime contexts like Node.js or a browser.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/config/index.md#_snippet_36

LANGUAGE: APIDOC
CODE:

```
environment:
  Type: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string
  Default: 'node'
  CLI: --environment=<env>
```

---

TITLE: Vitest Snapshot Testing Example
DESCRIPTION: This TypeScript code provides a practical example of Jest-compatible snapshot testing within Vitest. It shows how to use `expect(result).toMatchSnapshot()` to capture the rendered output or data structure of a component or function. This feature helps in tracking unintended changes to UI or data over time by comparing current snapshots against previously stored ones.
SOURCE: https://github.com/vitest-dev/vitest/blob/main/docs/guide/features.md#_snippet_3

LANGUAGE: ts
CODE:

```
import { expect, it } from 'vitest'

it('renders correctly', () => {
  const result = render()
  expect(result).toMatchSnapshot()
})
```
