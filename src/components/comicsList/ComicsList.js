import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import CharList from '../charList/CharList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const { loading, error, process, setProcess, getAllComics } = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isItAll, setIsItAll] = useState(false);
    const [needSpiner, setNeedSpiner] = useState(true)
    const [initial, setInitial] = useState(true);
    const [result, setResult] = useState(null)

    const setContent = (process, Component, data) => {
        switch (process) {
            case "waiting":
                return <Spinner />
            case "loading":
                return needSpiner ? <Spinner /> : <Component data={data} />
            case "error":
                return <ErrorBoundary />
            case "ready":
                return <Component data={data} />
            default:
                break;
        }
    }
    useEffect(() => {
        setResult(
            setContent(process, () => { return makeNewItems(comicsList) })
        )
    }, [process, comicsList])
    useEffect(() => { getAllComiccs(0, true) }, [])

    const getAllComiccs = (offset, initial) => {
        initial ? setNeedSpiner(true) : setNeedSpiner(false)
        getAllComics(offset)
            .then((data) => {
                renderData(data);
            })
            .then(() => {
                setProcess("ready")
            })
    }
    const renderData = (data) => {
        let end = false;
        if (data.length < 8) {
            end = true
        }
        setComicsList((comicsList) => ([...comicsList, ...data]))
        setOffset((offset) => (offset + 8))
        setIsItAll(end)
    }
    const makeNewItems = (data) => {
        const items = data.map(item => {
            return (
                <li className="comics__item"
                    key={item.id}
                >
                    <Link to={`/comics/${item.id}`} >
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    return (
        <div className="comics__list">
            {result}
            <button
                style={{ display: isItAll ? 'none' : 'block' }}
                onClick={() => { getAllComiccs(offset, false) }}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )


}

export default ComicsList;