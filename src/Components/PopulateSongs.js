import React from 'react'

const PopulateSongs = ({result, sendUri}) => {


  const handleClick = () => {
    sendUri(result);
  }

  return (
    <div 
    style={{cursor: "pointer"}}
    className="d-flex m-2 row border border-success rounded-3" 
    onClick={handleClick}
    >
        <div className="col-1" style={{gridTemplateColumns: `${result.height}px 70%`}}>
            <img src={result.image} alt={result.name} width="64px" height="64px" />
        </div>
        <div className="col-sm">
            <div>{result.name}</div>
            <div className="text-muted">{result.artist.name}</div>
        </div>
    </div>
  )
}

export default PopulateSongs