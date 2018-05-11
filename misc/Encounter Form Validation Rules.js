// *** Actual Date
// Equal or Greater than {udf_datetimearrivedined_TA}
// OnLoad
setTimeout(function () {
    var fieldName = 'actual_date';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('actual_date', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED');
        })
}, 50);

// OnChange
$$.dateIsAfter('actual_date', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED');



// *** Group 2
// Was this a RAP...
// [onchange]
$$.eraseOnDisable('udf_rapintervention_TA', 'udf_whodidrap_TA');


// Was a Doc to Doc...
// [onchange]
$$.eraseOnDisable('udf_docperformed_TA', 'udf_docinitiaed_TA');


// *** Group 3
// Is Client Under 21?
// [onchange]
$$.eraseOnDisable('udf_under21_TA', ['udf_iccinvolved_TA', 'udf_familypartnerintervention_TA', 'udf_madirectunits_TA', 'udf_macollateralunits_TA']);

// Is ICC Involved...
// [onchange]
$$.eraseOnDisable('udf_iccinvolved_TA', 'udf_wasicccontacted_TA');

// Was ICC Contacted...
// [onchange]
$$.eraseOnDisable('udf_wasicccontacted_TA', ['udf_safetypanreviewed_TA', 'udf_wassafetyplancompleted_TA']);

// Was ESP Peer or FP...
// [onchange]
$$.eraseOnDisable('udf_familypartnerintervention_TA', ['udf_whointitiatedfampartinter_TA', 'udf_badirectunits_TA', 'udf_bacollateralunits_TA']);


// *** Group 4
// Primary Language
// [onchange]
$$.eraseOnDisable('udf_primarylanguage_TA', 'udf_otherlanguage_TA');


// *** Group 5
// Intervention Location
// [onchange]
$$.eraseOnDisable('udf_interventionlocation_TA', 'udf_nameofed_TA');

// Who Directeed to ED (from Eval)
// [onchange]
$$.eraseOnDisable('udf_whodirectedtoed_TA', 'udf_directedbysection12_TA');


// *** Group 6
// Is there any known State involvment
// + IF {yes}
// + THEN at least 1 of(DMH, DYS, DDS, DCF) has to be equal to { yes }
// + ELSE set (DMH, DYS, DDS, DCF) to {no}


// *** Group 7
// Primary Funding Source
// [onchange]
$$.eraseOnDisable('udf_primaryfundingsource_TA', ['udf_commercialinsname_TA', 'udf_benefitrequeststatus_TA']);


// *** Group 9
// Medical Clearance Requestedg
// [onchange]
$$.eraseOnDisable('udf_medclearancerequeted_TA', 'udf_whorequestedmedclear_TA');

// Was Medical Clearance Provided
// [onchange]
$$.eraseOnDisable('udf_medicalclearanceprovided_TA', 'udf_whoprovidedmedclearance_TA');


// *** Group 10
// Final Disposition
// [onchange]
$$.eraseOnDisable('udf_finaldisposition_TA', 'udf_inpatientdispo_TA');


// *** Group 11
// Date/Time of Request
// OnLoad
setTimeout(function () {
    $$.syncDtTmEvents('udf_datetimeofrequest_TA')
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimeofrequest_TA', 'actual_date', 'Date/Time of Request must be after Actual Date');


// *** Group 12
// Date/Time of Readiness
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimeofreadiness_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimeofrequest_TA', 'Date/Time Readiness must be after Date/Time of Request');


// *** Group 13
// Date/Time Intervention Began
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimeinterventinbegan_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimeofreadiness_TA', 'Date/Time Intervention Began must be after Date/Time of Readiness');


// *** Group 14
// Date/Time Intervention Ended
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimeinterventionended_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Intervention Ended must be after Date/Time Intervention Began');


// *** Group 15
// Date/Time Bed Search Began
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimebedsearchbegan_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Bed Search Began must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimebedsearchbegan_TA');


// *** Group 16
// Date/Time Placement Secured
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimeplacementsecured_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimebedsearchbegan_TA', 'Date/Time Placement Secured must be after Date/Time Bed Search Began');
$$.setRequiredIfEntered('udf_datetimeplacementsecured_TA');


// *** Group 17
// Date/Time Placed for Consult
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimecallplacedforconsult_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Call Placed for Consult must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimecallplacedforconsult_TA');


// *** Group 18
// Date/Time Consult Began
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_datetimesonsultbegan_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimecallplacedforconsult_TA', 'Date/Time Consult Began must be after Date/Time Call Placed for Consult');
$$.setRequiredIfEntered('udf_datetimesonsultbegan_TA');


// *** Group 19
// Date/Time Emergency Psychopharm
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_dateforemrgencypschopharm_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_dateforemrgencypschopharm_TA');


// *** Group 20
// Date/Time Emergency Psychopharm Began
// OnLoad
setTimeout(function () {
    var fieldName = 'udf_dateemergencypsychopharmgegan_TA';
    $('#time_' + fieldName).change($('#' + fieldName).attr('change'))
}, 50);

// OnChange
$$.dateIsAfter('udf_dateemergencypsychopharmgegan_TA', 'udf_dateforemrgencypschopharm_TA', 'Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm');
$$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');























// Group - 11
// udf_datetimeofrequest_TA
// Equal or Greater than {actual_date}
$$.dateIsAfter('udf_datetimeofrequest_TA', 'actual_date', 'Date/Time of Request must be after Actual Date');
$$.setRequiredIfEntered('udf_datetimeofrequest_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeofrequest_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeofrequest_TA', 'actual_date', 'Date/Time of Request must be after Actual Date');
        })
}, 50);




// Group - 12
// udf_datetimeofreadiness_TA
// Equal or Greater than 11
$$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimeofrequest_TA', 'Date/Time Readiness must be after Date/Time of Request');
$$.setRequiredIfEntered('udf_datetimeofreadiness_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeofreadiness_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimeofrequest_TA', 'Date/Time Readiness must be after Date/Time of Request');
        })
}, 50);




// Group - 13
// udf_datetimeinterventinbegan_TA
// Equal or Greater than 12
// At most 24h after 12
$$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimeofreadiness_TA', 'Date/Time Intervention Began must be after Date/Time of Readiness');
$$.setRequiredIfEntered('udf_datetimeinterventinbegan_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeinterventinbegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimeofreadiness_TA', 'Date/Time Intervention Began must be after Date/Time of Readiness');
        })
}, 50);




// Group - 14
// udf_datetimeinterventionended_TA
// Equal or Greater than 13
// At most 14dd after 13
$$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Intervention Ended must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimeinterventionended_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeinterventionended_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Intervention Ended must be after Date/Time Intervention Began');
        })
}, 50);




// Group - 15
// udf_datetimebedsearchbegan_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Bed Search Began must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimebedsearchbegan_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimebedsearchbegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Bed Search Began must be after Date/Time Intervention Began');
        })
}, 50);




// Group - 16
// udf_datetimeplacementsecured_TA
// Equal or Greater than 15
// At most 14dd after 15
$$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimebedsearchbegan_TA', 'Date/Time Placement Secured must be after Date/Time Bed Search Began');
$$.setRequiredIfEntered('udf_datetimeplacementsecured_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeplacementsecured_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimebedsearchbegan_TA', 'Date/Time Placement Secured must be after Date/Time Bed Search Began');
            $$.setRequiredIfEntered('udf_datetimeplacementsecured_TA');
        })
}, 50);




// Group - 17
// udf_datetimecallplacedforconsult_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Call Placed for Consult must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimecallplacedforconsult_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimecallplacedforconsult_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Call Placed for Consult must be after Date/Time Intervention Began');
            $$.setRequiredIfEntered('udf_datetimecallplacedforconsult_TA');
        })
}, 50);




// Group - 18
// udf_datetimesonsultbegan_TA
// Equal or Greater than 17
// At most 12h after 17
$$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimecallplacedforconsult_TA', 'Date/Time Consult Began must be after Date/Time Call Placed for Consult');
$$.setRequiredIfEntered('udf_datetimesonsultbegan_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimesonsultbegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimecallplacedforconsult_TA', 'Date/Time Consult Began must be after Date/Time Call Placed for Consult');
            $$.setRequiredIfEntered('udf_datetimesonsultbegan_TA');
        })
}, 50);




// Group - 19
// udf_dateforemrgencypschopharm_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_dateforemrgencypschopharm_TA');

setTimeout(function () {
    var fieldName = 'udf_dateforemrgencypschopharm_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began');
            $$.setRequiredIfEntered('udf_dateforemrgencypschopharm_TA');
        })
}, 50);




// Group - 20
// udf_dateemergencypsychopharmgegan_TA
// Equal or Greater than 19
// At most 12h after 19
$$.dateIsAfter('udf_dateemergencypsychopharmgegan_TA', 'udf_dateforemrgencypschopharm_TA', 'Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm');
$$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');

setTimeout(function () {
    var fieldName = 'udf_dateemergencypsychopharmgegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_dateemergencypsychopharmgegan_TA', 'udf_dateforemrgencypschopharm_TA', 'Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm');
            $$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');
        })
}, 50);




// udf_datetimefinaldisposecured_TA
// Equal or Greater than all other Dates
// At most 30dd after 13