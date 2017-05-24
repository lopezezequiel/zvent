zvent.suscribe(/examples\/queryString/, function(request) {
	var output = document.getElementById('output');
	output.value = 'hash: ' + request.hash;
	output.value += '\nmethod: ' + request.method;
	output.value += '\nfirstname: ' + request.data.firstname;
	output.value += '\nlastname: ' + request.data.lastname;
});
