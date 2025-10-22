import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import useMarvelService from '../../services/MarvelService';

const CharList = (props) => {
    const { loading, error, process, setProcess, getAllHeroes, getAllComics } = useMarvelService();
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [ItemsEnded, setItemsEnded] = useState(false);
    const [initial, setInitial] = useState(true);
    const [needSpiner, setNeedSpiner] = useState(true)
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
        getDataFromServer()
    }, [])

    const getDataFromServer = (offset) => {
        initial ? setNeedSpiner(true) : setNeedSpiner(false)
        getAllHeroes(offset)
            .then((data) => {
                renderDataFromServer(data);
                console.log(data)
            })
            .then(() => {
                setProcess("ready")
            })

    }
    const renderDataFromServer = (data) => {
        let end = false;
        if (data.length < 9) {
            end = true
        }

        setCharList((charList) => ([...charList, ...data]))
        setOffset((offset) => (offset + 9))
        setItemsEnded(end)
        setInitial(false)
    }
    const refsuka = useRef([]);

    const focusOnItem = (id) => {
        refsuka.current.forEach(item => item.classList.remove('char__item_selected'));
        refsuka.current[id].classList.add('char__item_selected');
        refsuka.current[id].focus();
    }
    const makeNewItems = (data) => {
        const items = data.map((item, i) => {
            return (
                <li
                    ref={el => refsuka.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        focusOnItem(item.id - 1);
                        props.changeId(item.id);
                    }}

                    className="char__item">
                    <img src={item.thumbnail} alt="abyss" />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
            ;
    }
    useEffect(() => {
        setResult(
            setContent(process, () => { return makeNewItems(charList) })
        )
    }, [process, charList])

    return (
        <div className="char__list" >
            {result}
            <button style={{ display: ItemsEnded ? 'none' : 'block' }} onClick={() => { getDataFromServer(offset) }} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )


}

export default CharList;