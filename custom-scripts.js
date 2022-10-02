var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** global bb_react */
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