import { toyService } from '../services/toy.service.js'
import { store } from '../store/store.js'
import { REMOVE_TOY, SET_TOYS, ADD_TOY, UPDATE_TOY, UNDO_REMOVE_TOY, SET_IS_LOADING } from '../store/toy.reducer.js'

export async function loadToys(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        try {
            const toys = await toyService.query(filterBy)
            store.dispatch({ type: SET_TOYS, toys })
        } catch (err) {
            console.log('Had issues loading toys', err)
            throw err
        }
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

// Example for Optimistic mutation:
export async function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    try {
        return await toyService.remove(toyId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_TOY })
        console.log('Had issues Removing toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err
    }
}