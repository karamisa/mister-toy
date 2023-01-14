import { httpService } from './http.service.js'


const STORAGE_KEY = 'toy'

export const toyService = {
    query,
    getById,
    save,
    remove,
    addToyMsg,
    getEmptyToy,
    getDefaultFilter
}

window.cs = toyService

function query(filterBy = getDefaultFilter()) {
    return httpService.get('toy', filterBy)
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

async function addToyMsg(toyId, txt) {

    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
}

function getEmptyToy() {
    return { name: '', price: 0, labels: [], createdAt: Date.now(), inStock: true }
}

function getDefaultFilter() {
    return { name: '', inStock: false, labels: [], sortBy: '', desc: 1 }
}