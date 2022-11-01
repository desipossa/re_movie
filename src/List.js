import axios from 'axios'
import React, { useEffect, useState } from 'react'

const List = ({ genre, limit }) => {
    //데이터 가져오기
    const [movie, getMovie] = useState([]);
    const [load, setLoad] = useState(true);
    const movieData = async () => {
        const movie = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&genre=${genre}`);
        getMovie(movie.data.data.movies);
        setLoad(false)
    }
    useEffect(() => {
        movieData()
    }, [genre])
    return (
        <div>
            {
                load
                    ? <div>로딩중...</div>
                    :
                    <ul className='List'>
                        {
                            movie.map(it => {
                                return (
                                    <li key={it.id}>
                                        <figure>
                                            <img src={it.medium_cover_image} alt={it.title} />
                                        </figure>
                                        <div>{it.title}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
            }
        </div>
    )
}

export default List