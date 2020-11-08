# Svelte Error Boundary

This package provides a simple error boundary as well as an "higher order
component" that can be used to create custom error boundaries.

The default error boundary also provides an `onError` callback that can be used
to log the error to e.g. Sentry.

**[Demo](https://svelte.dev/repl/9d44bbcf30444cd08cca6b85f07f2e2a?version=3.29.4)**

## Installation

```bash
npm i -D svelte-error-boundary
```

## Use default error boundary

```svelte
<script>
  import { Boundary } from 'svelte-error-boundary';
  let a;
</script>

<!-- The code inside the boundary will throw -->
<Boundary onError={console.error}>
  {a.b.c}
</Boundary>
```

## Create custom error boundary

You can use the `createBoundary` "higher order component" to transform any ordinary Svelte component in to an error boundary.

The component needs to meet the following criteria:

1. Have one unnamed slot (this is what will be "enhanced" with an error boundary)
2. Accept an error prop, if an error is caught this will be set

See the example below for details.

### CustomBoundaryComponent.svelte
```svelte
<script>
  export let error = null
  export let onError = null;
  let DEV = process.env.NODE_ENV !== 'production'

  $: if (error && onError) onError(error)
</script>
<style>
  .error {
    border: 1px solid red;
  }
  .trace {
    font-family: monospace;
  }
</style>

<slot>
  {#if error}
    <div class="error">
      <b>{error.message}</b>
      <pre class="trace">
        {DEV ? error.stack : ''}
      </pre>
    </div>
  {/if}
</slot>
```

### CustomBoundary.js
```js
import { createBoundary } from 'svelte-error-boundary';
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

- [ ] Catch client side errors after initial mount
- [ ] Allow client side recovery if error condition goes away

## Credits

The initial version of this package was based on a proof of concept by @halfnelson:
https://svelte.dev/repl/006facb65ece4f808cd733e838783228?version=3.22.2

## License

MIT.
