import { Button, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export function ToyPreview({ toy, onRemoveToy }) {
    return (

        <Paper elevation={7}>
            <article className="toy-preview">
                <h4>{toy.name}</h4>
                <div className="img-cont">
                    <img src={require(`../assets/img/toy.png`)} alt="toy" />
                </div>
                <p>Price: <span>${toy.price.toLocaleString()}</span></p>
                <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
                <Stack direction="row" spacing={2}>
                    <Button component={Link} to={`/toy/${toy._id}`}>
                        Details
                    </Button>
                    <Button component={Link} to={`/toy/edit/${toy._id}`}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => onRemoveToy(toy._id)}>
                        <DeleteOutlinedIcon />
                    </Button>
                </Stack>
            </article>
        </Paper>
    )
}