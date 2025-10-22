import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsList from "../comicsList/ComicsList";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import SingleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout";
import SinglePage from '../pages/SinglePage';
import decoration from '../../resources/img/vision.png';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/characters" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsList />} />
                        <Route
                            path="/comics/:id"
                            element={<SinglePage Component={SingleComicLayout} dataType="comics" />}
                        />
                        <Route
                            path="/characters/:id"
                            element={<SinglePage Component={SingleCharacterLayout} dataType="chars" />}
                        />
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
