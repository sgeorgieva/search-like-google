import React, { useEffect, useState } from 'react';
import Item from '../Item';
import './select.css';

const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

const Select = ({suggestions, removeItem, chooseOptionHadler, searchedValue, searchHistoryItems, setSearchHistoryItems}) => {
  const [selected, setSelected] = useState('');
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (suggestions.length && downPress) {
      setCursor(prevState =>
        prevState < suggestions.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (suggestions.length && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (suggestions.length > 0 && enterPress) {
      setSelected(suggestions[cursor]);
      !searchHistoryItems.includes(suggestions[cursor]) && setSearchHistoryItems([...searchHistoryItems, suggestions[cursor]]);
      chooseOptionHadler(suggestions[cursor]);
    } 
    else if (suggestions.length < 1 && enterPress) {
      setSelected(searchedValue);
      chooseOptionHadler(searchedValue);
    }
  }, [cursor, enterPress]);

  useEffect(() => {
    if (suggestions.length && hovered) {
      setCursor(suggestions.indexOf(hovered));
    }
  }, [hovered]);

  return (
      <div className="select">
        <div className="select-inner">
          <ul className="select-list">
          {suggestions.slice(0, 10).map((item, i) => (
            <Item
              key={i}
              active={i === cursor}
              item={item}
              removeItem={removeItem}
              setSelected={setSelected}
              setHovered={setHovered}
              searchHistoryItems={searchHistoryItems} 
              setSearchHistoryItems={setSearchHistoryItems}
              chooseOptionHadler={chooseOptionHadler}
            />
            ))
          }
          </ul>
        </div>
    </div>
  )
}

export default Select;