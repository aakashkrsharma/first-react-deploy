import { useEffect, useState } from "react"

export default function Akash({ name }) {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/message")
            .then(response => {
                if (!response.ok) {
                    console.log('bad response', response)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('good response', response);
                return response.json();
            })
            .then(data => {
                setMessage(data.message);
                setLoading(false);
                console.log(data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                console.error('error fetching message:', error)
            });
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }       

    return <>
        <h3>Welcome {name}</h3>
        <p>{message}</p>
    </>
}