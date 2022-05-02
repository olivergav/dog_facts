import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function BreedListAtEnter({api_key}) {
    const [breeds, setBreeds] = useState([])

    // const [breedsToSearch, setBreedsToSearch] = useState([])

    const [mySearch, setMySearch] = useState('')

    useEffect(() => {
        getBreeds(api_key).then((data) => setBreeds(data)).then()
    }, []);

    // useEffect(() => {
    //     setBreedsToSearch(breeds)
    // }, [])

    async function getBreeds(api_key) {
        const response = await fetch(`https://api.TheDogAPI.com/v1/breeds?api_key=${api_key}`)

        if (response.status !== 200) {
            throw new Error('Something went wrong!')
        }

        return await response.json();
    }

    function handleSubmit(event){
        event.preventDefault()
        // console.log(breeds)
        // console.log(breedsToSearch)
        // console.log(mySearch)
        setBreeds(breeds.filter((dog) => dog.name.toLowerCase().includes(mySearch.toLowerCase())))
    }

    return (
        <>
            <div className="App">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search">Search by breed: </label>
                    <input type="text" id="search" value={mySearch} onChange={((event) => {
                        setMySearch(event.target.value)
                    })}/>
                    <button>Submit</button>
                </form>

                <ul>
                    <h1>All breeds:</h1>
                    <h4>Click for more info</h4>

                    {breeds.map((breed) => (
                        <li key={breed.name}>
                            <Link to={`/details/${breed.id}`}>
                                <div className={'pictureInfo homepage'}>
                                    <h2>{breed.name}</h2>
                                    <img src={`${breed.image.url}`} alt={`${breed.name}`} width={500} loading={"lazy"}/>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default BreedListAtEnter;