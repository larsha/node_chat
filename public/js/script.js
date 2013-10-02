// init socket.io
var socket = io.connect();

/*
 * receive events from node-server
 */
socket.on('clients', function(obj) {
	var span = document.querySelector('h1 > span'),
		text = ' (' + obj.connections + ')';

	while( span.firstChild )
		span.removeChild( span.firstChild );

	span.appendChild(document.createTextNode(text));
});

// receiving messages from server
socket.on('message', function(data) {
	appendMessage(data, false);
});

/*
 * helper functions
 */
function postMessage(data) {
	socket.emit('post', data);
}

function sendMessage(e) {
	e.preventDefault();

	var msg = document.querySelector('#message'),
		time = new Date();

	if (msg.value.replace(/\s/g, '') === '')
		return;

	var data = {
		'user': '',
		'message': msg.value,
		'time': pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds())
	};

	msg.value = '';
	msg.focus();

	appendMessage(data, true);
	postMessage(data);
}

function appendMessage(data, me) {
	var messages = document.querySelector('#show-messages > ul'),
		li = document.createElement('li'),
		liText = document.createTextNode(data.message),
		span = document.createElement('span'),
		spanText = document.createTextNode(data.time);

	if (me)
		li.className = 'me';

	li.appendChild(liText);
	span.appendChild(spanText);

	li.appendChild(span);
	messages.appendChild(li);

	messages.scrollTop = messages.scrollHeight;
}

/*
 * helper functions
 */
function pad(i) {
	return (i < 10 ? '0' + i : i);
}

/*
 * init our application
 */
window.onload = function() {
	var form = document.querySelector('form');

	form.addEventListener('submit', sendMessage, false);
};