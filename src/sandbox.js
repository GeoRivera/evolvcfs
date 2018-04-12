// Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum\PCI\VEN_8086&DEV_9D03&SUBSYS_073D1028&REV_21\3&11583659&0&B8\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties

(function () {
    const _toDate = (x) => new Date(x);

    const _dtFieldToDate = (x) => Object.prototype.toString.call(x) === '[object String]' ? _toDate($$.getElement(x)) : x;


    $$ = {
        dtComp: (dt1, comp, dt2) => {
            dt1 = _dtFieldToDate(dt1);
            dt2 = _dtFieldToDate(dt2);
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
        },

        dateIsAfter: (dt1, dt2, errMsg) => {
            if (!$$.dtComp(dt1, 'after', dt2)) {
                alert(errMsg);
                $$.setElement(dt1, '');
            }
        },
        dateIsBefore: (dt1, dt2, errMsg) => {
            if (!$$.dtComp(dt1, 'before', dt2)) {
                alert(errMsg);
                $$.setElement(dt1, '');
            }
        },

        // valiDate: () => true,
        setRequiredIfEntered: () => true

    }
    return $$
}())

var d1 = new Date("4/11/2018 9:00");
var d2 = new Date("4/11/2018 20:00");


// var res = $$.dtComp(d1, '<', d2);
// var res = $$.dateIsAfter(d1, d2, 'Oops');
var res = $$.dateIsBefore(d1, d2, 'Oops');
// $$.isAtMostHoursAfter('Oh no!', d1, 11, d2);











/* ****************************************************************************
    Validation Rules
**************************************************************************** */
// 5 udf_datetimearrivedined_TA
// Earliest Date/Time in the Form


// 1 actual_date
// Equal or Greater than {udf_datetimearrivedined_TA}
$$.valiDate('Actual Date must be after Date/Time Arrived in ED.', 'udf_datetimearrivedined_TA', '>=', 'actual_date');

// 11 udf_datetimeofrequest_TA
// Equal or Greater than {actual_date}
$$.valiDate('Date/Time of Request must be after Actual Date.', 'actual_date', '>=', 'udf_datetimeofrequest_TA');

// 12 udf_datetimeofreadiness_TA
// Equal or Greater than 11
$$.valiDate('Date/Time Readiness must be after Date/Time of Request.', 'udf_datetimeofrequest_TA', '>=', 'udf_datetimeofreadiness_TA');
$$.valiDate('Date/Time Readiness must be after Date/Time of Request.', 'udf_datetimeofrequest_TA', '>=', 'udf_datetimeofreadiness_TA');

// 13 udf_datetimeinterventinbegan_TA
// Equal or Greater than 12
// At most 24h after 12
$$.valiDate('Date/Time Intervention Began must be after Date/Time of Readiness.', 'udf_datetimeofreadiness_TA', '>=', 'udf_datetimeinterventinbegan_TA');

// 14 udf_datetimeinterventionended_TA
// Equal or Greater than 13
// At most 14dd after 13
$$.valiDate('Date/Time Intervention Ended must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimeinterventionended_TA');

// 15 udf_datetimebedsearchbegan_TA
// Equal or Greater than 13
$$.valiDate('Date/Time Bed Search Began must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimebedsearchbegan_TA');

// 16 udf_datetimeplacementsecured_TA
// Equal or Greater than 15
// At most 14dd after 15
$$.valiDate('Date/Time Placement Secured must be after Date/Time Bed Search Began.', 'udf_datetimebedsearchbegan_TA', '>=', 'udf_datetimeplacementsecured_TA');

// 17 udf_datetimecallplacedforconsult_TA
// Equal or Greater than 13
$$.valiDate('Date/Time Call Placed for Consult must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimecallplacedforconsult_TA');

// 18 udf_datetimesonsultbegan_TA
// Equal or Greater than 17
// At most 12h after 17
$$.valiDate('Date/Time Consult Began must be after Date/Time Call Placed for Consult.', 'udf_datetimecallplacedforconsult_TA', '>=', 'udf_datetimecallplacedforconsult_TA');

// 19 udf_dateforemrgencypschopharm_TA
// Equal or Greater than 13
$$.valiDate('Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began.', 'udf_datetimeinterventinbegan_TA', '>=', 'udf_dateforemrgencypschopharm_TA');

// 20 udf_dateemergencypsychopharmgegan_TA
// Equal or Greater than 19
// At most 12h after 19
$$.valiDate('Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm.', 'udf_dateforemrgencypschopharm_TA', '>=', 'udf_dateemergencypsychopharmgegan_TA');
$$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');


// udf_datetimefinaldisposecured_TA
// Equal or Greater than all other Dates
// At most 30dd after 13