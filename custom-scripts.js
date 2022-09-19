var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function FormattedDate(props) {
    return React.createElement(
        'h2',
        null,
        'It is ',
        props.date.toLocaleTimeString(),
        '.'
    );
}

function MultiClock() {
    return React.createElement(
        'div',
        null,
        React.createElement(Clock, null)
    );
}

var root = ReactDOM.createRoot(document.getElementById('wproot'));
root.render(React.createElement(MultiClock, null));

/**
 * Events
 */

var Toggle = function (_React$Component2) {
    _inherits(Toggle, _React$Component2);

    function Toggle(props) {
        _classCallCheck(this, Toggle);

        var _this3 = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

        _this3.state = { isON: true

            // This binding is necessary to make `this` work in the callback
        };_this3.toggleButton = _this3.toggleButton.bind(_this3);
        return _this3;
    }

    _createClass(Toggle, [{
        key: 'toggleButton',
        value: function toggleButton() {
            var _this4 = this;

            this.setState(function (prevState) {
                return {
                    isON: !_this4.state.isON
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'button',
                { onClick: this.toggleButton },
                this.state.isON ? 'ON' : 'OFF'
            );
        }
    }]);

    return Toggle;
}(React.Component);

var button_seletor = ReactDOM.createRoot(document.getElementById('bunty-btn'));
button_seletor.render(React.createElement(Toggle, null));