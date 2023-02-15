//для enact/smb-suggested.json параметры: monitor/iob.json monitor/temp_basal.json monitor/glucose.json settings/profile.json settings/autosens.json --meal monitor/meal.json --microbolus --reservoir monitor/reservoir.json

function generate(iob, currenttemp, glucose, profile, autosens = null, meal = null, microbolusAllowed = false, reservoir = null, clock = new Date(), pump_history, preferences, basalProfile, tdd, tdd_daily, tdd_avg) {

    try {
        //console.log("Pumphistory: %o", pump_history);
        var middlewareReason = middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pump_history, preferences, basalProfile, tdd, tdd_daily, tdd_avg);
        console.log("Middleware reason: " + (middlewareReason || "Nothing changed"));
    } catch (error) {
        console.log("Invalid middleware: " + error);
    };

    var glucose_status = freeaps_glucoseGetLast(glucose);
    var autosens_data = null;

    if (autosens) {
        autosens_data = autosens;
    }
    

    var reservoir_data = null;
    if (reservoir) {
        reservoir_data = reservoir;
    }

    var meal_data = {};
    if (meal) {
        meal_data = meal;
    }
    
    var pumphistory = {};
    if (pump_history) {
        pumphistory = pump_history;
    }
    
    var basalprofile = {};
    if (basalProfile) {
        basalprofile = basalProfile;
    }
    
    var tdd_ = {};
    if (tdd) {
        tdd_ = tdd;
    }
    
    var tdd_daily_ = {};
    if (tdd_daily) {
        tdd_daily_ = tdd_daily;
    }
    
    var tdd_avg_ = {};
    if (tdd_avg) {
        tdd_avg_ = tdd_avg;
    }
    
    return freeaps_determineBasal(glucose_status, currenttemp, iob, profile, autosens_data, meal_data, freeaps_basalSetTemp, microbolusAllowed, reservoir_data, clock, pumphistory, preferences, basalprofile, tdd_, tdd_daily_, tdd_avg_);
}
