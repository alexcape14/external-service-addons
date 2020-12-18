function params(){
    var res = this._super.apply(this, arguments);
        return (res, {
        api_url: this.custom_params.rnc.autocomplete.api.url,
        api_token: this.custom_params.rnc.autocomplete.api.token
    });
}

function load_parameters(){
    var self = this;
    var args = arguments;
    var sup = this._super;
    var defs = [];
    this.custom_params = {};

        _.each(['rnc.autocomplete.api.url', 'rnc.autocomplete.api.token'], function (param) {
            var def = self._rpc({
                model: 'ir.config_parameter',
                method: 'get_param',
                args: [param]
            }).then(function (res) {
                self.custom_params[param] = res;
            });
            defs.push(def);
        });

        return $.when.apply($, defs).then(function () {
            return sup.apply(self, args);
        });
    }

}

function jsonCall(){
    var myHeaders = new Headers();
    myHeaders.append("secret-key", api_token);

    var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
    };

    fetch(api_url, requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

	return result;
}
