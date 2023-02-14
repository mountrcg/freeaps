function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pump_history, preferences, basalProfile, tdd, tdd_daily, tdd_avg) {

   // number of minutes that Stat updates shall be done
    const nightlyChange = 0;
    var nightlyUpdate = 360
    
    var reason = "nothing done";
    var reasonAutoISF = "";
    var reasonStat = "";
    
    const d = new Date();
    let currentHour = d.getHours();
    // disable autosens if autoISF is running
    if (profile.use_autoisf) {
        profile.autosens_max = 1;
        profile.autosens_min = 1;
        reasonAutoISF = "autosens disabled as autoISF is turned on. ";
        reason = "";
    }
    
    // set nightly Stats update intervall
    if (nightlyChange == 1) {
        if (currentHour >= 0 && currentHour <= 6) {
            profile.updateInterval = 360;
            reasonStat = "Stats update interval " + nightlyUpdate + "m. "
            reason = "";
        }
    }
    
    reason = reason + reasonAutoISF + reasonStat;

    return reason
}

