var AppDispatcher = require("../dispatcher/AppDispatcher"),
	ReactCartConstants = require("../constants/ReactCartConstants");

var ReactCartActions = {
	// Receive initial product data
	receiveProduct: function(data) {
		AppDispatcher.handleAction({
			actionType: ReactCartConstants.RECEIVE_DATA,
			data: data
		})
	},

	// Set selected product variant
	selectProductVariant: function(index) {
		AppDispatcher.handleAction({
			actionType: ReactCartConstants.SELECT_PRODUCT_VARIANT, //UMM... does this constant exist? It doesn't seem to.
			data: index
		})
	},

	// Add a product to the cart
	addToCart: function(sku, update) {
		AppDispatcher.handleAction({
			actionType: ReactCartConstants.CART_ADD,
			sku: sku,
			update: update
		})
	},

	// Remove an item from the cart
	removeFromCart: function(sku) {
		AppDispatcher.handleAction({
			actionType: ReactCartConstants.CART_REMOVE,
			sku: sku
		})
	},

	// Show/hide the cart
	toggleCartVisibility: function(isCartVisible) {
		AppDispatcher.handleAction({
			actionType: ReactCartConstants.TOGGLE_CART_VISIBILITY,
			isCartVisible: isCartVisible
		})
	}
};

module.exports = ReactCartActions;