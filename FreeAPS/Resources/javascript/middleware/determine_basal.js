function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalprofile) {
    
    var reason = "nothing done";
    var reasonAutoISF = "";
    
    const d = new Date();
    let currentHour = d.getHours();
    // disable autosens if autoISF is running
    if (profile.use_autoisf) {
        profile.autosens_max = 1;
        profile.autosens_min = 1;
        reasonAutoISF = "autosens disabled as autoISF is turned on. ";
        reason = "";
    }
    
    reason = reason + reasonAutoISF;

    return reason
}

