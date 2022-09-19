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
        </div>
    );
}


const root = ReactDOM.createRoot( document.getElementById( 'wproot' ) );
root.render(<MultiClock />);


/**
 * Events
 */

class Toggle extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isON : true }

        // This binding is necessary to make `this` work in the callback
        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton() {
        this.setState(prevState => ({
            isON : ! this.state.isON
        }));
    }

    render() {
        return (
            <button onClick={this.toggleButton}>
                { this.state.isON ? 'ON' : 'OFF' }
            </button>
        );
    }
}

const button_seletor = ReactDOM.createRoot( document.getElementById('bunty-btn') );
button_seletor.render(<Toggle />);