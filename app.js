var state = {
	items: []
};

function main() {
	// store all jQuery elements needed
	function storeItems(state, cartItem) {
		cartItem.each(function(index) {
			var itemObject = {};
			itemObject['name'] = $(this).text();
			if ($(this).hasClass('shopping-item__checked')) {
				itemObject['checked'] = true;
			} else {
				itemObject['checked'] = false;
			}
			state.items.push(itemObject);
		})
	}

	// input, form, ul (that contains the list items), 
	function addItem(state, item) {
		var newObject = {
			name: item,
			checked: false
		}
		state.items.push(newObject);
	}

	function deleteItem(state, item) {
		$(item).remove();
	}

	function attachEventHandlers() {
		$('.shopping-item-delete').click(function(event) {
			var deleteIndex = $(event.target).closest('li').index();
			state.items.splice(deleteIndex, 1);
			renderList(state, $('.shopping-list'));
		})
	}

	function initFormHandler() {
		$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		addItem(state, $('input[name=shopping-list-entry]').val());
		renderList(state, $('.shopping-list'));
		})
	}

	var renderList = function(state, element){
		var itemsHTML = state.items.map(function(item) {
			return ('<li>' +
        '<span class="shopping-item' + (item.checked ? ' shopping-item__checked' : '') +'">' + item.name + '</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
				'</li>');
		});

		element.html(itemsHTML);
		attachEventHandlers();
	};

	//run on startup
	storeItems(state, $('.shopping-item'));
	renderList(state, $('.shopping-list'));
	initFormHandler();
	attachEventHandlers();
}

$(document).ready(main);