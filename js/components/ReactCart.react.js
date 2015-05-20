var React = require("react"),
	ReactCartActions = require("../actions/ReactCartActions");

var ReactCart = React.createClass({
	hideCart: function() {
		ReactCartActions.toggleCartVisibility(false);
	},

	showCart: function() {
		ReactCartActions.toggleCartVisibility(true);
	},

	removeFromCart: function(sku) {
		ReactCartActions.removeFromCart(sku);
		ReactCartActions.toggleCartVisibility(false);
	},

	render: function() {
		var self = this,
			products = this.props.products;

		return (
			<div className={"react-cart " + (this.props.visible ? "active" : "")}>
				<div className="mini-cart">
					<button type="button" className="hide-cart" onClick={this.hideCart}>x</button>
					<ul>
						{Object.keys(products).map(function(product){
							return (
								<li key={product}>
									<h1 className="name">{products[product].name}</h1>
									<p className="type">{products[product].type} x {products[product].quantity}</p>
									<p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
									<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
								</li>
							)
						})}
					</ul>
					<span className="total">Total: ${this.props.total}</span>
				</div>
				<button type="button" className="view-cart" onClick={this.showCart} disabled={Object.keys(this.props.products).length > 0 ? "" : "disabled" }>
					View Cart ({this.props.count})
				</button>
			</div>
		);
	}
});

module.exports = ReactCart;