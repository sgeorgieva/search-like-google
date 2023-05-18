import React from 'react';
import Pagination from '../Pagination';
import './listResults.css';

const ListResults = ({items, searchInformation}) => {
  return (
    <>
      <hr/>
      <div className="searchresultsarea">
        <p className="searchresultsnumber">
          About {searchInformation.formattedTotalResults.replaceAll(',', ' ')} results ({searchInformation.formattedSearchTime.replace('.', ',')} seconds)
        </p>
        {items.map((item, i) => {
          return (
            <div className="searchresult" key={i}>
              <a href={`${item.link}`} target="_blank">
                <span className="displaylink">{item.displayLink}</span>
                <span className="searchlink">{item.link}</span>
              </a>
              <a target="_blank" href={`${item.link}`} className="title">{item.title}</a>
              <p>{item.snippet}</p>
            </div>
          )
          })}
        <Pagination />
      </div>
    </>
  )
}

export default ListResults;