odoo.define('ncf_autocomplete.ncf_autocomplete', function (require) {
    "use strict";

    var field_registry = require('web.field_registry');
    var FieldChar = field_registry.get('char');

    var FieldDgiiAutoComplete = FieldChar.extend({
        events:{
        'keyup': '_onKeyup',
        'mousedown .o_partner_autocomplete_suggestion': '_onMousedown',
        'focusout': '_onFocusout',
        'mouseenter .o_partner_autocomplete_suggestion': '_onHoverDropdown',
        'click .o_partner_autocomplete_suggestion': '_onSuggestionClicked'
        }
    });

    field_registry
    .add('dgii_autocomplete', FieldDgiiAutoComplete);

    return {
        FieldDgiiAutoComplete: FieldDgiiAutoComplete,
    };

});
