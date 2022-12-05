import Foundation

struct Preferences: JSON {
    var maxIOB: Decimal = 9
    var maxDailySafetyMultiplier: Decimal = 6
    var currentBasalSafetyMultiplier: Decimal = 7
    var autosensMax: Decimal = 2
    var autosensMin: Decimal = 0.5
    var rewindResetsAutosens: Bool = true
    var highTemptargetRaisesSensitivity: Bool = false
    var lowTemptargetLowersSensitivity: Bool = false
    var sensitivityRaisesTarget: Bool = false
    var resistanceLowersTarget: Bool = false
    var advTargetAdjustments: Bool = false
    var exerciseMode: Bool = false
    var halfBasalExerciseTarget: Decimal = 160
    var maxCOB: Decimal = 120
    var wideBGTargetRange: Bool = false
    var skipNeutralTemps: Bool = false
    var unsuspendIfNoTemp: Bool = false
    var bolusSnoozeDIADivisor: Decimal = 2
    var min5mCarbimpact: Decimal = 8
    var autotuneISFAdjustmentFraction: Decimal = 1.0
    var remainingCarbsFraction: Decimal = 1.0
    var remainingCarbsCap: Decimal = 90
    var enableUAM: Bool = false
    var a52RiskEnable: Bool = false
    var enableSMBWithCOB: Bool = false
    var enableSMBWithTemptarget: Bool = false
    var enableSMBAlways: Bool = false
    var enableSMBAfterCarbs: Bool = false
    var allowSMBWithHighTemptarget: Bool = false
    var maxSMBBasalMinutes: Decimal = 30
    var maxUAMSMBBasalMinutes: Decimal = 30
    var smbInterval: Decimal = 3
    var bolusIncrement: Decimal = 0.1
    var curve: InsulinCurve = .rapidActing
    var useCustomPeakTime: Bool = false
    var insulinPeakTime: Decimal = 75
    var carbsReqThreshold: Decimal = 1.0
    var noisyCGMTargetMultiplier: Decimal = 1.3
    var suspendZerosIOB: Bool = true
    var timestamp: Date?
    // start autoISF config
    var floatingcarbs: Bool = false
    var autoisf: Bool = true
    var autoISFmax: Decimal = 2
    var autoISFmin: Decimal = 0.5
    var smbDeliveryRatio: Decimal = 0.85
    var smbMaxRangeExtension: Decimal = 3
    var smbDeliveryRatioBGrange: Decimal = 90
    var smbDeliveryRatioMin: Decimal = 0.65
    var smbDeliveryRatioMax: Decimal = 0.80
    var enableautoISFwithCOB: Bool = true
    var autoISFhourlyChange: Decimal = 0.6
    var higherISFrangeWeight: Decimal = 0.3
    var lowerISFrangeWeight: Decimal = 0.7
    var deltaISFrangeWeight: Decimal = 0.6
    var postMealISFalways: Bool = true
    var postMealISFweight: Decimal = 0.02
    var postMealISFduration: Decimal = 3
    var enableBGacceleration: Bool = true
    var bgAccelISFweight: Decimal = 0.1
    var bgBrakeISFweight: Decimal = 0.15
    var maxDeltaBGthreshold: Decimal = 0.3
    var iobThreshold: Decimal = 0
    var autoISFoffSport: Bool = true
    var enableSMBEvenOnOddOff: Bool = true
}

extension Preferences {
    private enum CodingKeys: String, CodingKey {
        case maxIOB = "max_iob"
        case maxDailySafetyMultiplier = "max_daily_safety_multiplier"
        case currentBasalSafetyMultiplier = "current_basal_safety_multiplier"
        case autosensMax = "autosens_max"
        case autosensMin = "autosens_min"
        case rewindResetsAutosens = "rewind_resets_autosens"
        case highTemptargetRaisesSensitivity = "high_temptarget_raises_sensitivity"
        case lowTemptargetLowersSensitivity = "low_temptarget_lowers_sensitivity"
        case sensitivityRaisesTarget = "sensitivity_raises_target"
        case resistanceLowersTarget
        case advTargetAdjustments = "adv_target_adjustments"
        case exerciseMode = "exercise_mode"
        case halfBasalExerciseTarget = "half_basal_exercise_target"
        case maxCOB
        case wideBGTargetRange = "wide_bg_target_range"
        case skipNeutralTemps = "skip_neutral_temps"
        case unsuspendIfNoTemp = "unsuspend_if_no_temp"
        case bolusSnoozeDIADivisor = "bolussnooze_dia_divisor"
        case min5mCarbimpact = "min_5m_carbimpact"
        case autotuneISFAdjustmentFraction = "autotune_isf_adjustmentFraction"
        case remainingCarbsFraction
        case remainingCarbsCap
        case enableUAM
        case a52RiskEnable = "A52_risk_enable"
        case enableSMBWithCOB = "enableSMB_with_COB"
        case enableSMBWithTemptarget = "enableSMB_with_temptarget"
        case enableSMBAlways = "enableSMB_always"
        case enableSMBAfterCarbs = "enableSMB_after_carbs"
        case allowSMBWithHighTemptarget = "allowSMB_with_high_temptarget"
        case maxSMBBasalMinutes
        case maxUAMSMBBasalMinutes
        case smbInterval = "SMBInterval"
        case bolusIncrement = "bolus_increment"
        case curve
        case useCustomPeakTime
        case insulinPeakTime
        case carbsReqThreshold
        case noisyCGMTargetMultiplier
        case suspendZerosIOB = "suspend_zeros_iob"
        // start autoISF config for oref variables
        case autoisf = "use_autoisf"
        case autoISFhourlyChange = "dura_ISF_weight"
        case autoISFmax = "autoISF_max"
        case autoISFmin = "autoISF_min"
        case smbDeliveryRatio = "smb_delivery_ratio"
        case smbMaxRangeExtension = "smb_max_range_extension"
        case floatingcarbs = "floating_carbs"
        case iobThreshold = "iob_threshold"
        case enableSMBEvenOnOddOff = "enableSMB_EvenOn_OddOff"
        case smbDeliveryRatioBGrange = "smb_delivery_ratio_bg_range"
        case smbDeliveryRatioMin = "smb_delivery_ratio_min"
        case smbDeliveryRatioMax = "smb_delivery_ratio_max"
        case enableautoISFwithCOB = "enableautoisf_with_COB"
        case higherISFrangeWeight = "higher_ISFrange_weight"
        case lowerISFrangeWeight = "lower_ISFrange_weight"
        case deltaISFrangeWeight = "delta_ISFrange_weight"
        case postMealISFweight = "pp_ISF_weight"
        case postMealISFduration = "pp_ISF_hours"
        case postMealISFalways = "enable_pp_ISF_always"
        case bgAccelISFweight = "bgAccel_ISF_weight"
        case bgBrakeISFweight = "bgBrake_ISF_weight"
        case enableBGacceleration = "enable_BG_acceleration"
        case maxDeltaBGthreshold = "maxDelta_bg_threshold"
        case autoISFoffSport = "autoISF_off_Sport"
    }
}

enum InsulinCurve: String, JSON, Identifiable, CaseIterable {
    case rapidActing = "rapid-acting"
    case ultraRapid = "ultra-rapid"
    case bilinear

    var id: InsulinCurve { self }
}
