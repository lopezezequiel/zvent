zvent.suscribe(/examples\/forms/, function(request) {
	var output = document.getElementById('output');
	output.value = 'hash: ' + request.hash;
	output.value += '\nmethod: ' + request.method;
	output.value += '\nemail: ' + request.data.email;
	output.value += '\npassword: ' + request.data.password;
	
	var remember = request.data.remember ? 'yes' : 'no';
	output.value += '\nremember: ' + remember ;
});
