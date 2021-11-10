<script>
  import { CurrentPath } from '../../store.js'
  export let DropdownItem = false, href
</script>

{#if DropdownItem}
  <li>
    <a class="dropdown-item {href === $CurrentPath ? "active" : ""}" {href}>
      <slot></slot>
    </a>
  </li>
{:else}
  <li class="nav-item">
    <a class="nav-link {href === $CurrentPath ? "active" : ""}" aria-current="page" {href}>
      <slot></slot>
    </a>
  </li>
{/if}