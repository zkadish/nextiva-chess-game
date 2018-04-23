import React from "react";
import Chess from "chess.js";
import { connect } from "react-redux";

import Chessboard from './Chessboard';
import ChessboardHeader from './ChessboardHeader';
import CancelConfirmComponent from './CancelConfirmComponent';
import './game.scss';


import { makeMove, exit, giveUp } from "../../redux/actions/entranceActions";

import { ROLE_WATCHER, ROLE_WHITE } from "../../redux/constants/roles";


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.chess = new Chess();
        this.chess.clear();
        this.state = {
            selectedTileID: '',
            notConfirmedFEN: ''
        };
    }

    isMyTurn = () => {
        return !this.isCantMove() && this.chess.turn() === this.props.currentPlayerRole;
    }

    isWatcher = () => {
        return this.props.currentPlayerRole === ROLE_WATCHER;
    }

    isCantMove = () => {
        return this.state.waiting_for_opponent_join || this.isWatcher();
    }
    gameOver = () => {
        return this.chess.game_over();
    }

    getCurTurnPlayerName() {
        return this.chess.turn() === ROLE_WHITE ? this.props.player1 : this.props.player2;
    }

    getMyName() {
        return this.props.currentPlayerRole === ROLE_WHITE ? this.props.player1 : this.props.player2;
    }

    isMoveDone = () => {
        return !this.isMyTurn() && this.state.notConfirmedFEN;
    }

    getSimpleMoves(tileID) {
        let movesSet = new Set();
        this.chess.moves({ square: tileID, verbose: true }).forEach((element) => { movesSet.add(element.to) });
        return movesSet;
    }

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
            this.props.makeMove(this.props.roomId, this.state.notConfirmedFEN, this.gameOver());
        }
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
    render() {
        this.chess.load(this.state.notConfirmedFEN ? this.state.notConfirmedFEN : this.props.fen);
        return (<div>
            <div className="game_container">
                {this.getHeader()}
                {this.getBoard()}
                {this.getConfirmCancel()}
            </div>
        </div>
        );
    }

    getBoard() {
        let tiles = this.initTiles(this.state.notConfirmedFEN ? this.state.notConfirmedFEN : this.props.fen);
        return (<Chessboard tiles={tiles} />);
    }

    getHeader() {
        if (this.gameOver() || this.state.waiting_for_opponent_join) {
            let headerText = this.state.waiting_for_opponent_join ? "Wait for opponent" : `${this.getCurTurnPlayerName()} lost`;
            return (
                <ChessboardHeader
                    back={{ onClick: () => (this.props.exit()) }}
                    backText={'Go back to Lobby'}
                    playerName={headerText}
                />
            );
        }
        return (
            <ChessboardHeader
                back={this.isWatcher()?
                    { onClick: () => (this.props.exit(this.props.roomId)) } :
                    { onClick: () => (this.props.giveUp(this.props.roomId)) }
                }
                backText={this.isWatcher() ? 'Go back to Lobby' : 'Give Up!'}
                playerName={this.isWatcher() ? this.getCurTurnPlayerName() : this.state.notConfirmedFEN ? this.getMyName() : this.getCurTurnPlayerName()}
                time={this.props.time}
            />
        );
    }
    getConfirmCancel() {
        return (
            !this.gameOver() && !this.isCantMove() && <CancelConfirmComponent
                cancel={{ disabled: !this.isMoveDone(), onClick: this.onCancelClick }}
                confirm={{ disabled: !this.isMoveDone(), onClick: this.onConfirmClick }}
            />

        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { fen, player1, player2 } = nextProps;

        // var turn = fen.split(/\s+/)[1];
        return {
            waiting_for_opponent_join: player1 && !player2,
            selectedTileID: '',
            notConfirmedFEN: ''
        }
    }
}

const mapStateToProps = state => {
    return {
        fen: state.playstate.fen || '',
        player1: state.playstate.first_player,
        player2: state.playstate.second_player,
        leaved_player: state.playstate.leaved_player,
        currentPlayerRole: state.playstate.role,
        time: state.playstate.time,
        date: state.playstate.date,
        roomId: state.playstate.state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeMove: (game_id, fen, is_over) => dispatch(makeMove(game_id, fen, is_over)),
        giveUp: (game_id, fen, is_over) => dispatch(giveUp(game_id)),
        exit: (game_id, fen, is_over) => dispatch(exit(game_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);