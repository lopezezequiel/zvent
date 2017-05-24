zvent.suscribe(/examples\/shortcuts/, function(request) {
	var output = document.getElementById('output');
	output.value = 'hash: ' + request.hash;
	output.value += '\nmethod: ' + request.method;
	output.value += '\ntv show: ' + request.data.tvshow;
});
