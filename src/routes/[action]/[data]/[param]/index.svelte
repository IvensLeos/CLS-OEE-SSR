<script context="module">
  export async function load({ page, fetch, session, stuff }) {
		// const url = `/blog/${page.params.slug}.json`
		// const res = await fetch(url)

		// if (res.ok) {
		// 	return {
		// 		props: {
		// 			article: await res.json()
		// 		}
		// 	}
		// }

		// return {
		// 	status: res.status,
		// 	error: new Error(`Could not load ${url}`)
		// }

    const { action, param } = page.params

    console.log({ action, param })
    
    return {
      status: 301
    }
	}
</script>

Dinamic [action]/data/[params]