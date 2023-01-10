import { httpService } from './http.service.js'


const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getToyLabels,
    getEmptyToy,
    getToyCountPerType,
    getAvgToyPricePerType
}


function query(filterBy = getDefaultFilter()) {
        const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}&labels=${filterBy.labels}&sortBy=${filterBy.sortBy}&desc=${filterBy.desc}`
        return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId).then(toy=>{
        toy.msgs='I am a TOY'
        return toy
    })
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function getDefaultFilter() {
    return { name: '', inStock: false, labels: [], sortBy: '', desc: 1 }
}

function getToyLabels() {
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    return labels
}

function getAvgToyPricePerType(toys) {
    const toyLabels = getToyLabels()
    const avgPrices = []
    const labelsWithToys = []
    for (var i = 0; i < toyLabels.length; i++) {
        const label = toyLabels[i]
        const toysWithLabel = toys.filter(toy => toy.labels.includes(label))
        if (toysWithLabel.length) {
            const avgPrice = toysWithLabel.reduce((a, toy) => a + toy.price, 0) / toysWithLabel.length
            avgPrices.push(avgPrice)
            labelsWithToys.push(label)
        }
    }
    return [labelsWithToys, avgPrices]
}

function getToyCountPerType(toys) {
    const toyLabels = getToyLabels()
    const counts = []
    for (var i = 0; i < toyLabels.length; i++) {
        const label = toyLabels[i]
        const toysWithLabel = toys.filter(toy => toy.labels.includes(label))
        counts.push(toysWithLabel.length)
    }
    console.log(toyLabels)
    console.log(counts)
    return [toyLabels, counts]

}



function getEmptyToy(){
    return {name:'',price:0, labels:[], createdAt: Date.now(), inStock:true}
}
