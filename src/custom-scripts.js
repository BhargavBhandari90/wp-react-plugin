class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            n : 1
        };
    }

    componentDidMount() {
        console.log( 'componentDidMount' );
        this.timerID = setInterval(() => {
            this.tick();
        }, 1000);
    }
    componentWillUnmount() {
        console.log( 'componentWillUnmount' );
        clearInterval(this.timerID);
    }

    tick() {
        this.setState((state,props) => ({
            date: new Date(),
            n   : state.n + 1
        }));
    }

    render() {
        return(
            <div>
                <h2>Hello, World !</h2>
                <FormattedDate date={this.state.date} />
                <h3>Total Seconds: {this.state.n}</h3>
            </div>
        );
    }
}

function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

function MultiClock() {
    return(
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}


const root = ReactDOM.createRoot( document.getElementById( 'wproot' ) );
root.render(<MultiClock />);