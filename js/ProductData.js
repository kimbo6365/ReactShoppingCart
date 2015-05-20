module.exports = {
	// Set up some dummy data to go into localStorage
	init: function() {
		localStorage.clear();
		localStorage.setItem("product", JSON.stringify([
		{
			id: "0001",
			name: "Kim's Jokes&copy;",
			image: "kims_jokes.png",
			description: "Do you like laughs? Kim's Jokes&copy; deliver the most bang for your buck, delivering non-stop punchlines.",
			variants: [
			{
				sku: "0001_knock",
				type: "Knock Knock joke",
				price: "15.95",
				inventory: 3
			},
			{
				sku: "0001_dad",
				type: "Dad joke",
				price: "21.95",
				inventory: 2
			},
			{
				sku: "0001_newYorker",
				type: "New Yorker joke",
				price: "75.95",
				inventory: 7
			}]
		}]));
	}
}