# FreeAPS-X autoISF Branch

## Introduction

FreeAPS-X - an artificial pancreas system for iOS developed by Ivan Valkou based on [OpenAPS Reference](https://github.com/openaps/oref0) algorithms.

FreeAPS-X uses original JavaScript files of oref0 and provides a user interface (UI) to control and set up the system.


To use this branch :

git clone --branch=dev-aisf_TDD https://github.com/mountrcg/freeaps.git

The autoISF branch includes my implementation of autoISF by ga-zelle and some other extra features. autoISF is off by default.

Please understand that this version is :
- highly experimental
- not approved for therapy

# Changes

Latest version brings significant improvements for Omnipod Dash punps and Dexcom G6 sensors, Looping should be immediate and robust. Review in the Statistics Panel (see preferences). Dexcom G7 is also supported.

## Version
- 0.2.8b refers to the autoISF version as used in AAPS
- dev release with current mods as of Feb 23, 2023

## Release
- 1.07 refers to FreeAPS-X which is currently mainly improved by Jon & Pierre at this [github repository](https://github.com/Jon-b-m/freeaps)
- Dash & G7 frameworks from Loop3
- CoreData refactoring

## Remarks
Due to the heavy refactoring and my changes to Jon's CoreData, it is advised to delete FAX and install with a new clone. All current stats will be gone and build up again. All settings will be at default values, like `maxIOB = 0`. Due to deleting FAX you should do it in between pods, as you loose this information.



# Documentation

Most of the changes are made in oref code of OpenAPS, which is part of FreeAPS-X. But it is not really readable in FAX, so refer to my [oref0-repository](https://github.com/mountrcg/oref0/tree/dev_aisf_TDD).

[Original autoISF implementation for AAPS](https://github.com/ga-zelle/autoISF)

[Discord FreeAPS-X ](https://discord.com/channels/1020905149037813862/1021578455839682560)

[Discord autoISF - FreeAPS-X channel](https://discord.com/channels/953929437894803478/1025731124615458848)

[FreeAPS-X original github](https://github.com/ivalkou/freeaps)

[ADD DASH PUMP and SETTINGS](https://loopkit.github.io/loopdocs/loop-3/omnipod/)

[Overview & Onboarding Tips on Loop&Learn](https://www.loopandlearn.org/freeaps-x/)

[OpenAPS documentation](https://openaps.readthedocs.io/en/latest/)
