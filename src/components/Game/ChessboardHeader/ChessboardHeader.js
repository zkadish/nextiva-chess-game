import React from 'react';
import './chessboardHeader.scss';
import Timer from './Timer';
import { Button } from '@nextiva/next-ui';

const ChessboardHeader = ({ back, backText, playerName, time }) => {

    return (
        <div className="chessboard-header">
            <Button kind='danger' {...back} >{backText}</Button>
            <div className="chessboard-header__text"><h3>{playerName}</h3></div>
            <div className="chessboard-header__text">{time !== undefined && <Timer time={time} playerName={playerName} />}</div>
        </div>
    )
};
export default ChessboardHeader;

