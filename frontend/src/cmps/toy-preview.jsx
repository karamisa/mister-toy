import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (

        <article className="toy-preview">
            <h4>{toy.name}</h4>
            <div className="img-cont">
            <img src={require(`../assets/img/toy.png`)} alt="toy" />
            </div>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
            <div>
                <Link to={`/toy/${toy._id}`}>Details</Link> |
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            </div>
        </article>
    )
}