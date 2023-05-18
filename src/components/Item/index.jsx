import React from 'react';
import './item.css';

const Item = ({ 
  item,
  active, 
  setSelected, 
  setHovered, 
  chooseOptionHadler, 
  searchHistoryItems, 
  setSearchHistoryItems,
  removeItem 
  }) => {
  
  const onClear = () => {
    removeItem(item);
  }

  return (
    <span 
      className={`item-wrapper ${active ? "active" : ""}`}      
    >
      <li 
        className={`item ${searchHistoryItems.includes(item) ? 'purple' : ''}`}
        onClick={(e) => {
        setSelected(item);
          !searchHistoryItems.includes(item) && setSearchHistoryItems([...searchHistoryItems, item]);
          chooseOptionHadler(item);
        }}
        onMouseEnter={() => setHovered(item)}
        onMouseLeave={() => setHovered(undefined)}>
          {item}
        </li>
      {active && <button className="clear" onClick={onClear}>Clear</button>}
    </span>
  );
}

export default Item;