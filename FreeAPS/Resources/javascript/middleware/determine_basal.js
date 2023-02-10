<<<<<<< HEAD
function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalprofile, tdd, tdd_averages) {
    // modify anything
    // return any reason what has changed.
    return "Nothing changed";
=======
function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pump_history, preferences, basalProfile, tdd, tdd_daily, tdd_avg) {

    var reasonAutoISF = "nothing done";

    if (profile.use_autoisf) {
        profile.autosens_max = 1;
        profile.autosens_min = 1;
        reasonAutoISF = "autosens disabled as autoISF is turned on";
    }

    return reasonAutoISF
>>>>>>> bnb_r
}
