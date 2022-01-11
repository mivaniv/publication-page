import './App.css';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import {PSTORE} from "./store/PublicationStore";

function App() {
    return (
        <div className="App">
            <Header/>
            <Main data={PSTORE} postsPerPage={2}/>
        </div>
    );
}

export default App;
