function _where(qry) {
    qry = qry.replace(/{{/g, "\\\'\\\'\' + {{").replace(/}}/g, " + '\\\'\\\' {{")
        .replace(/{#/g, "\' + {{").replace(/#}/g, " + ' {{").split('{{');

    console.log(qry);
    return "\'" + qry.reduce((acc, val) => acc + val, '') + "\'";
}


function hasActiveEnrollment(peopleId, programId, blob) {
    var blah = eval("\'program_info_id = \\\'\\\'\' + programId + \'\\\'\\\'\'");
    console.log(blah);

    // var cond = _where('program_info_id = {{programId}}'); //?
    // var cond = eval(_where('program_info_id = {@fieldName@}')); //?
    var cond = eval(_where('program_info_id = {#programId#} AND test_id = {{blob}}')); //?
    console.log(cond);
    // var has_enrollment = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
    // var end_date = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

    // return has_enrollment && !end_date;
}



hasActiveEnrollment('tpeople', '1234', 'blob')
// _where('blah') //?