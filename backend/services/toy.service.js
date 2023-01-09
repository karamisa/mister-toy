const fs = require('fs');

var toys = require('../data/toy.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy = _getDefaultFilter()) {
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock) filteredToys = filteredToys.filter(toy => toy.inStock)
    if (filterBy.labels) filteredToys = filteredToys.filter(toy => filterBy.labels.every(i => toy.labels.includes(i)))

    //SORT
    if (filterBy.sortBy === 'name') {
        filteredToys.sort((t1, t2) => t1.name.localeCompare(t2.name) * filterBy.desc)
    }

    if (filterBy.sortBy === 'price' || filterBy.sortBy === 'createdAt') {
        filteredToys.sort((t1, t2) => (t1[filterBy.sortBy] - t2[filterBy.sortBy]) * filterBy.desc)
    }
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such Toy')
        const {name, price, inStock, labels, createdAt} = toy
        toyToUpdate = {name, price, inStock, labels, createdAt}
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}

function _getDefaultFilter() {
    return { name: '', inStock: false, labels: [], sortBy: '', desc: 1 }
}