import SwiftUI

extension AddTempTarget {
    final class StateModel: BaseStateModel<Provider> {
        @Injected() private var storage: TempTargetsStorage!
        @Injected() var apsManager: APSManager!

        @Published var low: Decimal = 0
        @Published var high: Decimal = 0
        @Published var duration: Decimal = 0
        @Published var date = Date()
        @Published var newPresetName = ""
        @Published var presets: [TempTarget] = []
        @Published var percentage = 100.0
        @Published var maxValue: Decimal = 1.2
        @Published var halfBasal: Decimal = 160
        @Published var viewPercentage = false
        @Published var lowTTlowers = false
        @Published var highTTraises = false
        @Published var exerMode = false
        @Published var hbt: Double = 160
        @Published var saveSettings: Bool = false

        private(set) var units: GlucoseUnits = .mmolL

        override func subscribe() {
            units = settingsManager.settings.units
            presets = storage.presets()
            maxValue = settingsManager.preferences.autosensMax
            halfBasal = settingsManager.preferences.halfBasalExerciseTarget
            lowTTlowers = settingsManager.preferences.lowTemptargetLowersSensitivity
            highTTraises = settingsManager.preferences.highTemptargetRaisesSensitivity
            exerMode = settingsManager.preferences.exerciseMode
        }

        func enact() {
            var lowTarget = low

            if viewPercentage {
                let ratio = Decimal(percentage / 100)
                let normalTarget: Decimal = 100
                var target: Decimal = low
                if units == .mmolL { target = Decimal(round(Double(target.asMgdL))) }
                var hbtcalc: Decimal = halfBasal
                if ratio != 1 {
                    hbtcalc = ((2 * ratio * normalTarget) - normalTarget - (ratio * target)) / (ratio - 1)
                }
                hbt = round(Double(hbtcalc))
                print("Test HBT calc: \(hbt) mg/dL")
                saveSettings = true
            }
            if units == .mmolL {
                lowTarget = Decimal(round(Double(lowTarget.asMgdL)))
            }
            var highTarget = lowTarget

            let entry = TempTarget(
                name: TempTarget.custom,
                createdAt: date,
                targetTop: highTarget,
                targetBottom: lowTarget,
                duration: duration,
                enteredBy: TempTarget.manual,
                reason: TempTarget.custom
            )
            storage.storeTempTargets([entry])

            showModal(for: nil)
        }

        func cancel() {
            storage.storeTempTargets([TempTarget.cancel(at: Date())])
            showModal(for: nil)
        }

        func save() {
            var lowTarget = low

            if viewPercentage {
                let ratio = Decimal(percentage / 100)
                let normalTarget: Decimal = 100
                var target: Decimal = low
                if units == .mmolL { target = Decimal(round(Double(target.asMgdL))) }
                var hbtcalc: Decimal = halfBasal
                if ratio != 1 {
                    hbtcalc = ((2 * ratio * normalTarget) - normalTarget - (ratio * target)) / (ratio - 1)
                }
                hbt = round(Double(hbtcalc))
                saveSettings = true
            }

            if units == .mmolL {
                lowTarget = Decimal(round(Double(lowTarget.asMgdL)))
            }
            var highTarget = lowTarget

            let entry = TempTarget(
                name: newPresetName.isEmpty ? TempTarget.custom : newPresetName,
                createdAt: Date(),
                targetTop: highTarget,
                targetBottom: lowTarget,
                duration: duration,
                enteredBy: TempTarget.manual,
                reason: newPresetName.isEmpty ? TempTarget.custom : newPresetName
            )

            presets.append(entry)
            storage.storePresets(presets)
        }

        func enactPreset(id: String) {
            if var preset = presets.first(where: { $0.id == id }) {
                preset.createdAt = Date()
                storage.storeTempTargets([preset])
                showModal(for: nil)
            }
        }

        func savedHBT() {}

        func removePreset(id: String) {
            presets = presets.filter { $0.id != id }
            storage.storePresets(presets)
        }
    }
}
