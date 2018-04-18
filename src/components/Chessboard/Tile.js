import React from 'react';
import svgs from '../../SVGs';
import './chessboard.scss';

const Tile = ({ className, handleClick, piece, name, selected, move  }) => {

    return (
        <div className={className} onClick={() => handleClick(name)} >
            {piece && <img src={svgs[piece.color + '_' + piece.type]} className="piece_img"></img>}
            {selected && "S"}
            {move && "M"}
        </div>
    )
};


export default Tile;