
function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalProfile) {
    //enable SMB at night with High Targets and disable after 6am
     var nightlySMBHT = 1 ;

    // Turn SMB`s with High targets on during nights
    function hourInt(base_timeStamp) {
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
        }
        let hour = addZero(base_timeStamp.getHours());
        return hour;
    }

    if (nightlySMBHT == 1) {
        if (hourInt >= 0 && hours <= 6) {
            profile.allowSMB_with_high_temptarget = true;
            reasonSMB = "SMB with HighTarget enabled due to nighttime. "
            }else{
                profile.allowSMB_with_high_temptarget = false
                reasonSMB = "SMB with HighTarget disabled due to daytime. "
            }
        }

    // Turn SMBs off at night
    if (SMBoff == 1) {
        if (currentHour >= 0 && currentHour <= 7) {
            profile.enableSMB_always = false;
            profile.enableUAM = false;
            reasonSMBswitch = "SMBs disabled due to nighttime " + currentHour + ":00."
        }else{
            profile.enableSMB_always = true;
            profile.enableUAM = true;
            reasonSMBswitch = "SMBs enabled due to daytime " + currentHour + ":00."
        }
    }
    if (profile.temptargetSet && profile.min_bg > 109 && exerciseSetting == true) {
        profile.use_autoisf = false;
        reasonSports = "autoISF off due to Exercise Target. Current min target: " + currentMinTarget + "! ";
    }

    return `${reasonSMB} ${reasonSports}`
}
