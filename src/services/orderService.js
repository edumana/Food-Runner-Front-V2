import * as tokenService from './tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/orders`


async function create(order) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(order)
  })
  return res.json()
}

async function getAll() {
  const res = await fetch(BASE_URL,
    {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
  return res.json()
}

async function show(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return res.json()
}

async function fulfill(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({isFulfilled: true})
  })
  return res.json()
}

async function deleteCart(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

export {
  create,
  getAll,
  fulfill,
  show,
  deleteCart as delete,
}