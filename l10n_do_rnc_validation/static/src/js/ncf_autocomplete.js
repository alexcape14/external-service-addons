odoo.define('l10n_do_rnc_validation.ncf_autocomplete', function (require) {
    "use strict";

    var field_registry = require('web.field_registry');
    var basic_fields = require('web.basic_fields');
    var FieldChar = basic_fields.FieldChar;

    var FieldDgiiAutoComplete = FieldChar.extend({
    className: 'o_field_ncf_autocomplete',

    events: _.extend({}, FieldChar.prototype.events, {
        'click .o_ncf_autocomplete_suggestion': '_onSuggestionClicked',
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
                 console.log(response);
            }).then(function (suggestions) {
                    response(suggestions);
                });
            },
            select: function (ev, ui) {
                self.$input.val(ui.item.name);
                self._selectTwitterUser(ui.item);
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
    }
});

    field_registry.add('dgii_autocomplete', FieldDgiiAutoComplete);
    return {
        FieldDgiiAutoComplete: FieldDgiiAutoComplete,
    };
});


