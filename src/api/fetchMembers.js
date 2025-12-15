export async function fetchMembers() {
  try {
    const basePath = import.meta.env.BASE_URL ?? '/'
    const dataUrl = `${basePath}data/members.json`
    const response = await fetch(dataUrl)
    if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('fetchMembers error:', error)
    return []
  }
}
