import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Load from './Load';
//https://yts.mx/api/v2/movie_details.json?movie_id=10
const Detail = () => {
    const { id } = useParams();
    const [detailMovie, setDetailMovie] = useState({});
    const [load, setLoad] = useState(true);
    const getDetail = async () => {
        setLoad(true);
        const movie = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        const detail = movie.data.data.movie;
        setDetailMovie(detail);
        setLoad(false);
        console.log(detail);
    }
    useEffect(() => {
        getDetail()
    }, [id])
    return (
        <section className='Detail'>
            {
                load ? <Load /> :
                    <div className="inner">
                        <div className="img">
                            <figure>
                                <img src={detailMovie.large_cover_image} alt="" />
                            </figure>
                        </div>
                        <div className="desc">
                            <h3>{detailMovie.title}</h3>
                            <p>
                                {detailMovie.description_full}
                            </p>
                            <ul>
                                {
                                    detailMovie.genres.map((it, idx) => <li key={idx}>{it}</li>)
                                }
                            </ul>

                            <strong>{detailMovie.year}</strong>
                        </div>
                    </div>
            }
        </section>
    )
}

export default Detail