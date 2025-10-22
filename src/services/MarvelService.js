import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import { useHttp } from '../hooks/http.hook'
const useMarvelService = () => {
    // _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';
    const baseStep = 0;
    const { loading, error, request, clearError, process, setProcess } = useHttp();

    const getOneHero = async (id) => {
        const res = await request(`https://marvel-server-zeta.vercel.app/characters/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df`)

        return renderHero(res.data.results[0]);
    }
    const getHeroByName = async (name) => {
        const res = await request(`https://marvel-server-zeta.vercel.app/characters?name=${name}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`)

        return res.data.results.map(renderHero);
    }
    const getComicById = async (id) => {
        const res = await request(`https://marvel-server-zeta.vercel.app/comics/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df`)

        return renderComics(res.data.results[0])
    }
    const getAllHeroes = async (offset = baseStep) => {
        const res = await request(`https://marvel-server-zeta.vercel.app/characters?limit=9&offset=${offset}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`);
        return res.data.results.map(item => {
            return renderHero(item)
        });
    }
    const getAllComics = async (offset = baseStep) => {
        const res = await request(`https://marvel-server-zeta.vercel.app/comics?limit=8&offset=${offset}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`);
        return res.data.results.map(renderComics)
    }
    const renderHero = (data) => {
        return {
            name: data.name,
            id: data.id,
            description: data.description,
            comics: data.comics,
            thumbnail: data.id === 1
                ? 'https://cdn.deagostini.com/dea/live/media/iron-man-04-galeria-2-2/iron-man-04-galeria-2-2_optmzd_80.webp'
                : data.thumbnail.path + '.' + data.thumbnail.extension,
            home: data.urls[0],
            wiki: data.urls[1],
        }
    }

    const renderComics = (data) => {
        return {
            name: data.title,
            id: data.id,
            description: data.description,
            pageCount: data.pageCount,
            price: data.prices[0].price,
            thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,


        }
    }
    return {
        loading, error, request, clearError, getOneHero, getAllHeroes, getAllComics, process, setProcess, getHeroByName, getComicById
    }
}

export default useMarvelService;