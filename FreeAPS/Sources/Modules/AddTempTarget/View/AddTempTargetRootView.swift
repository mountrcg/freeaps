import CoreData
import SwiftUI
import Swinject

extension AddTempTarget {
    struct RootView: BaseView {
        let resolver: Resolver
        @StateObject var state = StateModel()
        @State private var isPromtPresented = false
        @State private var isRemoveAlertPresented = false
        @State private var removeAlert: Alert?
        @State private var isEditing = false
        @State private var infoButtonPressed: InfoText?

        @FetchRequest(
            entity: ViewPercentage.entity(),
            // sortDescriptors: [NSSortDescriptor(key: "enabled", ascending: false)]
            sortDescriptors: [NSSortDescriptor(key: "date", ascending: false)]
        ) var isEnabledArray: FetchedResults<ViewPercentage>

        @Environment(\.managedObjectContext) var moc

        private var formatter: NumberFormatter {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.maximumFractionDigits = 1
            return formatter
        }

        var body: some View {
            Form {
                if !state.presets.isEmpty {
                    Section(header: Text("Presets")) {
                        ForEach(state.presets) { preset in
                            presetView(for: preset)
                        }
                    }
                }

                Toggle(isOn: $state.viewPercentage) {
                    HStack {
                        Text("InsulinRatio Calc for ")
                        Image(systemName: "figure.highintensity.intervaltraining")
                        Text("or")
                        Image(systemName: "fork.knife")
                    }
                }

                if state.viewPercentage {
                    Section(
                        header: Text("TT Effect on Insulin ratio")
                    ) {
                        VStack {
                            HStack {
                                Text(NSLocalizedString("Target", comment: ""))
                                Spacer()
                                DecimalTextField(
                                    "0",
                                    value: $state.low,
                                    formatter: formatter,
                                    cleanInput: true
                                )
                                Text(state.units.rawValue).foregroundColor(.secondary)
                            }

                            if computeSliderLow() != computeSliderHigh() {
                                Text(NSLocalizedString("Desired Insulin Ratio", comment: ""))
                                Text("\(state.percentage.formatted(.number)) %")
                                    .foregroundColor(isEditing ? .orange : .blue)
                                    .font(.title)
                                Slider(
                                    value: $state.percentage,
                                    in: computeSliderLow() ... computeSliderHigh(),
                                    step: 5
                                ) {}
                                minimumValueLabel: { Text("\(computeSliderLow(), specifier: "%.0f")%") }
                                maximumValueLabel: { Text("\(computeSliderHigh(), specifier: "%.0f")%") }
                                onEditingChanged: { editing in
                                    isEditing = editing }
                                Divider()
                                HStack {
                                    Text(
                                        "Half Basal Exercise Target to be set at: \(computeHBT().formatted(.number)) mg/dl"
//                                    Text(
//                                        state
//                                            .units == .mgdL ? "Half Basal Exercise Target to be set at: \(computeHBT().formatted(.number)) mg/dl" :
//                                            "Half Basal Exercise Target to be set at: \(computeHBT().asMmolL.formatted(.number.grouping(.never).rounded().precision(.fractionLength(1)))) mmol/L"
                                    )
                                    .foregroundColor(.loopGreen)
                                    .font(.caption).italic()
                                    .fixedSize(horizontal: true, vertical: false)
                                }
                                if state.percentage != 100 && state.percentage != round(Double(computeRatio())) {
                                    Text(
                                        "Enter HBT in Preferences to achieve Insulin Ratio." + "\n" +
                                            "If you don't, the set Target will put you at Insulin Ratio of " +
                                            "\(computeRatio().formatted(.number)) % as HBT is currently \(state.halfBasal) mg/dL."
                                    )
                                    .foregroundColor(.loopRed)
                                    .fixedSize(horizontal: false, vertical: true)
                                    .multilineTextAlignment(.leading).font(.caption)
                                }
                            } else {
                                Text(
                                    "You have not enabled the proper Preferences to change sensitivity with chosen TempTarget. Verify Autosens Max, lowTT lowers Sens and highTT raises Sens (or Exercise Mode)!"
                                )
                                // .foregroundColor(.loopRed)
                                .font(.caption).italic()
                                .fixedSize(horizontal: false, vertical: true)
                                .multilineTextAlignment(.leading)
                            }
                        }
                    }
                    Section(
                        header: Text("Current settings in Preferences:")
                    ) {
                        VStack(alignment: .leading) {
                            HStack {
                                ZStack {
                                    Button("", action: {
                                        infoButtonPressed = InfoText(
                                            description: "Half Basal Exercise Target (HBT) setting adjusts how a TempTarget affects Sensitivity (Basal, CR and ISF). HBT defines at which highTT the Insulin Ratio is reduced to 50%, in other words sensitivity is at 200%. A lower HBT using a high TT will allow Basal to be reduced earlier, in other words with a smaller high TT. However for this feature to be activated either High TempTarget raises Sensitivity or Exercise Mode must be activated for high TT to increase Sensitivity. Accordingly Low TempTarget lowers Sensitivity must be activated and Autosens.max needs to be higher than 1, to give reduced Sensitivity for low TT.",
                                            oref0Variable: "Half Basal Exercise Target functionality"
                                        )
                                    })
                                    Text("Half Basal Exercise Target")
                                }
                                Spacer()
                                Text("" + "\(state.halfBasal)")
                                    .foregroundColor(
                                        (state.highTTraises || state.exerMode || state.lowTTlowers) ? .blue :
                                            .secondary
                                    )
                            }
                            Divider()
                            HStack {
                                Text("Exercise Mode")
                                Spacer()
                                Text(" " + "\(state.exerMode)")
                                    .foregroundColor(state.exerMode ? .blue : .secondary)
                            }
                            HStack {
                                Text("High TT raises Sensitivity")
                                Spacer()
                                Text(" " + "\(state.highTTraises)")
                                    .foregroundColor(state.highTTraises ? .blue : .secondary)
                            }
                            Divider()
                            HStack {
                                Text("Low TT lowers Sensitivity")
                                Spacer()
                                Text(" " + "\(state.lowTTlowers)")
                                    .foregroundColor(state.lowTTlowers && state.maxValue > 1 ? .blue : .secondary)
                            }
                            HStack {
                                Text("Autosens.max")
                                Spacer()
                                Text(" " + "\(state.maxValue)")
                                    .foregroundColor(state.lowTTlowers && state.maxValue > 1 ? .blue : .secondary)
                            }
                        }
                    }
                } else {
                    Section(header: Text("Custom")) {
                        HStack {
                            Text("Target")
                            Spacer()
                            DecimalTextField("0", value: $state.low, formatter: formatter, cleanInput: true)
                            Text(state.units.rawValue).foregroundColor(.secondary)
                        }
                        HStack {
                            Text("Duration")
                            Spacer()
                            DecimalTextField("0", value: $state.duration, formatter: formatter, cleanInput: true)
                            Text("minutes").foregroundColor(.secondary)
                        }
                        DatePicker("Date", selection: $state.date)
                        Button { isPromtPresented = true }
                        label: { Text("Save as preset") }
                    }
                }
                if state.viewPercentage {
                    Section {
                        HStack {
                            Text("Duration")
                            Spacer()
                            DecimalTextField("0", value: $state.duration, formatter: formatter, cleanInput: true)
                            Text("minutes").foregroundColor(.secondary)
                        }
                        DatePicker("Date", selection: $state.date)
                        Button { isPromtPresented = true }
                        label: { Text("Save as preset") }
                    }
                }

                Section {
                    Button { state.enact() }
                    label: { Text("Enact") }
                    Button { state.cancel() }
                    label: { Text("Cancel Temp Target") }
                }
            }
            .popover(isPresented: $isPromtPresented) {
                Form {
                    Section(header: Text("Enter preset name")) {
                        TextField("Name", text: $state.newPresetName)
                        Button {
                            state.save()
                            isPromtPresented = false
                        }
                        label: { Text("Save") }
                        Button { isPromtPresented = false }
                        label: { Text("Cancel") }
                    }
                }
            }
            .onAppear {
                configureView()
                // state.hbt = isEnabledArray.first?.hbt ?? 160
            }
            .alert(item: $infoButtonPressed) { infoButton in
                Alert(
                    title: Text("\(infoButton.oref0Variable)"),
                    message: Text("\(infoButton.description)"),
                    dismissButton: .default(Text("OK"))
                )
            }
            .navigationTitle("Enact Temp Target")
            .navigationBarTitleDisplayMode(.automatic)
            .navigationBarItems(leading: Button("Close", action: state.hideModal))
            .onDisappear {
                if state.viewPercentage, state.saveSettings {
                    let isEnabledMoc = ViewPercentage(context: moc)
                    isEnabledMoc.enabled = true
                    isEnabledMoc.date = Date()
                    try? moc.save()
                } else {
                    let isEnabledMoc = ViewPercentage(context: moc)
                    isEnabledMoc.enabled = false
                    isEnabledMoc.date = Date()
                    try? moc.save()
                }
            }
        }

        func computeTarget() -> Decimal {
            var ratio = Decimal(state.percentage / 100)
            let hB = Decimal(state.hbt)
            let c = hB - 100
            var target = (c / ratio) - c + 100
            if c * (c + target - 100) <= 0 {
                ratio = state.maxValue
                target = (c / ratio) - c + 100
            }
            return target
        }

        func computeRatio() -> Decimal {
            let hbt = Decimal(state.hbt)
            let normalTarget: Decimal = 100
            var target: Decimal = state.low
            if state.units == .mmolL { target = Decimal(round(Double(target.asMgdL))) }
            var ratio: Decimal = 1
            if (target + hbt - (2 * normalTarget)) !=
                0.0 { ratio = (hbt - normalTarget) / (target + hbt - (2 * normalTarget)) } // prevent division by 0
            if ratio < 0 { ratio = state.maxValue } // if negative Value take max Ratio
            ratio = Decimal(round(Double(min(ratio, state.maxValue) * 100)))
            return ratio
        }

        func computeHBT() -> Decimal {
            let ratio = Decimal(state.percentage / 100)
            let normalTarget: Decimal = 100
            var target: Decimal = state.low
            if state.units == .mmolL { target = Decimal(round(Double(target.asMgdL))) }
            var hbtcalc: Decimal = state.halfBasal
            if ratio != 1 {
                hbtcalc = ((2 * ratio * normalTarget) - normalTarget - (ratio * target)) / (ratio - 1)
            }
            hbtcalc = Decimal(round(Double(hbtcalc)))
            // state.hbt = round(Double(hbtcalc))
            return hbtcalc
        }

        func computeSliderLow() -> Double {
            var minSens: Double = 15
            var target = state.low
            if state.units == .mmolL {
                target = Decimal(round(Double(state.low.asMgdL))) }
            if target == 0 { return minSens }
            if target < 100 || (!state.highTTraises && !state.exerMode) { minSens = 100 }
            // minSens = min(minSens, 95)
            return minSens
        }

        func computeSliderHigh() -> Double {
            var maxSens = Double(state.maxValue * 100)
            var target = state.low
            if target == 0 { return maxSens }
            if state.units == .mmolL {
                target = state.low / 0.0555 }
            if target > 100 || !state.lowTTlowers { maxSens = 100 }
            // maxSens = max(105, maxSens)
            return maxSens
        }

        private func presetView(for preset: TempTarget) -> some View {
            var low = preset.targetBottom
            var high = preset.targetTop
            if state.units == .mmolL {
                low = low?.asMmolL
                high = high?.asMmolL
            }
            return HStack {
                VStack {
                    HStack {
                        Text(preset.displayName)
                        Spacer()
                    }
                    HStack(spacing: 2) {
                        Text(
                            "\(formatter.string(from: (low ?? 0) as NSNumber)!) - \(formatter.string(from: (high ?? 0) as NSNumber)!)"
                        )
                        .foregroundColor(.secondary)
                        .font(.caption)

                        Text(state.units.rawValue)
                            .foregroundColor(.secondary)
                            .font(.caption)
                        Text("for")
                            .foregroundColor(.secondary)
                            .font(.caption)
                        Text("\(formatter.string(from: preset.duration as NSNumber)!)")
                            .foregroundColor(.secondary)
                            .font(.caption)
                        Text("min")
                            .foregroundColor(.secondary)
                            .font(.caption)

                        Spacer()
                    }.padding(.top, 2)
                }
                .contentShape(Rectangle())
                .onTapGesture {
                    state.enactPreset(id: preset.id)
                }

                Image(systemName: "xmark.circle").foregroundColor(.secondary)
                    .contentShape(Rectangle())
                    .padding(.vertical)
                    .onTapGesture {
                        removeAlert = Alert(
                            title: Text("Are you sure?"),
                            message: Text("Delete preset \"\(preset.displayName)\""),
                            primaryButton: .destructive(Text("Delete"), action: { state.removePreset(id: preset.id) }),
                            secondaryButton: .cancel()
                        )
                        isRemoveAlertPresented = true
                    }
                    .alert(isPresented: $isRemoveAlertPresented) {
                        removeAlert!
                    }
            }
        }
    }
}
