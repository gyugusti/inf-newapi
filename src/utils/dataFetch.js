export default async function dataFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      credentials: 'include' // Ensure cookies are sent
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch Error:', error.message)
    throw error
  }
}
