<script>
  export let error = null
  export let onError = null;
  let DEV = process.env.NODE_ENV !== 'production'
  $: if ($error && onError) onError($error)
</script>
<style>
  .error {
    border: 1px solid red;
  }
  .trace {
    font-family: monospace;
  }
</style>

{#if $error}
  <div class="error">
    <b>{$error.message}</b>
    <pre class="trace">
      {DEV ? $error.stack : ''}
    </pre>
  </div>
{:else}
  <slot />
{/if}
