var React = require("react"),
	ReactCartActions = require("../actions/ReactCartActions");

var ReactProduct = React.createClass({
	addToCart: function(event) {
		var sku = this.props.selected.sku;
		var update = {
			name: this.props.product.name,
			type: this.props.selected.type,
			price: this.props.selected.price
		}
		ReactCartActions.addToCart(sku, update);
		ReactCartActions.toggleCartVisibility(true);
	},

	selectProductVariant: function(event) {
		ReactCartActions.selectProductVariant(event.target.value);
	},

	render: function() {
		var quantityAvailable = (this.props.selected.sku in this.props.cartItems) ?
			this.props.selected.inventory - this.props.cartItems[this.props.selected.sku].quantity : this.props.selected.inventory;

		return (
			<div className="react-product">
				<img src={"img/" + this.props.product.image}/>
				<div className="react-product-detail">
					<h1 className="name" dangerouslySetInnerHTML={{__html: this.props.product.name}}></h1>
					<p className="description" dangerouslySetInnerHTML={{__html: this.props.product.description}}></p>
					<p className="price">Price: ${this.props.selected.price}</p>
					<select onChange={this.selectProductVariant}>
						{this.props.product.variants.map(function(variant, index){
							return (
								<option key={index} value={index}>{variant.type}</option>
							)
						})}
					</select>
					<button type="button" onClick={this.addToCart} disabled={quantityAvailable > 0 ? "" : "disabled"}>
						{quantityAvailable > 0 ? "Add to Cart" : "Sold Out"}
					</button>
				</div>
			</div>
		);
	}
});

module.exports = ReactProduct;