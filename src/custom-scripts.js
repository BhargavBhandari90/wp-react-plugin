/** global bb_react */
// import { Editor } from '@tinymce/tinymce-react';
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
                ttitle: '',
                tarea: '',
                tselect: '',
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(event) {

            this.setState({
                [event.target.name]: event.target.value
            });

            event.preventDefault();

        }

        handleChange(event) {

            this.setState({
                [event.target.name]: event.target.value
            });
        }

        render() {
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="ttitle" value={this.state.ttitle} onChange={this.handleChange}/>
                        <label>
                            Essay:
                            <textarea name="tarea" value={this.state.tarea} onChange={this.handleChange} />
                        </label>
                        <label>
                            Pick your favorite flavor:
                            <select name="tselect" value={this.state.tselect} onChange={this.handleChange}>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <div>{this.state.ttitle}</div>
                    <div>{this.state.tarea}</div>
                    <div>{this.state.tselect}</div>
                </div>
            )
        }

    }

    const bb_form = ReactDOM.createRoot(document.getElementById('bunty-form'));
    bb_form.render( <Form /> );

}

/**
 * Lifting state
 */

 if ( document.getElementById('bunty-statelift') ) {

    function BoilingVerdict(props) {
        if (props.temperature >= 100) {
            return <p>Water will boil</p>;
        } else {
            return <p>Water won't boil</p>;
        }
    }

    function toCelsius(fahrenheit) {
        if ( ! fahrenheit ) return 0;
        return (fahrenheit - 32) * 5 / 9;
    }

    function toFahrenheit(celsius) {
        if ( ! celsius ) return 0;
        return (celsius * 9 / 5) + 32;
    }

    function tryConvert(temperature, convert) {
        console.log(convert);
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    const scaleNames = { c: 'Celsius', f: 'Fahrenheit' };

    class TempInput extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                temperature: '',
                scale: 'c',
            };
        }

        handleChange( event ) {
            // this.setState({
            //     temperature: event.target.value
            // });
            this.props.onTemperatureChange(event.target.value);
        }

        render() {
            const temperature = this.props.temperature;
            return (
              <div>
                <legend>Enter temperature in {scaleNames[this.props.scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
              </div>
            );
          }
    }

    class Calculator extends React.Component {
        constructor(props) {
            super(props);
            this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
            this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
            this.state = {
                temperature: '',
                scale: 'c'
            };
        }

        handleCelsiusChange(temperature) {
            this.setState({scale: 'c', temperature});
        }

        handleFahrenheitChange(temperature) {
            this.setState({scale: 'f', temperature});
        }

        render() {

          const temperature = this.state.temperature;
          const scale = this.state.scale;
          console.log(scale);
          const celc = 'f' == scale ? toCelsius( temperature ) : temperature
          const far = 'c' == scale ? toFahrenheit( temperature ) : temperature;

          return (
            <fieldset>
              <TempInput onTemperatureChange={this.handleCelsiusChange} temperature={celc} scale="c" />
              <TempInput onTemperatureChange={this.handleFahrenheitChange} temperature={far} scale="f"/>
              <BoilingVerdict temperature={parseFloat(celc)} />
            </fieldset>
          );
        }
      }

    const water_boil = ReactDOM.createRoot(document.getElementById('bunty-statelift'));
    water_boil.render(
        <div>
            <Calculator />
        </div>
    );

}

/**
 * Composition vs Inheritance
 */

if ( document.getElementById('bunty-border') ) {

    function FancyBorder(props) {
        console.log(props.children);
        return (
            <div className={'FancyBorder FancyBorder-' + props.color}>
                {props.children}
            </div>
        );
    }

    function WelcomeDialog() {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">Welcome</h1>
                <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
            </FancyBorder>
        );
    }

    const child_border = ReactDOM.createRoot(document.getElementById('bunty-border'));
    child_border.render(<WelcomeDialog/>);

}

if ( document.getElementById('bunty-table') ) {
    class TableRow extends React.Component {

        render() {
            const product = this.props.product;
            const type = this.props.type;

            if ( 'head' == type ) {

                return (
                    <tr>
                        <th colSpan="2">{product.category}</th>
                    </tr>
                )

            } else {

                const stocked = product.stocked;
                let pname     = product.name;

                if ( ! stocked ) {
                    pname = <span style={{color: 'red', padding: '10px'}}>{product.name}</span>;
                }

                return (
                    <tr>
                        <td>{pname}</td>
                        <td>{product.price}</td>
                    </tr>
                )

            }
        }

    }

    class ProductTable extends React.Component {

        constructor(props) {
            super(props);
            this.state = {};
        }

        render() {
            const rows = [];
            const products = this.props.products;
            let category = '';

            const filterText  = this.props.filterText;
            const inStockOnly = this.props.inStockOnly;

            products.forEach(product => {

                if (product.name.indexOf(filterText) === -1) {
                    return;
                }
                if (inStockOnly && !product.stocked) {
                    return;
                }

                if ( category != product.category )
                    rows.push( <TableRow product={product} key={product.id+"-h"} type="head" /> );

                rows.push( <TableRow product={product} key={product.id} type="row" /> );

                category = product.category;
            });

            return (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            )
        }

    }


    class SearchBar extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                inStockOnly: false
            };

            this.searchProduct = this.searchProduct.bind(this);
            this.checkInstoke = this.checkInstoke.bind(this);

        }

        searchProduct(e) {
            this.props.searchProduct(e.target.value);
        }

        checkInstoke(e) {
            this.props.checkInstoke(e.target.checked);
        }

        render() {

            const filterText  = this.props.filterText;
            const inStockOnly = this.props.inStockOnly;

            return (
                <form>
                    <input type="text" placeholder="Search..." value={filterText} onChange={this.searchProduct} />
                    <p>
                        <input type="checkbox" checked={inStockOnly} onChange={this.checkInstoke} />
                        {'  '}
                        Only show products in stock
                    </p>
                </form>
            )
        }

    }

    class FilterableProductTable extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                filterText: '',
                inStockOnly: false
            };

            this.searchProduct = this.searchProduct.bind(this);
            this.checkInstoke = this.checkInstoke.bind(this);

        }

        searchProduct(status) {
            this.setState({
                filterText: status,
            });
        }

        checkInstoke(status) {
            this.setState({
                inStockOnly: status,
            });
        }

        render() {
          return (
            <div>
              <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                searchProduct={this.searchProduct}
                checkInstoke={this.checkInstoke}
                />
              <ProductTable
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                products={this.props.products}
                />
            </div>
          );
        }
      }


    const products = [
        {id: 1, category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
        {id: 2, category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
        {id: 3, category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
        {id: 4, category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
        {id: 5, category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
        {id: 6, category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
      ];

    const bwp_table = ReactDOM.createRoot(document.getElementById('bunty-table'));
    bwp_table.render(<FilterableProductTable products={products} />);

}