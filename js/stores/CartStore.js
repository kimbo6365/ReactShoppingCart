var AppDispatcher = require("../dispatcher/AppDispatcher"),
	EventEmitter = require("events").EventEmitter,
	ReactCartConstants = require("../constants/ReactCartConstants"),
	_ = require("underscore");

// Set up private variables
var _products = {},
	_isCartVisible = false;

function addToCart(sku, update) {
	// Do I have to write this is an inline tertiary statement? I'd rather write it out like a statement...
	update.quantity = (sku in _products) ? _products[sku].quantity + 1 : 1;
	_products[sku] = _.extend({}, _products[sku], update);
}

function setCartVisibility(isCartVisible) {
	_isCartVisible = isCartVisible;
}

function removeItemFromCart(sku) {
	delete _products[sku];
}

var CartStore = _.extend({}, EventEmitter.prototype, {
	getCartItems: function() {
		return _products;
	},

	getCartProductQuantity: function() {
		return Object.keys(_products).length;
	},

	getCartTotal: function() {
		var total = 0;
		for (product in _products) {
			if (_products.hasOwnProperty(product)) {
				total += _products[product].price * _products[product].quantity;
			}
		}
		return total.toFixed(2);
	},

	getCartVisibility: function() {
		return _isCartVisible;
	},

	emitChange: function() {
		this.emit("change");
	},

	addChangeListener: function(callback) {
		this.on("change", callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener("change", callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action,
		text;

	// Sync up the callbacks with the ReactCartActions, via the constants
	switch (action.actionType) {
		case ReactCartConstants.CART_ADD:
			addToCart(action.sku, action.update);
			break;

		case ReactCartConstants.TOGGLE_CART_VISIBILITY:
			setCartVisibility(action.isCartVisible);
			break;

		case ReactCartConstants.CART_REMOVE:
			removeItemFromCart(action.sku);

		default:
			return true;

	}

	// If our callback matched an action, emit the change event
	CartStore.emitChange();

	return true;
});

module.exports = CartStore;

