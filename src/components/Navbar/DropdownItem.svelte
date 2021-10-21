<script>
  export let Title
</script>

<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{Title}</a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <slot></slot>
  </ul>
</li>