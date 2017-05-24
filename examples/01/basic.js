zvent.suscribe(/examples\/basic/, function(request) {
	var output = document.getElementById('output');
	output.value = 'hash: ' + request.hash;
	output.value += '\nmethod: ' + request.method;
});
