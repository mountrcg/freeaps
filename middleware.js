
function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalProfile) {
    //enable SMB at night with High Targets and disable after 6am
     var nightlySMBHT = 0 ;
     var reasonSMB = "";
     var SMBoff = 0;
     var reasonSMBswitch = "";

    const d = new Date();
    let currentHour = d.getHours();

    // Turn SMB`s with High targets on during nights
    if (nightlySMBHT == 1) {
        if (currentHour >= 0 && currentHour <= 6) {
            profile.allowSMB_with_high_temptarget = true;
            reasonSMB = "SMB with HighTarget enabled due to nighttime " + currentHour + ":00."
            }else{
                profile.allowSMB_with_high_temptarget = false
                reasonSMB = "SMB with HighTarget disabled due to daytime " + currentHour + ":00."
            }
        }

    // Turn SMBs off at night
    if (SMBoff=1) {
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
    return `${reasonSMB} ${reasonSMBswitch}`
}
