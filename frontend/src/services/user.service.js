import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore
}

window.us = userService

async function getById(userId) {
    const user = await httpService.get(BASE_URL + userId)
    return user
}

async function login(credentials) {
    try {
    const user = await httpService.post('auth/login', credentials)
    _setLoggedinUser(credentials)
    return user
    } catch (err) {
        console.log('err:', err)
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname }) {
    try {
    const userToSet = { username, password, fullname, score: 10000 }
    const user = await httpService.post( 'auth/signup', userToSet)
     _setLoggedinUser(user)
     return user
    } catch (err) {
        console.log('err:', err)
        throw new Error ('Unable to Signup')
    }
}

async function updateScore(diff) {
    try{
        const user = await userService.getById(getLoggedinUser()._id)
        if (user.score + diff < 0) return Promise.reject('No credit')
        user.score += diff 
        const updatedUser = await httpService.put(BASE_URL, user)
        _setLoggedinUser(updatedUser)
        return user.score
    }
    catch (err) {
        throw new Error ('Unable to update user score')
    }
}

async function logout() {
    await httpService.post( 'auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}
