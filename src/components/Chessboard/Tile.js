import React from 'react';
import svgs from '../../SVGs';


const Tile = ({ className, handleClick, piece, name }) => {

    return (
        <div className={className} onClick={() => handleClick(name)} >
            {piece && <img src={svgs[piece.color + '_' + piece.type]} className={''}></img>}
        </div>
    )
};


export default Tile;