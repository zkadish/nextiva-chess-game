import React from 'react';
import Tile from './Tile';
import './chessboard.scss';

const Chessboard = ({ tiles }) => {
    return (
        <div className="board">
            {tiles.map((element) => (
                <Tile
                    key={element.id}
                    name={element.id}
                    squareColor={element.squareColor}
                    handleClick={element.onClick}
                    piece={element.piece}
                    move={element.canMoveSquare}
                    selected={element.isSelectedSquare}
                />
            ))
            }
        </div>
    )
};
export default Chessboard;

