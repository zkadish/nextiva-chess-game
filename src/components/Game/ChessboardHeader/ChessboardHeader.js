import React from 'react';
import './chessboardHeader.scss';
import Timer from './Timer';
import { Button } from '@nextiva/next-ui';

const ChessboardHeader = ({ back, backText, playerName, time }) => {
    return (
        <div className="chessboard_header">
            <Button kind='danger' {...back} >{backText}</Button>
            <b>{playerName}</b>
            {time && <Timer time={time} playerName={playerName} />}
        </div>
    )
};
export default ChessboardHeader;

