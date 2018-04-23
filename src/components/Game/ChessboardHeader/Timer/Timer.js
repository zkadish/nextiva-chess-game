import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { startTime: 0, elapsed: 0 };
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
        this.setState({ elapsed: this.props.time * 1000 + (new Date() - this.state.startTime) });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { playerName, time } = nextProps;
        if (prevState.playerName !== playerName)
            return {
                playerName: playerName,
                startTime: new Date(),
                elapsed: time * 1000
            }
        return null;
    }

    render() {
        let date = new Date(this.state.elapsed);
        let time = date.toISOString().substr(11, 8);
        return <h3>{time}</h3>;
    }
}