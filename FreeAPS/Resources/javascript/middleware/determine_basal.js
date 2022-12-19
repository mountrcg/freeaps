function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pump_history, preferences, basalProfile, tdd, tdd_daily, tdd_avg) {

    //disable SMBs at night
    var nightlySMBswitch = 0;
    var reasonSMBswitch = "nothing done";
    
    const d = new Date();
    let currentHour = d.getHours();

    // Turn SMBs off at night
    if (nightlySMBswitch == 1) {
        if (currentHour >= 0 && currentHour <= 7) {
            profile.enableSMB_always = false;
            profile.enableUAM = false;
            reasonSMBswitch = "SMBs disabled due to nighttime " + currentHour + ":00";
        } else {
            profile.enableSMB_always = true;
            profile.enableUAM = true;
            reasonSMBswitch = "SMBs enabled due to daytime " + currentHour + ":00";
        }
    }
    // end function and supply log output
    return reasonSMBswitch
}
