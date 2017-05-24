var zvent = new function() {

    var routes = [];


    var isRegex = function(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }


    var isFunction = function(value) {
        return (typeof value) == 'function';
    }


    var isString = function(value) {
        return typeof value === 'string' || value instanceof String;
    }


    var dispatch = function(hash, method, data) {
        var request = {
            hash: hash,
            method: method,
            data: data
        };

        for(var i=0; i<routes.length; i++) {
            var pattern = routes[i].pattern;
            var callback = routes[i].callback;

            if(pattern.test(hash)) {

                //[request, p1, p2, ..., pn]
                var args = [request].concat(hash.match(pattern).slice(1));

                callback.apply(callback, args);
                break;
            }
        }
    }


    var getParams = function(queryString) {
        var params = {};

        //valid querystring
        var pattern = /^[\w-]+=[^=]*(&[\w-]+=[^=]*)*/;

        if(pattern.test(queryString)) {
            var p = queryString.split('&');

            for(var i=0; i<p.length; i++){
                
                //skip empty params(&&)
                if(!p[i]) continue;

                var pair = p[i].split('=');
                var key = pair[0];
                var value = pair[1];

                params[key] = value;
            }
        }

        return params;
    }


    var hashParse = function(hash) {
        
        var h = hash.match(/^#?([^?]*)(\?(.*))?$/);

        return {
            hash: '' + h[1],
            queryString: '' + h[3],
            params: getParams('' + h[3])
        }
    }
    

    var getFormData = function(form) {

        var data = {};

        for (var i = 0; i<form.elements.length; i++) {
            var element = form.elements[i];
            var value = element.value;

            /* skip if:
             *  -element has no name
             *  -element is an unchecked input radio
             *  -element is an unchecked input checkbox
             */
            if(!element.name || element.nodeName == 'INPUT' && 
                (element.type == 'radio' || element.type == 'checkbox') && 
                !element.checked) {
                continue;
            } 

            /* if it's a select type multiple convert selected options 
             * to an array
             */
            if(element.nodeName == 'SELECT' && 
                element.type == 'select-multiple') {

                value = [];

                for(var j=0; j<element.options.length; j++) {
                    var option = element.options[j];
                    if(option.selected) {
                        value.push(option.value);
                    }
                }
                
            }

            data[element.name] = value;
        }

        return data;
    }


    var onHashChange = function() {
        var parsed = hashParse(location.hash);
        dispatch(parsed.hash, 'GET', parsed.params);
    }
    window.addEventListener('hashchange', onHashChange, false);


    var onSubmit = function(event) {

        var action = event.target.getAttribute('action');
        if(action.charAt(0) != '#') return;

        event.preventDefault();

        var parsed = hashParse(action);
        var method = event.target.getAttribute('method');
        var data = getFormData(event.target);

        dispatch(parsed.hash, method, data);
    }
    window.addEventListener('submit', onSubmit, false);


    var trigger = function(hash, method, data) {

        if(!isString(hash)) {
            console.log('first parameter(hash) must be an String');
            return;
        }

        if(!isString(method)) {
            console.log('second parameter(method) must be an String');
            return;
        }

        var parsed = hashParse(hash);
        
        if(method.toUpperCase() == 'GET' && data === undefined) {
            data = parsed.params;
        }

        dispatch(parsed.hash, method, data);
    }


    this.suscribe = function(pattern, callback) {
        if(!isRegex(pattern)) {
            console.log('first parameter(url) must be RegExp type');
            return;
        }

        if(!isFunction(callback)) {
            console.log('second parameter(callback) must be a Function');
            return;
        }

        routes.push({
            pattern: pattern, 
            callback: callback
        });
    }


    this.trigger = trigger;


    this.POST = function(hash, data) {
        trigger(hash, 'POST', data);
    }


    this.GET = function(hash, data) {
        trigger(hash, 'GET', data);
    }


    this.PUT = function(hash, data) {
        trigger(hash, 'PUT', data);
    }


    this.PATCH = function(hash, data) {
        trigger(hash, 'PATCH', data);
    }


    this.DELETE = function(hash, data) {
        trigger(hash, 'DELETE', data);
    }

}();
