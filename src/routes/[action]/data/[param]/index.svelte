<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    const { action, param } = page.params
		return {
			props: { action, param }
    }
	}
</script>

<script>
	export let action, param
</script>

<p>Dinamic [action]/data/[param]</p>
<p>Dinamic {action}/data/{param}</p>