var AppDispatcher = require("../dispatcher/AppDispatcher"),
	EventEmitter = require("events").EventEmitter,
	ReactCartConstants = require("../constants/ReactCartConstants"),
	_ = require("underscore");

// Set up private variables
var _product = {},
	_selected = null;

// Fetch product data from fake API
function loadProductData(data) {
	_product = data[0];
	_selected = data[0].variants[0];
}

// Set the selected product variation
function setSelectedVariant(index) {
	_selected = _product.variants[index];
}

// Add event-emitting capabilities to ProductStore
var ProductStore = _.extend({}, EventEmitter.prototype, {

	getProduct: function() {
		return _product;
	},

	getSelectedVariant: function() {
		return _selected;
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
		case ReactCartConstants.RECEIVE_DATA:
			loadProductData(action.data);
			break;

		case ReactCartConstants.SELECT_PRODUCT_VARIANT:
			setSelectedVariant(action.data);
			break;

		default:
			return true;
	}

	// If our callback matched an action, emit the change event
	ProductStore.emitChange();

	return true;
});

module.exports = ProductStore;