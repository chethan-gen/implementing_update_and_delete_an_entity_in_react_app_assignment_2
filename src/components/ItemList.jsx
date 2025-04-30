import { useEffect, useState } from "react";
import Item from "./Item";

const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(API_URI)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleDelete = (id) => {
        fetch(`${API_URI}/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setItems(items.filter(item => item.id !== id));
            })
            .catch((error) => console.error("Error deleting item:", error));
    };

    return (
        <div>
            {items.map((item) => (
                <Item key={item.id} item={item} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default ItemList;
