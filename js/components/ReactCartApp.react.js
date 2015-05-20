var React = require("react"),
	CartStore = require("../stores/CartStore"),
	ProductStore = require("../stores/ProductStore"),
	ReactProduct = require("./ReactProduct.react"),
	ReactCart = require("./ReactCart.react");

function getCartState() {
	return {
		product: ProductStore.getProduct(),
		selectedProduct: ProductStore.getSelectedVariant(),
		cartItems: CartStore.getCartItems(),
		cartQuantity: CartStore.getCartProductQuantity(),
		cartTotal: CartStore.getCartTotal(),
		isCartVisible: CartStore.getCartVisibility()
	};
}

var ReactCartApp = React.createClass({
	getInitialState: function() {
		return getCartState();
	},

	componentDidMount: function() {
		ProductStore.addChangeListener(this._onChange);
		CartStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ProductStore.removeChangeListener(this._onChange);
		CartStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<div className="react-cart-app">
				<ReactCart products={this.state.cartItems} count={this.state.cartQuantity} total={this.state.cartTotal} visible={this.state.isCartVisible} />
				<ReactProduct product={this.state.product} cartItems={this.state.cartItems} selected={this.state.selectedProduct} />
			</div>
		);
	},

	_onChange: function () {
		this.setState(getCartState());
	}
});

module.exports = ReactCartApp;