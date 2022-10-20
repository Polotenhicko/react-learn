"use strict";
// код создания реакта, который я не понимаю типа

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var LikeButton = function (_React$Component) {
	_inherits(LikeButton, _React$Component);

	function LikeButton(props) {
		_classCallCheck(this, LikeButton);

		var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

		_this.state = { liked: false };
		return _this;
	}

	_createClass(LikeButton, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			if (this.state.liked) {
				return "You liked this.";
			}

			return e("button", { onClick: function onClick() {
					return _this2.setState({ liked: true });
				} }, "Like");
		}
	}]);

	return LikeButton;
}(React.Component);

var LikeButton2 = function (_React$Component2) {
	_inherits(LikeButton2, _React$Component2);

	function LikeButton2(props) {
		_classCallCheck(this, LikeButton2);

		var _this3 = _possibleConstructorReturn(this, (LikeButton2.__proto__ || Object.getPrototypeOf(LikeButton2)).call(this, props));

		_this3.state = { liked: false };
		return _this3;
	}

	_createClass(LikeButton2, [{
		key: "render",
		value: function render() {
			var _this4 = this;

			return React.createElement(
				"button",
				{ onClick: function onClick() {
						return _this4.setState({ liked: true });
					} },
				"\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F"
			);
		}
	}]);

	return LikeButton2;
}(React.Component);

// след код
// Эти три строки кода ищут элемент <div>, который мы добавили в HTML на первом шаге,
// а затем отображают React - компонент с кнопкой «Нравится» внутри него.


var domContainer = document.querySelector("#like_button_container");
var domContainer2 = document.querySelector("#like_button_container_2");
var root = ReactDOM.createRoot(domContainer);
var root2 = ReactDOM.createRoot(domContainer2);
root.render(e(LikeButton));
root2.render(e(LikeButton2));