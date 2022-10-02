/** global bb_react */
/**
 * Basic React class.
 */
if ( document.getElementById('wproot') ) {
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

}


/**
 * Events Handleing with arguments.
 */

if ( document.getElementById('bunty-btn') ) {
    class Toggle extends React.Component {

        constructor(props) {
            super(props);
            this.state = { isON : true, changed : 0 }

            // This binding is necessary to make `this` work in the callback
            this.toggleButton = this.toggleButton.bind(this);
        }

        toggleButton(a) {
            console.log(a);
            this.setState(prevState => ({
                isON   : ! this.state.isON,
                changed: a
            }));
        }

        render() {
            return (
                <button onClick={this.toggleButton.bind(this, this.state.changed + 1)}>
                    { this.state.isON ? 'ON' : 'OFF' } 
                    Changed: {this.state.changed} times.
                </button>
            );
        }
    }

    const button_seletor = ReactDOM.createRoot( document.getElementById('bunty-btn') );
    button_seletor.render(<Toggle />);

}

/**
 * Conditional Rendering
 */

if ( document.getElementById('bunty-greet') ) {

    function UserGreeting(props) {
        return <h1>Welcome back, {bb_react.current_user_name}!</h1>;
    }

    function GuestGreeting(props) {
        return <h1>Please sign up.</h1>;
    }

    function Greeting(props) {
        const isLoggedin = props.isLoggedIn;
        if (isLoggedin) {
            return <UserGreeting />;
        }else{
            return <GuestGreeting />;
        }
    }

    const greet_root = ReactDOM.createRoot(document.getElementById('bunty-greet'));
    greet_root.render(<Greeting isLoggedIn={true} />);

}

/**
 * Get response from server.
 * Kind of ajax.
 */

if ( document.getElementById('bunty-ajax') ) {
    class MyComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
                items: []
            };
        }

        componentDidMount() {
        fetch("http://localhost:8888/wordpress/wp-json/wp/v2/posts")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
            )
        }

        render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <ul>
                {items.map(item => (
                <li key={item.id}>
                    {item.title.rendered}
                </li>
                ))}
            </ul>
            );
        }
        }
    }

    var posts_list = ReactDOM.createRoot(document.getElementById('bunty-ajax'));
    posts_list.render(<MyComponent />);
}

/**
 * Loop
 */

if ( document.getElementById('bunty-li') ) {

    function DisplayList(props) {
        const nums = props.numbers;
        const all_lis = nums.map((num) => { return <li key={num.toString()} >{num}</li> });
        return(
            <ul>{all_lis}</ul>
        );
    }

    const nums = [1, 2, 3];

    const list_ele = ReactDOM.createRoot(document.getElementById('bunty-li'));
    list_ele.render(<DisplayList numbers={nums} />);

}

/**
 * Form.
 */
if ( document.getElementById('bunty-form') ) {

    class Form extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                val: ''
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(event) {

            this.setState({
                val: this.state.val,
            });

            event.preventDefault();

        }

        handleChange(event) {
            this.setState({
                val: event.target.value,
            });
        }

        render() {
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="title" value={this.state.val} onChange={this.handleChange}/>
                        <input type="submit" value="Submit" />
                    </form>
                    <div>{this.state.val}</div>
                </div>
            )
        }

    }

    const bb_form = ReactDOM.createRoot(document.getElementById('bunty-form'));
    bb_form.render( <Form /> );

}