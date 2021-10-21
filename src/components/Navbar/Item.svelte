<script>
  export let href, DropdownItem = false
</script>

{#if DropdownItem}
  <li>
    <a class="dropdown-item" {href}>
      <slot></slot>
    </a>
  </li>
{:else}
  <li class="nav-item">
    <a class="nav-link" aria-current="page" {href}>
      <slot></slot>
    </a>
  </li>
{/if}