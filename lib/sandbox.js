"use strict";

var _escExp = function _escExp(qry) {
    var res = '';
    qry = qry.replace(/{{/g, "''{{").replace(/}}/g, "{{''").replace(/{#/g, "{{").replace(/#}/g, "{{").split('{{');
    if (qry.length % 2 !== 0) qry[qry.length] = 'String.fromCharCode(32)';

    for (var i = 0; i < qry.length; i += 2) {
        res += qry[i] + eval(qry[i + 1]);
    }
    return res;
};

function tp(str) {
    programId = '987653';
    blah = 123;
    // var r = _escExp.call(this, 'program_info_id = {{programId}};')
    var r = _escExp('program_info_id = {{programId}} AND people_id = {#blah#} AND test = {{programId}}');
    // var r = _escExp('program_info_id = {{programId}}')
    console.log(r);
}

tp();