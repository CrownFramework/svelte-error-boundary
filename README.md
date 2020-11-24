# Svelte Error Boundary

This package provides a simple error boundary component for Svelte that can be
can be used with both DOM and SSR targets. The default error boundary component
provides an optional `onError` callback that can be used to log the error to
e.g. Sentry.

This package also provides a `createBoundary` function that can be used to
monkey-patch an existing Svelte component in order to create custom error
state UIs.

Monkey-patching is obviously less than ideal since this might break without
warning in future versions of Svelte. This library should be considered merely
as a stop-gap solution for those using Svelte in production today.

Relevant Svelte issues: [svelte#1096](https://github.com/sveltejs/svelte/issues/1096)
[svelte##3587](https://github.com/sveltejs/svelte/issues/#3587)
[svelte##3733](https://github.com/sveltejs/svelte/issues/#3733)

**[REPL Demo](https://svelte.dev/repl/9d44bbcf30444cd08cca6b85f07f2e2a?version=3.29.4)**

## Installation

```bash
npm i -D @crownframework/svelte-error-boundary
```

## Use default error boundary

```svelte
<script>
  import { Boundary } from '@crownframework/svelte-error-boundary';
  let a;
</script>

<!-- The code inside the boundary will throw -->
<Boundary onError={console.error}>
  {a.b.c}
</Boundary>
```

## Create custom error boundary

You can use the `createBoundary` function to monkey-patch any ordinary Svelte
component in to an error boundary.

The component needs to meet the following criteria:

1. Have one unnamed slot (this is what will be "enhanced" with an error boundary)
2. Accept an error prop which will contain a writable store with the last error

Feel free to use the [default error boundary component](./src/DefaultBoundary.svelte)
as inspiration.

### CustomBoundary.js

```js
import { createBoundary } from '@crownframework/svelte-error-boundary';
import Component from './CustomBoundaryComponent.svelte';
export default createBoundary(Component);
```

### Usage

```svelte
<script>
   // You might need to add .js extension depending on your bundler config
  import Boundary from './CustomBoundary';
  let a;
</script>

<!-- The code inside the boundary will throw -->
<Boundary onError={console.error}>
  {a.b.c}
</Boundary>
```

## TODO

- [x] Catch client side errors after initial mount
- [ ] Allow client side recovery if error condition goes away

## Credits

The initial version of this package was based on a proof of concept by @halfnelson:
https://svelte.dev/repl/006facb65ece4f808cd733e838783228?version=3.22.2

## License

MIT.
