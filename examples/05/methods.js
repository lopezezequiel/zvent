zvent.subscribe(/examples\/methods/, function(request) {
	var output = document.getElementById('output');
	output.value = 'hash: ' + request.hash;
	output.value += '\nmethod: ' + request.method;
	output.value += '\ncolor: ' + request.data.color;
	output.value += '\nlanguages: ' + request.data.languages;
});
