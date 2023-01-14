import { ToyPreview } from "./toy-preview";

export function ToyList(props) {
    const { toys, onRemoveToy } = props
    return (
        <section className="toy-list">
            <ul className="clean-list">
                {toys.map((toy) => (
                    <li key={toy._id}>
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
