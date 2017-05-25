zvent.subscribe(/examples\/capture\/(\d{4})\/(\d{2})/, function(request, year, month) {
	var output = document.getElementById('output');
	output.value = 'hash: ' + request.hash;
	output.value += '\nmethod: ' + request.method;
	output.value += '\nyear: ' + year;
	output.value += '\nmonth: ' + month;
});
