"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (Global, document) {
    /* ----------------------------------------------------------------------------
         Evolv's formfunction.js mapping
    ---------------------------------------------------------------------------- */
    // const _getFormElement = _tryCatch(getFormElement);
    // const _getElementFromXML = _tryCatch(getElementFromXML);
    // const _getDataValue = _tryCatch(getDataValue);
    // const _transformXML = _tryCatch(transformXML);
    // const _IsDirty = _tryCatch(IsDirty);
    // const _formState = _tryCatch(formState);
    // const _setFormElement = _tryCatch(setFormElement);
    // const _formElementExists = _tryCatch(formElementExists);


    /* ----------------------------------------------------------------------------
         General utils
    ---------------------------------------------------------------------------- */
    var _curry = function _curry(fn) {
        var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return function (a) {
                return a.length === fn.length ? fn.apply(undefined, _toConsumableArray(a)) : _curry(fn, a);
            }([].concat(_toConsumableArray(arr), args));
        };
    };

    var _compose = function _compose() {
        for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            fns[_key2] = arguments[_key2];
        }

        return fns.reduce(function (f, g) {
            return function () {
                return f(g.apply(undefined, arguments));
            };
        });
    };

    var _pipe = function _pipe() {
        for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            fns[_key3] = arguments[_key3];
        }

        return fns.reduce(function (f, g) {
            return function () {
                return g(f.apply(undefined, arguments));
            };
        });
    };

    var _not = function _not(fn) {
        return function () {
            return !fn.apply(undefined, arguments);
        };
    };

    var _flip = function _flip(fn) {
        return function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return fn.apply(undefined, _toConsumableArray(args.reverse()));
        };
    };

    var _all = function _all() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return args.reduce(function (acc, curr) {
            return !!(acc && curr);
        }, true);
    };

    var _any = function _any() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return args.reduce(function (acc, curr) {
            return !!(acc || curr);
        }, false);
    };

    var _box = function _box(x) {
        return Array.isArray(x) ? x : [x];
    };

    /* ----------------------------------------------------------------------------
        Misc
    ---------------------------------------------------------------------------- */
    var _toDate = function _toDate(x) {
        return new Date(x);
    };

    var _dtFieldToDate = function _dtFieldToDate(x) {
        return Object.prototype.toString.call(x) === '[object String]' ? _toDate($$.getElement(x)) : x;
    };

    /**
     * Allows the use Handlebars notation to encapsulate variable names for Evolv's DB like functions (getDataValue, setDataFromValue etc.).
     * @example eval( _where('program_info_id = {{programId}}') );
     *
     * @param {any} qry
     * @returns {string}
     */
    var _where = function _where(qry) {
        var res = qry.replace(/{{/g, "\\\'\\\'\' + {{").replace(/}}/g, " + '\\\'\\\' {{").replace(/{#/g, "\' + {{").replace(/#}/g, " + ' {{").split('{{');
        return "\'" + res.reduce(function (acc, val) {
            return acc + val;
        }, '') + "\'";
    };
    /* ----------------------------------------------------------------------------
        Validation
    ---------------------------------------------------------------------------- */
    var _exists = function _exists(x) {
        return x !== undefined && x !== null || !!x;
    };

    var _fromNullable = function _fromNullable(x) {
        return x === undefined || !x;
    };

    var _isDateTimeField = function _isDateTimeField(fieldName) {
        return $('#' + fieldName).attr('type_code') === 'DT' || $('#' + fieldName).attr('type_code') === 'D';
    };

    // TODO - Replace with Left/Right/Either
    var _tryCatch = function _tryCatch(fn) {
        try {
            return fn;
        } catch (e) {}
    };

    var _isBlankDtTm = function _isBlankDtTm(fieldName) {
        return getFormElement(fieldName) === '' && getFormElement('time_' + fieldName) === '';
    };

    var _isBlankDtOrTm = function _isBlankDtOrTm(fieldName) {
        return getFormElement(fieldName) === '' || getFormElement('time_' + fieldName) === '';
    };
    var _hasDtOrTm = _not(_isBlankDtTm);

    var _isBlank = function _isBlank(fieldName) {
        return _isDateTimeField(fieldName) ? _isBlankDtTm(fieldName) : getFormElement(fieldName) === '';
    };
    var _hasValue = function _hasValue(fieldName) {
        return _isDateTimeField(fieldName) ? _not(_isBlankDtOrTm)(fieldName) : _not(_isBlank)(fieldName);
    };

    var _getCurrValue = function _getCurrValue(fieldName) {
        var currValue = $$.getElement(fieldName);

        if (_isDateTimeField(fieldName) && currValue.length <= 16) {
            // If datetime is incomplete, builds datetime from date and time fields
            currValue = $('#' + fieldName).val() + ' ' + $('#time_' + fieldName).val();
        }

        return currValue;
    };

    var _wasModified = function _wasModified(fieldName) {
        var oldValue = $('#' + fieldName).attr('old_value');
        var currValue = _getCurrValue(fieldName);

        if (!_exists(oldValue)) {
            $('#' + fieldName).attr('old_value', '');
        }

        if (_hasValue(fieldName)) {
            return _exists(oldValue) && oldValue !== currValue;
        }
        return false;
    };

    var _keepValue = function _keepValue(fieldName) {
        var currValue = _getCurrValue(fieldName);
        if (_hasValue(fieldName)) {
            $('#' + fieldName).attr('old_value', currValue);
        }
    };

    var _valueChanged = function _valueChanged(fieldName) {
        return _wasModified(fieldName) && _fromNullable(_keepValue(fieldName));
    };

    /* ----------------------------------------------------------------------------
        Interfaces
    ---------------------------------------------------------------------------- */

    Global.$$ = {
        hasActiveEnrollment: function hasActiveEnrollment(peopleId, programId) {
            var cond = eval(_where('program_info_id = {{programId}}'));
            var has_enrollment = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
            var end_date = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

            return has_enrollment && !end_date;
        },

        setXMLAttribute: function setXMLAttribute(xs, attr, val) {
            xs = _box(xs).slice();

            if (typeof val === 'number') {
                val = val ? 'true' : 'false';
            }
            for (var i = 0; i < xs.length; i++) {
                _tryCatch($$.getNodeFromXML(xs[i], formXML).setAttribute(attr, val));
            }
            refreshView(xs[0]);
        },

        getXMLAttribute: function getXMLAttribute(fieldName, attr) {
            return _tryCatch($$.getNodeFromXML(fieldName, formXML).getAttribute(attr));
        },

        setRequired: function setRequired(xs, bool) {
            xs = _box(xs).slice();
            var fn = bool ? makeRequired : makeUnRequired;
            xs.map(function (x) {
                return _tryCatch(fn({
                    id: x
                }));
            });
        },

        setRequiredIfEntered: function setRequiredIfEntered(fieldName) {
            $$.setRequired(fieldName, !_isBlank(fieldName));
            if (_isDateTimeField(fieldName)) {
                $('#time_' + fieldName).prev().attr('style', $('#caption_' + fieldName).attr('style'));
            }
        },

        setElement: function setElement(el, val) {
            if (formElementExists(el)) {
                var xmlNode = $$.getNodeFromXML(el, formXML);
                var notModifiable = xmlNode.getAttribute('is_modifiable') === 'true' ? true : false;

                xmlNode.setAttribute('is_modifiable', 'true');

                // Sets DateTime type fields appropriately
                if (_isDateTimeField(el)) {
                    var dtTime = val.split(/\s/i);
                    var date = dtTime[0];
                    var time = (dtTime[1] ? dtTime[1] : '') + (dtTime[2] ? dtTime[2] : '');
                    _tryCatch(setFormElement(el, date));
                    _tryCatch(setFormElement('time_' + el, time));
                    notModifiable && $('#time_' + el).attr('disabled', !notModifiable);
                } else {
                    _tryCatch(setFormElement(el, val));
                }

                notModifiable && $('#' + el).attr('disabled', !notModifiable);
            }
        },

        getElement: function getElement(el, src) {
            return _fromNullable(src) ? getElementFromXML(formXML, el) : getFormElement(el);
        },

        getClientAge: function getClientAge(peopleId) {
            return getDataValue('client_personal_view', 'people_id', peopleId, 'age');
        },

        getNodeFromXML: function getNodeFromXML(el, obj) {
            obj = _fromNullable(obj) ? formXML : obj;
            var res = null;

            if (el.charAt(0) !== '#') {
                res = obj.selectSingleNode("form_object/form_group/form_item[@column_name='" + el + "']") || obj.selectSingleNode("form_group/form_item[@column_name='" + el + "']");
            } else {
                res = obj.selectSingleNode("form_object/form_group/form_item[@caption='" + el.slice(1) + "']") || obj.selectSingleNode("form_group/form_item[@caption='" + el.slice(1) + "']");
            }
            return res;
        },

        refreshView: function refreshView(obj) {
            xslTarget.innerHTML = transformXML(formXSL.XMLDocument.xml, formXML.xml);
            IsDirty() && formState(obj.form, true);
        },

        showErrMsg: function showErrMsg(fieldName, errMsg) {
            var elObj = $('#' + fieldName)[0];
            var cssErr = {
                margin: '10px 0px',
                padding: '10px',
                float: 'left',
                width: '50%',
                color: '#D8000C',
                backgroundColor: '#FFD2D2',
                fontFamily: 'arial',
                fontSize: '.8em',
                verticalAlign: 'middle'
            };
            $$.hideErrMsg(fieldName);

            errMsg = '❌ ' + errMsg;

            $(elObj).parent().parent().parent().prepend('<tr id="' + elObj.id + '_err_row"><td width="120"></td><td rowSpan="1" colSpan="1"><div id=' + elObj.id + '_err_msg >' + errMsg + '</div></td></tr>');
            $('#' + elObj.id + '_err_msg').css(cssErr);
        },

        hideErrMsg: function hideErrMsg(fieldName) {
            $('#' + fieldName + '_err_row').remove();
        },

        dtComp: function dtComp(dt1, comp, dt2) {
            dt1 = _dtFieldToDate(dt1);
            dt2 = _dtFieldToDate(dt2);
            switch (comp) {
                case '=':
                    return dt1.toString() === dt2.toString();
                case 'equal':
                    return dt1.toString() === dt2.toString();
                case '!=':
                    return dt1.toString() !== dt2.toString();
                case 'different':
                    return dt1.toString() !== dt2.toString();
                case '>':
                    return dt1 > dt2;
                case 'after':
                    return dt1 > dt2;
                case '>=':
                    return dt1 >= dt2;
                case '<':
                    return dt1 < dt2;
                case 'before':
                    return dt1 < dt2;
                case '<=':
                    return dt1 <= dt2;

                default:
                    return false;
            }
        },

        dateIsAfter: function dateIsAfter(dt1, dt2, errMsg) {
            if (_hasValue(dt1) && _valueChanged(dt1) && !$$.dtComp(dt1, 'after', dt2)) {
                $$.showErrMsg(dt1, errMsg);
                _hasValue(dt1) && $$.setElement(dt1, '');
            } else if (_hasValue(dt1) && $$.dtComp(dt1, 'after', dt2)) {
                $$.hideErrMsg(dt1);
            }
        },

        dateIsBefore: function dateIsBefore(dt1, dt2, errMsg) {
            if (_hasValue(dt1) && _valueChanged(dt1) && !$$.dtComp(dt1, 'before', dt2)) {
                $$.showErrMsg(dt1, errMsg);
                !_isBlankDtTm(dt1) && $$.setElement(dt1, '');
            } else if (!_isBlankDtTm(dt1)) {
                $$.hideErrMsg(dt1);
            }
        },

        allDt: function allDt(arr) {
            var errMsg = '';
            var passedAllChecks = arr.reduce(function (acc, xs) {
                var _ref = [].concat(_toConsumableArray(xs)),
                    dt1 = _ref[0],
                    comp = _ref[1],
                    dt2 = _ref[2],
                    msg = _ref[3];

                var chkCurrCondition = $$.dtComp(dt1, comp, dt2);
                // console.log(dt1, ' ', comp, ' ', dt2, ' :', chkCurrCondition);
                if (!chkCurrCondition) {
                    errMsg += msg + '\n';
                    $$.setElement(dt1, '');
                }
                return acc && chkCurrCondition;
            }, true);

            if (!passedAllChecks) {
                alert(errMsg);
            }
            return passedAllChecks;
        },

        isAtMostHoursAfter: function isAtMostHoursAfter(dt1, hours, dt2, errMsg) {
            dt1 = _dtFieldToDate(dt1);
            dt2 = _dtFieldToDate(dt2);
            var timeDiff = (dt2 - dt1) / 60 / 60 / 1000;

            if (timeDiff > hours) {
                alert(errMsg);
                $$.setElement(dt1, '');
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

        getFormElement: function (_getFormElement) {
            function getFormElement(_x2) {
                return _getFormElement.apply(this, arguments);
            }

            getFormElement.toString = function () {
                return _getFormElement.toString();
            };

            return getFormElement;
        }(function (el) {
            return getFormElement(el).replace(/[{}]/g, '');
        }),

        copyEvents: function copyEvents(fromEl, toEl, events) {
            events = _box(events);
            events.forEach(function (ev, i) {
                var func = fromEl[ev];
                if (func) {
                    toEl[ev] = function (evt) {
                        func.call(this);
                    };
                }
            });
        },

        syncDtTmEvents: function syncDtTmEvents(fieldName) {
            $$.copyEvents(document.getElementById(fieldName), document.getElementById('time_' + fieldName), ['onchange', 'onblur']);
        }

    };

    return $$;
})(window.parent, document);