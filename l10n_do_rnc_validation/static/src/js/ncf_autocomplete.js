odoo.define('l10n_do_rnc_validation.ncf_autocomplete', function (require) {
    "use strict";

    var field_registry = require('web.field_registry');
    var basic_fields = require('web.basic_fields');
    var FieldChar = basic_fields.FieldChar;

    var FieldDgiiAutoComplete = FieldChar.extend({
    className: 'o_field_ncf_autocomplete',

    events: _.extend({}, FieldChar.prototype.events, {
        'keyup': '_onKeyup',
    }),

    _onKeyup: function (e) {
        console.warn('im ready');
    },

    _renderEdit: function () {
        this._super.apply(this);
        var self = this;

        this.$input.autocomplete({
            classes: {'ui-autocomplete': 'o_social_ncf_autocomplete'},
            source: function (request, response) {

            var settings = {
                 "url": "https://api.jsonbin.io/b/5febb73ad73ed63cc0f409ae",
                 "method": "GET",
                 "timeout": 0,
                 "headers": {
                      "secret-key": "$2b$10$X0aOAYvh6OfaXNHzcLIkcOO8t.9p4orHVoetrlv/rL0.vd.MvCoTC"
                 },
            };
                $.ajax(settings).done(function (response) {
                     console.log(response.data);
                     $("#contdd").html("");
                     for(var i = 0; i < response.data.length; i++){
                        var itemName = response.data;
                        var query = (itemName[i]['business_name']);
                        var div = document.getElementById("contdd");
                        var p = document.createElement("p");
                        p.appendChild(document.createTextNode(query));
                        div.appendChild(p);
                     }
                })
            },
            html: true,
            minLength: 4,
        });
    },

    _load_parameters: function (){
        var self = this;
        var args = arguments;
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
                console.log(defs);
            })

        return defs;
    }
});


    field_registry.add('dgii_autocomplete', FieldDgiiAutoComplete);
    return {
        FieldDgiiAutoComplete: FieldDgiiAutoComplete,
    };
});


