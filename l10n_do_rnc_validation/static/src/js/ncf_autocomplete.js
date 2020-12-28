odoo.define('l10n_do_rnc_validation.ncf_autocomplete', function (require) {
    "use strict";

    var field_registry = require('web.field_registry');
    var basic_fields = require('web.basic_fields');
    var FieldChar = basic_fields.FieldChar;

    var FieldDgiiAutoComplete = FieldChar.extend({
        events:{
            'keyup': '_onKeyup'
        },

        _onKeyup: function (e) {
            console.warn('im ready');
        },

        _renderEdit: function () {
        this._super.apply(this);
        var self = this;

        this.$input.autocomplete({
            classes: {'ui-autocomplete': 'o_ncf_autocomplete'},
            source: function (request, response) {

                return jsonCall(request)
                .then(function (suggestions) {
                    response(suggestions);
                });
            },
            select: function (ev, ui) {
                self.$input.val(ui.item.name);
                self._selectReq(ui.item);
                ev.preventDefault();
            },
            html: true,
            minLength: 4,
            delay: 500,
        }).data('ui-autocomplete')._renderItem = function (ul, item){
            return $(QWeb.render('ncf_autocomplete.users_autocomplete_element', {
                suggestion: item
            })).appendTo(ul);
        };
    },
    });
    function jsonCall(term){
        var myHeaders = new Headers();
        myHeaders.append("secret-key", res.api_token);
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        res.api_url = api_url + terms;
        fetch(res.api_url, requestOptions)
       		.then(response => response.text())
       		.then(result => console.log(result))
       		.catch(error => console.log('error', error));
       	    return result.json();
        }

    var res = this._super.apply(this, arguments);
        return (res, {
        api_url: this.custom_params.rnc.autocomplete.api.url,
        api_token: this.custom_params.rnc.autocomplete.api.token
    });

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
                })
                .then(function (res) {
                    self.custom_params[param] = res;
                });
                defs.push(def);
            });

        return $.when.apply($, defs).then(function () {
                return sup.apply(self, args);
        });
    }

    field_registry.add('dgii_autocomplete', FieldDgiiAutoComplete);
    return {
        FieldDgiiAutoComplete: FieldDgiiAutoComplete,
    };
});
