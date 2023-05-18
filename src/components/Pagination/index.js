import React from 'react';
import './pagination.css';

const Pagination = () => {
  const paginationListNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const clickPageHandler = () => {

  }

  return (
    <div className="pagebar">
      <ul className="pagelist">
        <li className="pagelistprevious">Previous</li>
        {paginationListNumbers.map((el, i) => (
          <li key={i} 
              className={`${i === 0 ? 'pagelistfirst' : 'pagelistnumber'}`}
              onClick={clickPageHandler}>
            {el}
          </li>
        ))}
        <li className="pagelistnext">Next</li>
      </ul>
    </div>
  )
}

export default Pagination;