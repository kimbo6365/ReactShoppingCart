var ReactCartActions = require("../actions/ReactCartActions");

module.exports = {
	getProductData: function() {
		var data = JSON.parse(localStorage.getItem("product"));
		ReactCartActions.receiveProduct(data);
	}
};