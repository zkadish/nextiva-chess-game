import React from 'react';
import svgs from '../../../../SVGs';
import './tile.scss';

const Tile = ({ squareColor, handleClick, piece, name, selected, move }) => {
    let className = squareColor + (selected ? '_selected' : move ? '_move' : '');
    return (
        < div className={className} onClick={() => handleClick(name)} >
            {piece && <img src={svgs[piece.color + '_' + piece.type]} className="piece-img" alt={piece.color + '_' + piece.type}></img>}
        </div>
    )
}


export default Tile;