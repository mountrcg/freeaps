
function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalProfile) {
    // if you want SMB with a high temp target at night (after heavy endurance exercise
    const nightlySMBHT = 0;
    var reasonSMBHT = "";
    //enable SMB at night with High Targets and disable after 7am
    var nightlySMBswitch = 0 ;
    const nightTarget = 99;
    const start = 23;
    const end = 7
    var reasonSMBoff = "nothing done";

    const d = new Date();
    let currentHour = d.getHours();

    // Turn SMBs off at night
    if (nightlySMBswitch == 1) {
        if (currentHour >= start && currentHour < end) {
            profile.min_bg = nightTarget;
            profile.max_bg = profile.min_bg;
            reasonSMBoff = "SMBs disabled due to nighttime " + currentHour + ":00";
        }
    }


    if (nightlySMBHT == 1) {
        if (hourInt >= 0 && hours <= 6) {
            profile.allowSMB_with_high_temptarget = true;
            reasonSMBHT = "SMB with HighTarget enabled due to nighttime. "
            }else{
                profile.allowSMB_with_high_temptarget = false
                reasonSMBHT = "SMB with HighTarget disabled due to daytime. "
            }
        }
    }

    return `${reasonSMBHT} ${reasonSMBoff}`
}
