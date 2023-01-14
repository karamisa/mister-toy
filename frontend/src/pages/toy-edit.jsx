import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactSelect from "react-select"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.action"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [selectedOptions, setSelectedOptions] = useState()

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const labelsToSet = data.length ? data.map(i => i.value) : []
        setToyToEdit((prevToy) => ({ ...prevToy, labels: labelsToSet }))
    }

    function onAddToy(values) {
        console.log(values)
        const labels = selectedOptions.length ? selectedOptions.map(i => i.value) : []
        const toyToSave = { ...toyToEdit, ...values, labels, }

        saveToy(toyToSave)
            .then((savedToy) => {
                console.log(savedToy)
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
            })

    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
        price: Yup.string().min(2, 'Too Short!').max(4, 'Too Long!').required('Required'),
    })

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    labels: [],
                }}
                validationSchema={SignupSchema}
                onSubmit={onAddToy}
            >

                {({ errors, touched }) => (
                    <Form className="name">
                        <Field name="name" id="name" placeholder="Toy Name" />
                        {errors.name && touched.name ? <span>{errors.name}</span> : null}

                        <Field name="price" id="price" placeholder="Toy Price" />
                        {errors.price && touched.price ? <div>{errors.price}</div> : null}

                        <div className="dropdown-container">
                            <ReactSelect
                                options={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                                placeholder="Select labels"
                                value={selectedOptions}
                                onChange={handleSelect}
                                isMulti={true}
                            />
                        </div>

                        <button type="submit">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    </Form>
                )}
            </Formik>

            <div>
                <Link to="/toy">Cancel</Link>
            </div>

        </section>
    )
}