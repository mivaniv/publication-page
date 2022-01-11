import React, {useEffect, useState} from 'react';
import Posts from "./Posts/Posts";
import classes from "./Main.module.css";
import Autosuggest from 'react-autosuggest';
import theme from "./Main.module.css";
import ReactPaginate from "react-paginate";

const Main = ({data, postsPerPage}) => {
    const [posts] = useState(data);
    const [filteredPosts, setFilteredPosts] = useState(data)

    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);


    const onSuggestionsFetchRequested = ({value}) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        setSuggestions(inputLength === 0 ? [] : posts.filter(post =>
            post.name.toLowerCase().slice(0, inputLength) === inputValue.toLowerCase()
        ));
    };

    const onChange = (event, {newValue}) => {
        setValue(newValue.trim());

        const inputLength = newValue.length;
        let allPosts = inputLength === 0
            ? posts
            : posts.filter(post => post.name.toLowerCase().slice(0, inputLength) === newValue.toLowerCase());
        setItemOffset(0);
        const endOffset = itemOffset + postsPerPage;
        setFilteredPosts(allPosts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(allPosts.length / postsPerPage));

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
// Paginate
    const handlePageClick = (event) => {
        const newOffset = (event.selected * postsPerPage) % posts.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + postsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setFilteredPosts(posts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(posts.length / postsPerPage));

    }, [itemOffset, postsPerPage])
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

            <div className={classes.main} >
                <div className={classes.storePublication}>
                    {filteredPosts.map(post =>
                        <Posts key={post.name} post={post}/>)}

                </div>
            </div>
            <div className={classes.PaginationBar}>
                <ReactPaginate
                    breakLabel="..."
                    previousLabel="<<"
                    nextLabel=">>"
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={handlePageClick}
                />
            </div>
        </div>

    )
}

export default Main;