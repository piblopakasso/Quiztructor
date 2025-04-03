const API_URL = 'http://localhost:3000'

export async function fetchQuestions() {
  const response = await fetch(`${API_URL}/questions`)
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
  return await response.json()
}
