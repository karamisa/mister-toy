import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactSelect from "react-select"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.action"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [selectedOptions, setSelectedOptions] = useState();
    const navigate = useNavigate()
    const { toyId } = useParams()

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        console.log(value)
        value = type === 'number' ? +value : value
        value = (type === 'checkbox' && field === 'inStock') ? (target.checked ? true : false) : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const labelsToSet = data.length ? data.map(i => i.value) : []
        console.log(labelsToSet)
        setToyToEdit((prevToy) => ({ ...prevToy, labels: labelsToSet}))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
        .then(() => {
            showSuccessMsg('Toy saved!')
            navigate('/toy')
        })
        .catch(err => {
            showErrorMsg('Cannot save toy')
        })

    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter toy name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <label className='inStock-label' htmlFor="inStock-cb"> inStock
                    <input
                        defaultChecked={(toyToEdit.inStock) ? true : false}
                        type='checkbox'
                        name='inStock'
                        id="inStock-cb"
                        value={toyToEdit.inStock}
                        onChange={handleChange}
                    />
                </label>
                <div className="dropdown-container">
                    <ReactSelect
                        options={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                        placeholder="Select labels"
                        value={selectedOptions}
                        onChange={handleSelect}
                        isMulti={true}
                    />
                </div>
                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}