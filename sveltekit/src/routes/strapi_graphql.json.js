export async function get() {
  try {
    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

    let Query = JSON.stringify({
      "query": `{
        areas {
          AREA
        }
      }
    `})

    const AREAS = await fetch(STRAPI_URL + "graphql", {
      "method": "POST",
      "headers": { "content-type": "application/json" },
      "body": Query
    })
    .then(res => res.json())

    return {
      status: 200,
      body: {
        AREAS
      }
    }
  } catch (error) {
    return {
      status: 400,
      body: {
        error
      }
    }
  }
}