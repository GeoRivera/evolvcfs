(function () {
    $$ = {
        dtComp: (dt1, comp, dt2) => {
            // dt1 = Object.prototype.toString.call(dt1) === '[object String]' ? _toDate($$.getElement(dt1)) : dt1;
            // dt2 = Object.prototype.toString.call(dt2) === '[object String]' ? _toDate($$.getElement(dt2)) : dt2;
            switch (comp) {
                case '=':
                    return dt1.toString() === dt2.toString()
                case 'equal':
                    return dt1.toString() === dt2.toString()
                case '!=':
                    return dt1.toString() !== dt2.toString()
                case 'different':
                    return dt1.toString() !== dt2.toString()
                case '>':
                    return dt1 > dt2
                case 'after':
                    return dt1 > dt2
                case '>=':
                    return dt1 >= dt2
                case '<':
                    return dt1 < dt2
                case 'before':
                    return dt1 < dt2
                case '<=':
                    return dt1 <= dt2

                default:
                    return false;
            }
        }
    }
    return $$
}())

// 11 udf_datetimeofrequest_TA


// 12 udf_datetimeofreadiness_TA
// Equal or Greater than 11
$$.valiDate('Date/Time Readiness must be after Date/Time of Request.', 'udf_datetimeofrequest_TA', '>=', 'udf_datetimeofreadiness_TA');

// 13 udf_datetimeinterventinbegan_TA
$$.valiDate('Date/Time Intervention Began must be after Date/Time of Readiness.', 'udf_datetimeofreadiness_TA', '>=', 'udf_datetimeinterventinbegan_TA');

// 14 udf_datetimeinterventionended_TA
$$.valiDate('Date/Time Intervention Ended must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimeinterventionended_TA');

// 15 udf_datetimebedsearchbegan_TA
$$.valiDate('Date/Time Bed Search Began must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimebedsearchbegan_TA');

// 16 udf_datetimeplacementsecured_TA
$$.valiDate('Date/Time Placement Secured must be after Date/Time Bed Search Began.', 'udf_datetimebedsearchbegan_TA', '>=', 'udf_datetimeplacementsecured_TA');

// 17 udf_datetimecallplacedforconsult_TA
$$.valiDate('Date/Time Call Placed for Consult must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimecallplacedforconsult_TA');

// 18 udf_datetimesonsultbegan_TA
$$.valiDate('Date/Time Consult Began must be after Date/Time Call Placed for Consult.', 'udf_datetimecallplacedforconsult_TA', '>=', 'udf_datetimecallplacedforconsult_TA');

// 19 udf_dateforemrgencypschopharm_TA
$$.valiDate('Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_dateforemrgencypschopharm_TA');

// 20 udf_dateemergencypsychopharmgegan_TA
$$.valiDate('Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm.', 'udf_dateforemrgencypschopharm_TA', '>=', 'udf_dateemergencypsychopharmgegan_TA');





var cfs_fieldName = 'udf_datetimecallplacedforconsult_TA'
cfs_makeRequired([cfs_fieldName], (getFormElement(cfs_fieldName) !== '' ? 1 : 0))

function cfs_makeRequired(xs, required) {
    required = (required ? 'true' : 'false')
    for (var cfs_mRi = 0; cfs_mRi < xs.length; cfs_mRi++) {
        getNodeFromXML(formXML, xs[cfs_mRi]).setAttribute('is_required', required);
    }
}