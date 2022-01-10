import React, {useState} from 'react';
import Posts from "./Posts/Posts";
import classes from "./Main.module.css";
import Autosuggest from 'react-autosuggest';
import theme from "./Main.module.css";

const Main = ({data}) => {
    const [posts] = useState(data);
    const [filteredPosts, setFilteredPosts] = useState(data)

    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('')


    const onSuggestionsFetchRequested = ({value}) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        setSuggestions(inputLength === 0 ? [] : posts.filter(post =>
            post.name.toLowerCase().slice(0, inputLength) === inputValue.toLowerCase()
        ));
    };

    const onChange = (event, {newValue}) => {
        setValue(newValue);

        const inputLength = newValue.length;
        setFilteredPosts(inputLength === 0 ? posts : posts.filter(
            post => post.name.toLowerCase().slice(0, inputLength) === newValue.toLowerCase()
        ))

    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>

    );

    const onSuggestionsClearRequested = () => {

        setSuggestions([])

    };

    const inputProps = {
        placeholder: 'Post title',
        value,
        onChange: onChange

    };

    return (
        <div>
            <div className={classes.inputSearch}>
                <Autosuggest
                    theme={theme}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>

            <div className={classes.main}>
                <div className={classes.storePublication}>
                    {filteredPosts.map(post =>
                        <Posts key={post.name} post={post}/>)}

                </div>
            </div>
        </div>

    )
}

export default Main;