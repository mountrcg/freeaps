# FreeAPS X with autoISF & Dash support and TDD calculations and Statistics summary json

Ivan's tremendous effort with FreeAPS X - supplemented with an adapted oref1 algo that is based on Gerhards work with his German community, especialy Bernd who trials and tweaks all parameters for himself and documents his structured progress quite well. Gerhard's oref adation and lots of documents and simulation programs for Android can be found at: https://github.com/ga-zelle/autoISF The Team has created numerous very good documentations, that you must read before configuring autoISF, especially the [quick guide](https://github.com/ga-zelle/autoISF/blob/A3.0.0.1_ai2.2.6/autoISF2.2_Quick_Guide.pdf)

I just tweaked this oref to work with FAX and JonB helped a lot getting all prefs sorted in FAX. The whole algorithm can be found in my oref repo: 
* https://github.com/mountrcg/oref0/tree/dev_aisf_TDD with calculations of TDD in oref-code
* https://github.com/mountrcg/oref0/tree/dev-aisf_noTDD without TDD calcs
 
That will be more easy to review as the packeted js-files in FAX are not really readable. And I really suggest to look at the code.

You can discuss autoISF at [Discord](https://discord.gg/8v3E6PqF43)!

## Important updates

autoISF v 2.2.7 with some tweaks that will enter 2.2.8 soon. I have added [Jons](https://github.com/Jon-b-m) implementation of calculating TDD's and summarizing some statistics. DynISF is not included in this latest commit. 

AutoISF with TDD in pop-up and in legend (bottom right corner)

![view FAX-TDD](autoISF-regular.png) ![view watch-TDD](screenWatch_TDD.png)


## Java changes in oref for FAX
In order to minimize the js code from oref to use in FAX (if the need should arise) follow hese instructions by nuker:
#### Instructions edit js-files

Fork oref0.

Clone oref0 to your computer.

Change the code as you please in the folder lib, (for instance determine-basal.js).

Copy the ”webpack.config” file from FreeAPS X/scripts to your ”oref0” -folder (same folder where the ”lib” older is located).

In terminal cd into the same ”oref0” folder.

Install Node. Link for Mac OS pkg:  64-bit

Install web pack (stay in same directory as before in terminal):
npm install --save-dev webpack

Install webpack CLI: 
npm install -D webpack-cli

Run web pack command:
npx webpack


Open your oref0 folder in Finder. 
Open the ”dist” folder. This folder was created by Webpacker.
Copy the js file/s you changed.

Open your freeaps x folder in Finder.

Open ”FreeAPS/Resources” folder.
Open ”javascript/bundle” folder.

Replace the current js.file/s with the minimized files from the ”dist” folder.
Make sure the new files have exactly the same file name as the one you moved/deleted/replaced.


Build FreeAPS X again.

That’s it!


## Changes to FAX

There needed to be some changes to the UI. I tried to keep them minimal.
- show ISF as the key parameter in this oref adaption in the header near current BG
- move the Enacted popup a bit further down to review Header info simultaneously
- make space for this and the eventual BG up there as well, so COB and IOB are small icons
- show TDD 24hr rolling and from yesterday
- colors harmonized

![view FAX](screen-FAXaisf.png)

![view watch](screen-AppleWatch.png)

With the Icicle commit basals are upside down as on Nightscout, just revert that commit for standard FAX basals: https://github.com/mountrcg/freeaps/commit/1c887ce20da738d4dc6e874d9c7193d6b59d05f4

Same applies to the Watch face that also shows ISF.

## Settings

You will loose most of your previous settings in FAX, all settings with pre-defined defaults are set back to those. This is to make sure you run through all relevant oref settings. All autoISF settings are by default set to not enable any features beyond standard oref. If you want to use autoISF you have to touch all parameters and there is a whole bunch of it.

Autosens and autoISF both manipulate sensitivityRatios and ISF. It is currently setup that the stronger sensitivityRatios win. In order to not get duplicating effects or contradicting effects, it is suggested to switch Autosens off by setting `profile.autosens_max = 1` and `profile.autosens_min = 1`, which is an absolute must if no carbs are logged, running in UAM only mode.

If you enter carbs and still want to have Autosens running alongside, at least *Sensitivity Raises Target* and *Resistance Lowers Targets* should to be switched off.

## Known Issues

+ sometimes the now pretty populated enacted popup parts ways with it’s tags. Disappearing the popup and longpressing the loop circle 'till haptic feedback seems to unite popup with tags again.

![view Bug](tags_departed.png) ![view Resolved](tags_united.png)

## Sports & autoISF

When exercising and raising sensitivity via *High TT Raises Sensitivity* or *Excercise Mode* you have to switch off autoISF, as it could send you in the opposite direction. It is easiest accomplished via middleware, that automatically sets autoISF to off

``` js
function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
	const high_temptarget_raises_sensitivity = profile.exercise_mode || profile.high_temptarget_raises_sensitivity;
	var reasonSports = "nothing to do.";

	if (high_temptarget_raises_sensitivity && profile.temptargetSet && profile.min_bg > 110) {
		profile.use_autoisf = false;
		reasonSports = "autoISF off due to Exercise Target. ";
	}
	return reasonSports
}
```
However, this above is old and no middleware is needed anymore. Some changes have been made. In above mentioned scenario autoISF will now not adjust the ISF from the profile, but the ISF already adjusted by *High TT Raises Sensitivity* or *Excercise Mode*. SMB's are either disabled if you have set *allowSMB_with_high_temptarget* to false. You can also disable SMB by setting an odd TempTarget. For this to take effect enable the toggle *enableSMB_EvenOn_OddOff*
Also you can switch off autoISF completely if exercising by setting *autoISF_off_Sport* to true. Exercising means you have *High TT Raises Sensitivity* or *Excercise Mode* enabled and have set a High TempTarget.

![view Exercise1](autoISF-ExerciseToggle-ON.png) <- ![view ExerciseToggleON](ExerciseToggles.png)

![view Exercise2](autoISF-ExerciseToggle-Off.png) ![view Exercise3](autoISF-ExerciseToggle-Off_oddTT.png) <- ![view ExerciseToggleOFF](EatingSoon_Toggles.png)

## Eating Soon with higher SMB delivery Ratio

Here the status when EatingSoon target is active with the result that a higher SMB delivery ratio is choosen. The SMB Ratio settings are also shown.

![view EatingSoon](EatingSoon_SMBRatio.png)

![view EatingSoonSettings](EatingSoon_SMBRatioSettings.png) ![view EatingSoonToggles](EatingSoon_Toggles.png) 

## Middleware

Oh jesus you can do all sorts of things with it. Be careful it is very mighty to test or automate certain things. As a drawback it circumvents all safety measures of oref. If you calculate a sensitivityRatio of 10 it will be passed on to oref and be used resulting in pushing 10x the insulin you would normally require. I use to test middleware on the simulator in xcode as you can run loops/calcs anytime, there are no time restriction for long-pressing the loop circle. So great for testing all kind of things.

Here an example for a more complex middleware, in which you can switch on and off certain features.

``` js
function round(value, digits)
{
    if (! digits) { digits = 0; }
    var scale = Math.pow(10, digits);
    return Math.round(value * scale) / scale;
}

function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock) {
	//enable SMB at night with High Targets and disable after 6am
	var nightlySMBHT = true;

	//increase insulin output with raising BG
	var accelerateUAM = false;
	const limit1 = 160;
	const factor1 = 1.1;
	const limit2 = 190;
	const factor2 = 1.3;
	const limit3 = 220;
	const factor3 = 1.4;
	const IOBlimit = 6.5;

	//set a percentage profile
	var override = false;
	const overridevalue = 0.8;

	//do Spocks magic formula
	var spock = false;
	const TDD = 45;
	const minRatioLimit = profile.autosens_min;
	const maxRatioLimit = profile.autosens_max;

	//--------------------------------------------

    const hours = clock.getHours();
    const lastGlucose = glucose[0].sgv;
    const lastIOB = iob[0].iob;
    var reason1 = "No UAM acceleration. ";
    var reason2 = "No override. ";
	var reasonIOB = "IOB is in bounds";
    var reasonSMB = "Nightly SMB-Logic disabled. ";
	var reasonSpock = "Spock is off. ";
	var reasonSports  = "";
    var newRatio = autosens.ratio;
    var overrideRatio = newRatio;

	// Turn off AutoISF when using a exercise mode and a high target
	var high_temptarget_raises_sensitivity = profile.exercise_mode || profile.high_temptarget_raises_sensitivity;
	if (high_temptarget_raises_sensitivity && profile.temptargetSet && profile.min_bg > 110) {
		profile.use_autoisf = false;
		reasonSports = "autoISF off due to Exercise Target. ";
		spock = false;
		reasonSpock = "Spock's magic off due to High Target. ";
	}

	// Turn SMB`s with High targets on during nights
    if (nightlySMBHT=true) {
        if (hours >= 0 && hours <= 6) {
            profile.allowSMB_with_high_temptarget = true;
            reasonSMB = "SMB with HT enabled due to nighttime. "
            }else{
                profile.allowSMB_with_high_temptarget = false
                reasonSMB = "SMB with HT disabled due to daytime. "
            }
        }

	// increase ISF BG level related to boost UAM - not necessary with autoISF, just testing
    if (accelerateUAM == true && hours >= 6 && hours <= 23) {
        if (lastGlucose > limit3) {
            newRatio = autosens.ratio * factor3;
        }else{
            if (lastGlucose > limit2) {
                newRatio = autosens.ratio * factor2;
                }else{
                if (lastGlucose > limit1) {
                    newRatio = autosens.ratio * factor1;
                }
            }
          }
        autosens.ratio = newRatio;
        if (lastIOB > IOBlimit) {
            profile.enableSMB_always = false;
            reasonIOB = ", SMB disabled with IOB=" + lastIOB + ". ";
        }
        reason1 = "Ratio set to " + autosens.ratio + " as last glucose value is " + lastGlucose + ". "+ reasonIOB + "."
    }

	// Loop like overrides, but not saved on pump
    if (override==true) {
        overrideRatio = overridevalue;
        autosens.ratio = overrideRatio;
        reason2 =  "Profile override set to " + autosens.ratio*100+"%.";
    }

	// Mr.Spock has the bridge
  	if (spock==true) {
		SpockRatio = profile.sens / (277700 / (TDD * lastGlucose));
		if (SpockRatio > maxRatioLimit) {
			SpockRatio = maxRatioLimit;
			reasonSpock = "Spock's magic hit limit by autosens_max setting: " + maxRatioLimit;
		}
		if (SpockRatio < minRatioLimit) {
			SpockRatio = minRatioLimit;
			reasonSpock = "Spock's magic hit limit by autosens_min setting: " + minRatioLimit;
		}
		autosens.ratio = round(SpockRatio,3);
		reasonSpock = "Spock's Ratio @ " + round(SpockRatio,3) + " with ISF:"  + round(profile.sens/SpockRatio,0);
	}

	// end function and supply log output
	return `${reasonSports} ${reason1} ${reason2} ${reasonSMB} ${reasonSpock}`
}
```

## Documents

- read all the stuff in this folder: https://github.com/mountrcg/freeaps/tree/dev-aisf/aisf

# Dash implementation

:warning: :warning: :warning: :warning:

# Precaution 

Please understand that these version are :
- highly experimental
- not approved for therapy

WARNING 
- The settings of your current FAX should not be re-init when you update to this version but check it before close loop 
- The update MUST ONLY be done when you change of a pod. The previous pod would be not accessible. So, first, desactivate your current pod then compile and update your FAX on your phone and add a new pod with the dash pump menu.


These version were tested by few developers with success. But...Don't hesitate to create issues if you find bugs or issues. 

:warning: :warning: :warning: 


# Documentation

[freeAPS X original github](https://github.com/ivalkou/freeaps)

[ADD DASH PUMP and SETTINGS](https://loopkit.github.io/loopdocs/loop-3/omnipod/)

[Overview & Onboarding Tips on Loop&Learn](https://www.loopandlearn.org/freeaps-x/)

[OpenAPS documentation](https://openaps.readthedocs.io/en/latest/)


# Technical updates 

## Updated to include dashpod

- replace the Rileylink package to the Loop version of 2 august 2022
- replace the Loopkit package to the Loop version of 2 august 2022
- add the MKRingProgressView from the Loop version of 2 august 2022
- add the OMNIBLE package from the Loop version of 2 august 2022
_ modify the order of compilation for CGMBLEKit (header before compilation)
 
 ## Changes in package 
 
No change 😁. Use extension in FAX to include the managerIdentifier

 
 ## Changes in freeapsx

 - in info, add the Bundle Display Name used by package 
 - add Bluetooth service state in Services/Bluetooth required by the new version of the package + add this service as a swift injection in APS resolver
 - in Aps manager :
    - Added blueTooth manager
    - modify enactTempBasal to respect the new protocol
    - modify enactBolus to respect the new protocol. The new loopkit requires a new parameter to describe the type of bolus - in FAX defaut to .manualRecommendationAccepted
    - modify the clearBolusReporter to improve the refresh of the state of the pump
 
 - in devicemanager : 
    - Added blueTooth manager
    - change the staticPumpManagerByIdentifier 
    - change the call ensureCurrentPumpData to respect the new version
    - change the result of fetchNewDataIfNeeded 
    - change the PumpManagerDelegate extension 
    - change the alert protocol
    - add OmniBLE config

 - in extension PumpManager
    - change managerIdentifier
    - remove setupViewController extension
    - new settingsViewController 

- in PumpHistoryStorage  
    - remove a ismutable method
 
- Color and UIColor added and LoopUICOloPalette+Default


In the different views : 
- In home view, add Bluetooth 
- in pump config model, change the PumpConfig.StateModel extension 
- add the bluetooth and correct new interfaces in settings pump views
- change the view for settings max basal /bolus in pump 
- Improve the log message in MainStateModel + UserNotificationManager + Router 

In deviceDataManager :
- add the management of the issue alert (lot of changes with the previous version in the alert management by LoopKit) - Send the alert to UNNotification (modify also)


## issues 
- unable to display all the screens when setup a new pump 
- ~~choice of the insulin for the pump.~~ 
- unable to use truetime for NTP sync. Not yet used by Loop 

