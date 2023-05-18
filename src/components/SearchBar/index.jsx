import React, { useEffect, useRef, useState } from 'react';
import Select from '../Select';
import { Line } from '../Line';
import './searchBar.css';

const SearchBar = ({ data, items, setItems, fetchHandler }) => {
  const [isClosed, setClose] = useState(true);
  const [isFocused, setFocus] = useState(true);
  const [isDragging, setDrag] = useState(false);
  let [searchedValue, setSearchedValue] = useState('');
  const [suggestions, setSugesstions] = useState([]);
  const [searchHistoryItems, setSearchHistoryItems] = useState([]);
  const wrapperRef = useRef(null);
  

  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
  }

  const [inputRef, setInputFocus] = useFocus();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClose(true);
          setFocus(false);
        } else {
          setFocus(true);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  const onSearch = (event) => {
    if (event.target.value) {
      data = data.filter(i => i.toLowerCase().includes(event.target.value));
      setItems(data);
      setSugesstions(items);
      setSearchedValue(event.target.value);
      setDrag(true);
      setClose(false);
    }
    else {
      setClose(true);
      setDrag(false);
      setSearchedValue('');
    }
    
    if ((event && suggestions.length > 0) || (event.target.value && suggestions.length > 0)) {
      suggestions.includes(inputRef.current.value) && setSugesstions([...suggestions, inputRef.current.value]);
      setClose(false);
    } 
  }

  const onEnterKeyClick = (event) => {
    event.persist();

    if (isDragging && event.key === 'Enter' && inputRef?.current?.value.length > 0) {
      !searchHistoryItems.includes(inputRef.current.value) && setSearchHistoryItems([...searchHistoryItems, inputRef.current.value]);
      fetchHandler(inputRef.current.value);
    }
  }

  const onSelectOption = (e) => {
    if (typeof e === 'object' && !Array.isArray(e) && e !== null) {
      setSearchedValue(e?.target?.childNodes[0]?.data);
      fetchHandler(e?.target?.childNodes[0]?.data);
    } else {
      setSearchedValue(e);
      fetchHandler(e);
    }

    setInputFocus();
    setClose(true);
  }

  const onRemove = () => {
    setSearchedValue('');
    setInputFocus();
  }

  const removeItem = (item) => {
    let index = searchHistoryItems.indexOf(item);

    if (index !== -1) {
      searchHistoryItems.splice(index, 1);
      setSearchHistoryItems([...searchHistoryItems]);
      onRemove();
    }
  }

  return (
    <div ref={wrapperRef} className="bar-wrapper">
      <div className={`bar ${(isFocused && suggestions.length > 0 && searchedValue.length > 0 && !isClosed)
        ? 'without-bottom-border' : ''}`}>
        <input
          autoFocus
          type="search"
          ref={inputRef}
          value={searchedValue}
          className={`searchbar ${isFocused ? 'pl-22' : ''}`}
          onChange={(event) => onSearch(event)}
          onKeyUp={onEnterKeyClick}
        />
        {isFocused && <span className="search-icon"/>}
        {(isFocused && searchedValue.length > 0) && <button className="close" title="Remove" onClick={onRemove} />}
        <a href="#"> 
          <div 
            className="voice"
            role="img" 
            title="Search by Voice"
          />
          <div className="search">
            <span className="fa fa-search" title="Search" onClick={() => onSelectOption(inputRef.current.value)} />
          </div>
        </a>
        {(isFocused && searchedValue.length > 0) && <Line />}
      </div>
      {(isFocused && searchedValue.length > 0 && suggestions.length > 0 && !isClosed) && 
        <Select
          searchedValue={searchedValue}
          suggestions={suggestions}
          searchHistoryItems={searchHistoryItems}
          setSearchHistoryItems={setSearchHistoryItems}
          removeItem={removeItem}
          chooseOptionHadler={onSelectOption}
        />
      }
    </div>
  )
}

export default SearchBar;