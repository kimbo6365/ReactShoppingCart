window.React = require("react");
var ProductData = require("./ProductData"),
	CartAPI = require("./utils/CartAPI"),
	ReactCartApp = require("./components/ReactCartApp.react");

//Load up our dummy data
ProductData.init();

CartAPI.getProductData();

React.render(
	<ReactCartApp />,
	document.getElementById("react-cart")
);