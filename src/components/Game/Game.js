import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Chessboard from './Chessboard';
import ChessboardHeader from './ChessboardHeader';
import CancelConfirmComponent from './CancelConfirmComponent';
import './game.scss';


import { ROLE_WATCHER } from "../../redux/constants/roles";
import { makeMove, giveUp } from "../../redux/actions/BoardActions";


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.chess = new Chess();
        this.chess.clear();
        this.state = {};
    }

    isMyTurn = () => {
        return !this.state.observer && this.chess.turn() === this.props.currentPlayerRole;
    }

    gameOver = () => {
        return this.chess.game_over();
    }

    isMoveDone = () => {
        return !this.isMyTurn() && this.state.notConfirmedFEN;
    }

    getSimpleMoves(tileID) {
        let movesSet = new Set();
        this.chess.moves({ square: tileID, verbose: true }).forEach((element) => { movesSet.add(element.to) });
        return movesSet;
    }

    initTiles(value) {
        let tiles = [];
        this.chess.load(value);
        let movesSet = this.getSimpleMoves(this.state.selectedTileID);
        this.chess.SQUARES.forEach((element, index) => {
            tiles.push(
                {
                    id: element,
                    squareColor: this.chess.square_color(element),
                    piece: this.chess.get(element),
                    canMoveSquare: movesSet.has(element),
                    isSelectedSquare: this.state.selectedTileID === element,
                    onClick: this.tileHandler
                }
            );
        });

        return tiles;
    }

    //Temporary functional. Mock for server resp
    createRoom(param) { this.props.createRoom(param); };
    joinRoom = name => { this.props.joinRoom(); };
    watchRoom = name => { this.props.watchRoom(); };
    makeMove(game_id, fen, is_over) {this.props.makeMove(game_id, fen, is_over);}
    tileHandler = (name) => {
        if (!this.isMyTurn())
            return;

        if (!this.state.selectedTileID && this.chess.get(name)) {
            let moves = this.getSimpleMoves(name);
            if (moves.size > 0) {
                this.selectTile(name);
            }
        }
        else if (this.state.selectedTileID) {
            let moves = this.getSimpleMoves(this.state.selectedTileID);
            if (moves.size > 0 && moves.has(name)) {

                this.chess.move({ from: this.state.selectedTileID, to: name });
                this.setNotConfirmedFEN(this.chess.fen());
                this.selectTile();
            } else {
                this.selectTile();
            }
        }
    }
    setNotConfirmedFEN(FEN) {
        this.setState({ notConfirmedFEN: FEN });
    }
    selectTile(ID) {
        this.setState({ selectedTileID: ID });
    }
    onCancelClick = () => {
        this.selectTile();
        this.setNotConfirmedFEN();
    }

    onConfirmClick = () => {
        if (this.state.notConfirmedFEN) {
            this.setNotConfirmedFEN();
            this.props.makeMove(this.state.notConfirmedFEN);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { fen, currentPlayerRole, player1, initializeBoard } = nextProps;

        if (player1 && !fen) {
            initializeBoard();
            return null;
        }
        var turn = fen.split(/\s+/)[1];
        return {
            observer: turn !== currentPlayerRole,
            selectedTileID: '',
            notConfirmedFEN: ''
        }
    }

    render() {
        let tiles = this.initTiles(this.state.notConfirmedFEN ? this.state.notConfirmedFEN : this.props.fen)
        return (<div>
            <button onClick={this.createRoom.bind(this, { player1: 'Tihs is me', time: 0, token: 'UNIMPLEMENTED_TOKEN' })}>Create Room</button>
            <button onClick={this.joinRoom}>Join Room</button>
            <button onClick={this.watchRoom}>As Watcher</button>
            {/* TODO: dummy, need send correct data */}
            <button onClick={this.makeMove.bind(this, 666, 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3', false)}>MakeMove</button>
            <div className="game_container">
                <ChessboardHeader
                    back={this.props.currentPlayerRole === ROLE_WATCHER ?
                        { onClick: () => (console.log('Go back to Lobby')) } :
                        { onClick: () => (console.log('Give Up!')) }
                    }
                    backText={this.props.currentPlayerRole === ROLE_WATCHER ? 'Go back to Lobby' :'Give Up!'}
                    playerName={this.props.player1}
                    //TODO: don't update when move
                    time={0}
                />
                <Chessboard tiles={tiles} />
                {!this.gameOver()&&!this.state.observer && <CancelConfirmComponent
                    cancel={{ disabled: !this.isMoveDone(), onClick: this.onCancelClick }}
                    confirm={{ disabled: !this.isMoveDone(), onClick: this.onConfirmClick }}
                />}
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fen: state.playstate.fen  || 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19',
        player1: state.playstate.first_player,
        player2: state.playstate.second_player,
        currentPlayerRole: state.playstate.role,
        time: state.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeMove: (game_id, fen, is_over) => dispatch(makeMove(game_id, fen, is_over)),

        giveUp: () => dispatch(giveUp()), //TODO: unimplemented
        exit: () => dispatch() //TODO: unimplemented
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);



/*
Состояния доски:
1.Наблюдатель
2.Мой ход
    2.1 Не выделенной фигуры
    2.2 Есть выделенная фигура
    2.3 Походил и ожидаем подтверждения
    2.4 Мат
3. Ход противника

*/