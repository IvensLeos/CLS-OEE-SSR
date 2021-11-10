export async function get() {
  try {
    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

    const AREAS = await fetch(STRAPI_URL + "areas").then(res => res.json())
    const FAILURECODES = await fetch(STRAPI_URL + "failurecodes").then(res => res.json())
    const MACHINES = await fetch(STRAPI_URL + "machines").then(res => res.json())
    const OEES = await fetch(STRAPI_URL + "oees").then(res => res.json())
    const RATES = await fetch(STRAPI_URL + "rates").then(res => res.json())

    return {
      status: 200,
      body: {
        AREAS,
        FAILURECODES,
        MACHINES,
        OEES,
        RATES
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