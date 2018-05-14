"use strict";

function _toConsumableArray(a) { if (Array.isArray(a)) { for (var b = 0, c = Array(a.length); b < a.length; b++) { c[b] = a[b]; } return c; } else { return Array.from(a); } }

(function (Global, document) {
    var _curry = function (b) {
        var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return function () {
            for (var c = arguments.length, d = Array(c), e = 0; e < c; e++) {
                d[e] = arguments[e];
            }

            return function (c) {
                return c.length === b.length ? b.apply(undefined, _toConsumableArray(c)) : _curry(b, c);
            }([].concat(_toConsumableArray(a), d));
        };
    };

    var _compose = function () {
        for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) {
            b[c] = arguments[c];
        }

        return b.reduce(function (a, b) {
            return function () {
                return a(b.apply(undefined, arguments));
            };
        });
    };

    var _pipe = function () {
        for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) {
            b[c] = arguments[c];
        }

        return b.reduce(function (a, b) {
            return function () {
                return b(a.apply(undefined, arguments));
            };
        });
    };

    var _not = function (a) {
        return function () {
            return !a.apply(undefined, arguments);
        };
    };

    var _flip = function (a) {
        return function () {
            for (var b = arguments.length, c = Array(b), d = 0; d < b; d++) {
                c[d] = arguments[d];
            }

            return a.apply(undefined, _toConsumableArray(c.reverse()));
        };
    };

    var _all = function () {
        for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) {
            b[c] = arguments[c];
        }

        return b.reduce(function (a, b) {
            return !!(a && b);
        }, true);
    };

    var _any = function () {
        for (var a = arguments.length, b = Array(a), c = 0; c < a; c++) {
            b[c] = arguments[c];
        }

        return b.reduce(function (a, b) {
            return !!(a || b);
        }, false);
    };

    var _box = function (a) {
        return Array.isArray(a) ? a : [a];
    };

    var _toDate = function (a) {
        return new Date(a);
    };

    var _dtFieldToDate = function (a) {
        return Object.prototype.toString.call(a) === '[object String]' ? _toDate($$.getElement(a)) : a;
    };

    var _where = function (a) {
        var b = a.replace(/{{/g, "\\\'\\\'\' + {{").replace(/}}/g, " + '\\\'\\\' {{").replace(/{#/g, "\' + {{").replace(/#}/g, " + ' {{").split('{{');
        return "\'" + b.reduce(function (a, b) {
            return a + b;
        }, '') + "\'";
    };

    var _exists = function (a) {
        return a !== undefined && a !== null || !!a;
    };

    var _fromNullable = function (a) {
        return a === undefined || !a;
    };

    var _isDateTimeField = function (a) {
        return $('#' + a).attr('type_code') === 'DT' || $('#' + a).attr('type_code') === 'D';
    };

    var _tryCatch = function (a) {
        try {
            return a;
        } catch (a) {}
    };

    var _isBlankDtTm = function (a) {
        return getFormElement(a) === '' && getFormElement('time_' + a) === '';
    };

    var _isBlankDtOrTm = function (a) {
        return getFormElement(a) === '' || getFormElement('time_' + a) === '';
    };
    var _hasDtOrTm = _not(_isBlankDtTm);

    var _isBlank = function (a) {
        return _isDateTimeField(a) ? _isBlankDtTm(a) : getFormElement(a) === '';
    };
    var _hasValue = function (a) {
        return _isDateTimeField(a) ? _not(_isBlankDtOrTm)(a) : _not(_isBlank)(a);
    };

    var _wasModified = function (a) {
        var b = $('#' + a).attr('old_value');
        var c = $$.getElement(a);

        if (!_exists(b)) {
            $('#' + a).attr('old_value', '');
        }

        if (_hasValue(a)) {
            return _exists(b) && b !== c;
        }
        return false;
    };

    var _keepValue = function (a) {
        var b = $$.getElement(a);
        if (_hasValue(a)) {
            $('#' + a).attr('old_value', b);
        }
    };

    var _valueChanged = function (a) {
        return _wasModified(a) && _fromNullable(_keepValue(a));
    };

    Global.$$ = {
        hasActiveEnrollment: function hasActiveEnrollment(peopleId, programId) {
            var cond = eval(_where('program_info_id = {{programId}}'));
            var has_enrollment = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
            var end_date = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

            return has_enrollment && !end_date;
        },

        setXMLAttribute: function setXMLAttribute(a, b, c) {
            a = _box(a).slice();

            if (typeof c === 'number') {
                c = c ? 'true' : 'false';
            }
            for (var d = 0; d < a.length; d++) {
                _tryCatch($$.getNodeFromXML(a[d], formXML).setAttribute(b, c));
            }
            refreshView(a[0]);
        },

        getXMLAttribute: function getXMLAttribute(a, b) {
            return _tryCatch($$.getNodeFromXML(a, formXML).getAttribute(b));
        },

        setRequired: function setRequired(a, b) {
            a = _box(a).slice();
            var c = b ? makeRequired : makeUnRequired;
            a.map(function (a) {
                return _tryCatch(c({
                    id: a
                }));
            });
        },

        setRequiredIfEntered: function setRequiredIfEntered(a) {
            $$.setRequired(a, !_isBlank(a));
            if (_isDateTimeField(a)) {
                $('#time_' + a).prev().attr('style', $('#caption_' + a).attr('style'));
            }
        },

        setElement: function setElement(a, b) {
            if (formElementExists(a)) {
                var c = $$.getNodeFromXML(a, formXML);
                var d = c.getAttribute('is_modifiable') === 'true' ? true : false;

                c.setAttribute('is_modifiable', 'true');

                if (_isDateTimeField(a)) {
                    var e = b.split(/\s/i);
                    var f = e[0];
                    var g = (e[1] ? e[1] : '') + (e[2] ? e[2] : '');
                    _tryCatch(setFormElement(a, f));
                    _tryCatch(setFormElement('time_' + a, g));
                    d && $('#time_' + a).attr('disabled', !d);
                } else {
                    _tryCatch(setFormElement(a, b));
                }

                d && $('#' + a).attr('disabled', !d);
            }
        },

        getElement: function getElement(a, b) {
            var c = _fromNullable(b) ? getElementFromXML(formXML, a) : getFormElement(a);

            if (_isDateTimeField(a) && c.length <= 16) {
                c = $('#' + a).val() + ' ' + $('#time_' + a).val();
            }

            return c;
        },

        getClientAge: function getClientAge(a) {
            return getDataValue('client_personal_view', 'people_id', a, 'age');
        },

        getNodeFromXML: function getNodeFromXML(a, b) {
            b = _fromNullable(b) ? formXML : b;
            var c = null;

            if (a.charAt(0) !== '#') {
                c = b.selectSingleNode("form_object/form_group/form_item[@column_name='" + a + "']") || b.selectSingleNode("form_group/form_item[@column_name='" + a + "']");
            } else {
                c = b.selectSingleNode("form_object/form_group/form_item[@caption='" + a.slice(1) + "']") || b.selectSingleNode("form_group/form_item[@caption='" + a.slice(1) + "']");
            }
            return c;
        },

        refreshView: function refreshView(a) {
            xslTarget.innerHTML = transformXML(formXSL.XMLDocument.xml, formXML.xml);
            IsDirty() && formState(a.form, true);
        },

        showErrMsg: function showErrMsg(a, b) {
            var c = $('#' + a)[0];

            $$.hideErrMsg(a);

            b = '❌ ' + b;

            $(c).parent().parent().parent().prepend('<tr id="' + c.id + '_err_row"><td width="120"></td><td rowSpan="1" colSpan="1"><div id=' + c.id + '_err_msg >' + b + '</div></td></tr>');
            $('#' + c.id + '_err_msg').css({
                margin: '10px 0px',
                padding: '10px',
                float: 'left',
                width: '50%',
                color: '#D8000C',
                backgroundColor: '#FFD2D2',
                fontFamily: 'arial',
                fontSize: '.8em',
                verticalAlign: 'middle'
            });
        },

        hideErrMsg: function hideErrMsg(a) {
            $('#' + a + '_err_row').remove();
        },

        dtComp: function dtComp(a, b, c) {
            a = _dtFieldToDate(a);
            c = _dtFieldToDate(c);
            switch (b) {
                case '=':
                    return a.toString() === c.toString();
                case 'equal':
                    return a.toString() === c.toString();
                case '!=':
                    return a.toString() !== c.toString();
                case 'different':
                    return a.toString() !== c.toString();
                case '>':
                    return a > c;
                case 'after':
                    return a > c;
                case '>=':
                    return a >= c;
                case '<':
                    return a < c;
                case 'before':
                    return a < c;
                case '<=':
                    return a <= c;

                default:
                    return false;
            }
        },

        dateIsAfter: function dateIsAfter(a, b, c) {
            if (_hasValue(a) && _valueChanged(a) && !$$.dtComp(a, 'after', b)) {
                $$.showErrMsg(a, c);
                _hasValue(a) && $$.setElement(a, '');
            } else if (_hasValue(a) && $$.dtComp(a, 'after', b)) {
                $$.hideErrMsg(a);
            }
        },

        dateIsBefore: function dateIsBefore(a, b, c) {
            if (_hasValue(a) && _valueChanged(a) && !$$.dtComp(a, 'before', b)) {
                $$.showErrMsg(a, c);
                !_isBlankDtTm(a) && $$.setElement(a, '');
            } else if (!_isBlankDtTm(a)) {
                $$.hideErrMsg(a);
            }
        },

        allDt: function allDt(a) {
            var b = '';
            var c = a.reduce(function (a, c) {
                var d = [].concat(_toConsumableArray(c)),
                    e = d[0],
                    f = d[1],
                    g = d[2],
                    h = d[3];

                var i = $$.dtComp(e, f, g);

                if (!i) {
                    b += h + '\n';
                    $$.setElement(e, '');
                }
                return a && i;
            }, true);

            if (!c) {
                alert(b);
            }
            return c;
        },

        isAtMostHoursAfter: function isAtMostHoursAfter(a, b, c, d) {
            a = _dtFieldToDate(a);
            c = _dtFieldToDate(c);
            var e = (c - a) / 60 / 60 / 1000;

            if (e > b) {
                alert(d);
                $$.setElement(a, '');
            }
        },

        eraseOnDisable: function eraseOnDisable(currEl, eraseList) {
            eraseList = _box(eraseList);
            eraseList.map(function (el) {
                if (_tryCatch(eval($$.getXMLAttribute(el, 'disable_rule_code')))) {
                    _tryCatch(setFormElement(el, ''));
                    $('#' + el + '_prompt').val('');
                }
            });
        },

        getFormElement: function (a) {
            function b() {
                return a.apply(this, arguments);
            }

            b.toString = function () {
                return a.toString();
            };

            return b;
        }(function (a) {
            return getFormElement(a).replace(/[{}]/g, '');
        }),

        copyEvents: function copyEvents(a, b, c) {
            c = _box(c);
            c.forEach(function (c) {
                var e = a[c];
                if (e) {
                    b[c] = function () {
                        e.call(this);
                    };
                }
            });
        },

        syncDtTmEvents: function syncDtTmEvents(a) {
            $$.copyEvents(document.getElementById(a), document.getElementById('time_' + a), ['onchange', 'onblur']);
        }

    };

    return $$;
})(window.parent, document);