<script>
  import { CurrentPath } from '../../store'
  export let Title, Path
</script>

<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle {$CurrentPath.includes(Path) ? "active" : ""}" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{Title}</a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <slot></slot>
  </ul>
</li>