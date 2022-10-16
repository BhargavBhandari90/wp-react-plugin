var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** global bb_react */
// import { Editor } from '@tinymce/tinymce-react';
/**
 * Basic React class.
 */
if (document.getElementById('wproot')) {
    var FormattedDate = function FormattedDate(props) {
        return React.createElement(
            'h2',
            null,
            'It is ',
            props.date.toLocaleTimeString(),
            '.'
        );
    };

    var MultiClock = function MultiClock() {
        return React.createElement(
            'div',
            null,
            React.createElement(Clock, null)
        );
    };

    var Clock = function (_React$Component) {
        _inherits(Clock, _React$Component);

        function Clock(props) {
            _classCallCheck(this, Clock);

            var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

            _this.state = {
                date: new Date(),
                n: 1
            };
            return _this;
        }

        _createClass(Clock, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                console.log('componentDidMount');
                this.timerID = setInterval(function () {
                    _this2.tick();
                }, 1000);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                console.log('componentWillUnmount');
                clearInterval(this.timerID);
            }
        }, {
            key: 'tick',
            value: function tick() {
                this.setState(function (state, props) {
                    return {
                        date: new Date(),
                        n: state.n + 1
                    };
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h2',
                        null,
                        'Hello, World !'
                    ),
                    React.createElement(FormattedDate, { date: this.state.date }),
                    React.createElement(
                        'h3',
                        null,
                        'Total Seconds: ',
                        this.state.n
                    )
                );
            }
        }]);

        return Clock;
    }(React.Component);

    var root = ReactDOM.createRoot(document.getElementById('wproot'));
    root.render(React.createElement(MultiClock, null));
}

/**
 * Events Handleing with arguments.
 */

if (document.getElementById('bunty-btn')) {
    var Toggle = function (_React$Component2) {
        _inherits(Toggle, _React$Component2);

        function Toggle(props) {
            _classCallCheck(this, Toggle);

            var _this3 = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

            _this3.state = { isON: true, changed: 0

                // This binding is necessary to make `this` work in the callback
            };_this3.toggleButton = _this3.toggleButton.bind(_this3);
            return _this3;
        }

        _createClass(Toggle, [{
            key: 'toggleButton',
            value: function toggleButton(a) {
                var _this4 = this;

                console.log(a);
                this.setState(function (prevState) {
                    return {
                        isON: !_this4.state.isON,
                        changed: a
                    };
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'button',
                    { onClick: this.toggleButton.bind(this, this.state.changed + 1) },
                    this.state.isON ? 'ON' : 'OFF',
                    'Changed: ',
                    this.state.changed,
                    ' times.'
                );
            }
        }]);

        return Toggle;
    }(React.Component);

    var button_seletor = ReactDOM.createRoot(document.getElementById('bunty-btn'));
    button_seletor.render(React.createElement(Toggle, null));
}

/**
 * Conditional Rendering
 */

if (document.getElementById('bunty-greet')) {
    var UserGreeting = function UserGreeting(props) {
        return React.createElement(
            'h1',
            null,
            'Welcome back, ',
            bb_react.current_user_name,
            '!'
        );
    };

    var GuestGreeting = function GuestGreeting(props) {
        return React.createElement(
            'h1',
            null,
            'Please sign up.'
        );
    };

    var Greeting = function Greeting(props) {
        var isLoggedin = props.isLoggedIn;
        if (isLoggedin) {
            return React.createElement(UserGreeting, null);
        } else {
            return React.createElement(GuestGreeting, null);
        }
    };

    var greet_root = ReactDOM.createRoot(document.getElementById('bunty-greet'));
    greet_root.render(React.createElement(Greeting, { isLoggedIn: true }));
}

/**
 * Get response from server.
 * Kind of ajax.
 */

if (document.getElementById('bunty-ajax')) {
    var MyComponent = function (_React$Component3) {
        _inherits(MyComponent, _React$Component3);

        function MyComponent(props) {
            _classCallCheck(this, MyComponent);

            var _this5 = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this, props));

            _this5.state = {
                error: null,
                isLoaded: false,
                items: []
            };
            return _this5;
        }

        _createClass(MyComponent, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this6 = this;

                fetch("http://localhost:8888/wordpress/wp-json/wp/v2/posts").then(function (res) {
                    return res.json();
                }).then(function (result) {
                    _this6.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                function (error) {
                    _this6.setState({
                        isLoaded: true,
                        error: error
                    });
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _state = this.state,
                    error = _state.error,
                    isLoaded = _state.isLoaded,
                    items = _state.items;

                if (error) {
                    return React.createElement(
                        'div',
                        null,
                        'Error: ',
                        error.message
                    );
                } else if (!isLoaded) {
                    return React.createElement(
                        'div',
                        null,
                        'Loading...'
                    );
                } else {
                    return React.createElement(
                        'ul',
                        null,
                        items.map(function (item) {
                            return React.createElement(
                                'li',
                                { key: item.id },
                                item.title.rendered
                            );
                        })
                    );
                }
            }
        }]);

        return MyComponent;
    }(React.Component);

    var posts_list = ReactDOM.createRoot(document.getElementById('bunty-ajax'));
    posts_list.render(React.createElement(MyComponent, null));
}

/**
 * Loop
 */

if (document.getElementById('bunty-li')) {
    var DisplayList = function DisplayList(props) {
        var nums = props.numbers;
        var all_lis = nums.map(function (num) {
            return React.createElement(
                'li',
                { key: num.toString() },
                num
            );
        });
        return React.createElement(
            'ul',
            null,
            all_lis
        );
    };

    var nums = [1, 2, 3];

    var list_ele = ReactDOM.createRoot(document.getElementById('bunty-li'));
    list_ele.render(React.createElement(DisplayList, { numbers: nums }));
}

/**
 * Form.
 */
if (document.getElementById('bunty-form')) {
    var Form = function (_React$Component4) {
        _inherits(Form, _React$Component4);

        function Form(props) {
            _classCallCheck(this, Form);

            var _this7 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

            _this7.state = {
                ttitle: '',
                tarea: '',
                tselect: ''
            };
            _this7.handleChange = _this7.handleChange.bind(_this7);
            _this7.handleSubmit = _this7.handleSubmit.bind(_this7);
            return _this7;
        }

        _createClass(Form, [{
            key: 'handleSubmit',
            value: function handleSubmit(event) {

                this.setState(_defineProperty({}, event.target.name, event.target.value));

                event.preventDefault();
            }
        }, {
            key: 'handleChange',
            value: function handleChange(event) {

                this.setState(_defineProperty({}, event.target.name, event.target.value));
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'form',
                        { onSubmit: this.handleSubmit },
                        React.createElement('input', { type: 'text', name: 'ttitle', value: this.state.ttitle, onChange: this.handleChange }),
                        React.createElement(
                            'label',
                            null,
                            'Essay:',
                            React.createElement('textarea', { name: 'tarea', value: this.state.tarea, onChange: this.handleChange })
                        ),
                        React.createElement(
                            'label',
                            null,
                            'Pick your favorite flavor:',
                            React.createElement(
                                'select',
                                { name: 'tselect', value: this.state.tselect, onChange: this.handleChange },
                                React.createElement(
                                    'option',
                                    { value: 'grapefruit' },
                                    'Grapefruit'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'lime' },
                                    'Lime'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'coconut' },
                                    'Coconut'
                                ),
                                React.createElement(
                                    'option',
                                    { value: 'mango' },
                                    'Mango'
                                )
                            )
                        ),
                        React.createElement('input', { type: 'submit', value: 'Submit' })
                    ),
                    React.createElement(
                        'div',
                        null,
                        this.state.ttitle
                    ),
                    React.createElement(
                        'div',
                        null,
                        this.state.tarea
                    ),
                    React.createElement(
                        'div',
                        null,
                        this.state.tselect
                    )
                );
            }
        }]);

        return Form;
    }(React.Component);

    var bb_form = ReactDOM.createRoot(document.getElementById('bunty-form'));
    bb_form.render(React.createElement(Form, null));
}

/**
 * Lifting state
 */

if (document.getElementById('bunty-statelift')) {
    var BoilingVerdict = function BoilingVerdict(props) {
        if (props.temperature >= 100) {
            return React.createElement(
                'p',
                null,
                'Water will boil'
            );
        } else {
            return React.createElement(
                'p',
                null,
                'Water won\'t boil'
            );
        }
    };

    var toCelsius = function toCelsius(fahrenheit) {
        if (!fahrenheit) return 0;
        return (fahrenheit - 32) * 5 / 9;
    };

    var toFahrenheit = function toFahrenheit(celsius) {
        if (!celsius) return 0;
        return celsius * 9 / 5 + 32;
    };

    var tryConvert = function tryConvert(temperature, convert) {
        console.log(convert);
        var input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        var output = convert(input);
        var rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    };

    var scaleNames = { c: 'Celsius', f: 'Fahrenheit' };

    var TempInput = function (_React$Component5) {
        _inherits(TempInput, _React$Component5);

        function TempInput(props) {
            _classCallCheck(this, TempInput);

            var _this8 = _possibleConstructorReturn(this, (TempInput.__proto__ || Object.getPrototypeOf(TempInput)).call(this, props));

            _this8.handleChange = _this8.handleChange.bind(_this8);
            _this8.state = {
                temperature: '',
                scale: 'c'
            };
            return _this8;
        }

        _createClass(TempInput, [{
            key: 'handleChange',
            value: function handleChange(event) {
                // this.setState({
                //     temperature: event.target.value
                // });
                this.props.onTemperatureChange(event.target.value);
            }
        }, {
            key: 'render',
            value: function render() {
                var temperature = this.props.temperature;
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'legend',
                        null,
                        'Enter temperature in ',
                        scaleNames[this.props.scale],
                        ':'
                    ),
                    React.createElement('input', { value: temperature, onChange: this.handleChange })
                );
            }
        }]);

        return TempInput;
    }(React.Component);

    var Calculator = function (_React$Component6) {
        _inherits(Calculator, _React$Component6);

        function Calculator(props) {
            _classCallCheck(this, Calculator);

            var _this9 = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

            _this9.handleCelsiusChange = _this9.handleCelsiusChange.bind(_this9);
            _this9.handleFahrenheitChange = _this9.handleFahrenheitChange.bind(_this9);
            _this9.state = {
                temperature: '',
                scale: 'c'
            };
            return _this9;
        }

        _createClass(Calculator, [{
            key: 'handleCelsiusChange',
            value: function handleCelsiusChange(temperature) {
                this.setState({ scale: 'c', temperature: temperature });
            }
        }, {
            key: 'handleFahrenheitChange',
            value: function handleFahrenheitChange(temperature) {
                this.setState({ scale: 'f', temperature: temperature });
            }
        }, {
            key: 'render',
            value: function render() {

                var temperature = this.state.temperature;
                var scale = this.state.scale;
                console.log(scale);
                var celc = 'f' == scale ? toCelsius(temperature) : temperature;
                var far = 'c' == scale ? toFahrenheit(temperature) : temperature;

                return React.createElement(
                    'fieldset',
                    null,
                    React.createElement(TempInput, { onTemperatureChange: this.handleCelsiusChange, temperature: celc, scale: 'c' }),
                    React.createElement(TempInput, { onTemperatureChange: this.handleFahrenheitChange, temperature: far, scale: 'f' }),
                    React.createElement(BoilingVerdict, { temperature: parseFloat(celc) })
                );
            }
        }]);

        return Calculator;
    }(React.Component);

    var water_boil = ReactDOM.createRoot(document.getElementById('bunty-statelift'));
    water_boil.render(React.createElement(
        'div',
        null,
        React.createElement(Calculator, null)
    ));
}

/**
 * Composition vs Inheritance
 */

if (document.getElementById('bunty-border')) {
    var FancyBorder = function FancyBorder(props) {
        console.log(props.children);
        return React.createElement(
            'div',
            { className: 'FancyBorder FancyBorder-' + props.color },
            props.children
        );
    };

    var WelcomeDialog = function WelcomeDialog() {
        return React.createElement(
            FancyBorder,
            { color: 'blue' },
            React.createElement(
                'h1',
                { className: 'Dialog-title' },
                'Welcome'
            ),
            React.createElement(
                'p',
                { className: 'Dialog-message' },
                'Thank you for visiting our spacecraft!'
            )
        );
    };

    var child_border = ReactDOM.createRoot(document.getElementById('bunty-border'));
    child_border.render(React.createElement(WelcomeDialog, null));
}

if (document.getElementById('bunty-table')) {
    var TableRow = function (_React$Component7) {
        _inherits(TableRow, _React$Component7);

        function TableRow() {
            _classCallCheck(this, TableRow);

            return _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).apply(this, arguments));
        }

        _createClass(TableRow, [{
            key: 'render',
            value: function render() {
                var product = this.props.product;
                var type = this.props.type;

                if ('head' == type) {

                    return React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            { colSpan: '2' },
                            product.category
                        )
                    );
                } else {

                    var stocked = product.stocked;
                    var pname = product.name;

                    if (!stocked) {
                        pname = React.createElement(
                            'span',
                            { style: { color: 'red', padding: '10px' } },
                            product.name
                        );
                    }

                    return React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            pname
                        ),
                        React.createElement(
                            'td',
                            null,
                            product.price
                        )
                    );
                }
            }
        }]);

        return TableRow;
    }(React.Component);

    var ProductTable = function (_React$Component8) {
        _inherits(ProductTable, _React$Component8);

        function ProductTable(props) {
            _classCallCheck(this, ProductTable);

            var _this11 = _possibleConstructorReturn(this, (ProductTable.__proto__ || Object.getPrototypeOf(ProductTable)).call(this, props));

            _this11.state = {};
            return _this11;
        }

        _createClass(ProductTable, [{
            key: 'render',
            value: function render() {
                var rows = [];
                var products = this.props.products;
                var category = '';

                var filterText = this.props.filterText;
                var inStockOnly = this.props.inStockOnly;

                products.forEach(function (product) {

                    if (product.name.indexOf(filterText) === -1) {
                        return;
                    }
                    if (inStockOnly && !product.stocked) {
                        return;
                    }

                    if (category != product.category) rows.push(React.createElement(TableRow, { product: product, key: product.id + "-h", type: 'head' }));

                    rows.push(React.createElement(TableRow, { product: product, key: product.id, type: 'row' }));

                    category = product.category;
                });

                return React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'Name'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'Price'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        rows
                    )
                );
            }
        }]);

        return ProductTable;
    }(React.Component);

    var SearchBar = function (_React$Component9) {
        _inherits(SearchBar, _React$Component9);

        function SearchBar(props) {
            _classCallCheck(this, SearchBar);

            var _this12 = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

            _this12.state = {
                filterText: '',
                inStockOnly: false
            };

            _this12.searchProduct = _this12.searchProduct.bind(_this12);
            _this12.checkInstoke = _this12.checkInstoke.bind(_this12);

            return _this12;
        }

        _createClass(SearchBar, [{
            key: 'searchProduct',
            value: function searchProduct(e) {
                this.props.searchProduct(e.target.value);
            }
        }, {
            key: 'checkInstoke',
            value: function checkInstoke(e) {
                this.props.checkInstoke(e.target.checked);
            }
        }, {
            key: 'render',
            value: function render() {

                var filterText = this.props.filterText;
                var inStockOnly = this.props.inStockOnly;

                return React.createElement(
                    'form',
                    null,
                    React.createElement('input', { type: 'text', placeholder: 'Search...', value: filterText, onChange: this.searchProduct }),
                    React.createElement(
                        'p',
                        null,
                        React.createElement('input', { type: 'checkbox', checked: inStockOnly, onChange: this.checkInstoke }),
                        '  ',
                        'Only show products in stock'
                    )
                );
            }
        }]);

        return SearchBar;
    }(React.Component);

    var FilterableProductTable = function (_React$Component10) {
        _inherits(FilterableProductTable, _React$Component10);

        function FilterableProductTable(props) {
            _classCallCheck(this, FilterableProductTable);

            var _this13 = _possibleConstructorReturn(this, (FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call(this, props));

            _this13.state = {
                filterText: '',
                inStockOnly: false
            };

            _this13.searchProduct = _this13.searchProduct.bind(_this13);
            _this13.checkInstoke = _this13.checkInstoke.bind(_this13);

            return _this13;
        }

        _createClass(FilterableProductTable, [{
            key: 'searchProduct',
            value: function searchProduct(status) {
                this.setState({
                    filterText: status
                });
            }
        }, {
            key: 'checkInstoke',
            value: function checkInstoke(status) {
                this.setState({
                    inStockOnly: status
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(SearchBar, {
                        filterText: this.state.filterText,
                        inStockOnly: this.state.inStockOnly,
                        searchProduct: this.searchProduct,
                        checkInstoke: this.checkInstoke
                    }),
                    React.createElement(ProductTable, {
                        filterText: this.state.filterText,
                        inStockOnly: this.state.inStockOnly,
                        products: this.props.products
                    })
                );
            }
        }]);

        return FilterableProductTable;
    }(React.Component);

    var products = [{ id: 1, category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' }, { id: 2, category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' }, { id: 3, category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' }, { id: 4, category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' }, { id: 5, category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' }, { id: 6, category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];

    var bwp_table = ReactDOM.createRoot(document.getElementById('bunty-table'));
    bwp_table.render(React.createElement(FilterableProductTable, { products: products }));
}