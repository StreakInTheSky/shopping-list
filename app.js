var state = {
	items: []
};

function main() {
	// store all jQuery elements needed
	function storeItems(state, cartItem) {
		cartItem.each(function(index) {
			state.items[index] = $(this).text();
		})
	}
	function checkIfChecked(state, cartItem){

	}
	// input, form, ul (that contains the list items), 
	function addItem(state, item) {
		state.items.push(item);
	}

	var renderList = function(state, element){
		var itemsHTML = state.items.map(function(item) {
			return '<li>' + item + '</li>';
		});
		element.html(itemsHTML);
	};

	$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		storeItems(state, $('.shopping-item'));
		addItem(state, $('input[name=shopping-list-entry]').val());
		renderList(state, $('.shopping-list'));
	})

}

$(document).ready(main);