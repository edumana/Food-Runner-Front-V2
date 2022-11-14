const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/inventory`

async function getAll() {
  
  const res = await fetch(BASE_URL)
  return res.json()
}

export { getAll }