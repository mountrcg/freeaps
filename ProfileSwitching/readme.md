# General usage with Free-APS X

The script reads 5 files and adjusts certain values by a given percentage in each of the files.
Input: factor like 0.8 or 1.2 etc. representing the percentage of profile change, 1.2 meaning being 120% less sensitive

Changes for values in:

1. insulin_sensitivities.json:
   new sensitivity = sensitivity / factor
2. basal_profile.json:
   new rate = rate * factor
3. carb_ratios.json:
   new ratio = ratio / factor
4. profile.json & pumpprofile.json:
   all 3 above values in the same way

The rounding of results
- sensitivity: whole number for mg/dl and single digit for mmol/L
- basal rate: nearest 0.05 (omnipod)
- carb ratio: single digit

Files reside in the same directory ./settings and the output with the same filenames will go into ./settings80 (or whatever the factor*100 is)
All files that are not adjusted but and are in ./settings will just be copied to the new profile dirctory.

syntax: call `createProfile.py 1.2` from the FAX directory on iPhone or backup in iCloud to create 120% profile

To activate a percentage profile
- quit FAX
- rename directory settings to settings100 (make sure to always keep the regular profile and only generate percentage profiles from the original profile)
- rename directory settings120 to settings
- start FAX
- Settings > Basal Profile --this shows the new basal rates > hit "Save on Pump" to activate

# USAGE of python Call

Script needs to reside in the directory above your Free-APS X settings directory.
The below will make use of default value of 0.8 and generate a profile for 80% sensitvity ratio, representing a slightly higher sensitivity

```sh
python3 createProfile.py
```

Using a factor of 0.7 to represent an even higher sensitivity. Use whatever sensitivity ratio you need a permanent profile for your pump.

```sh
python3 createProfile.py 0.7
```

## REQUIREMENTS / DEV ENVIROMENT

Tested with:

- Mac OSX 15
- iOS 15 with Pythonista
- Python 3.6 and later
