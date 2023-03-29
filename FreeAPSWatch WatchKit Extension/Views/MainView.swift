import HealthKit
import SwiftDate
import SwiftUI

struct MainView: View {
    private enum Config {
        static let lag: TimeInterval = 30
    }

    @EnvironmentObject var state: WatchStateModel

    @State var isCarbsActive = false
    @State var isTargetsActive = false
    @State var isBolusActive = false
    @State private var pulse = 0

    @GestureState var isDetectingLongPress = false
    @State var completedLongPress = false

    @State var completedLongPressOfBG = false
    @GestureState var isDetectingLongPressOfBG = false

    private var healthStore = HKHealthStore()
    let heartRateQuantity = HKUnit(from: "count/min")

    var body: some View {
        ZStack(alignment: .topLeading) {
            VStack {
                if !completedLongPressOfBG {
                    header
                    Spacer()
                    buttons
                } else {
                    bigHeader
                }
            }

            if state.isConfirmationViewActive {
                ConfirmationView(success: $state.confirmationSuccess)
                    .background(Rectangle().fill(.black))
            }

            if state.isConfirmationBolusViewActive {
                BolusConfirmationView()
                    .environmentObject(state)
                    .background(Rectangle().fill(.black))
            }
        }
        .frame(maxHeight: .infinity)
        .padding(.horizontal)
        .onReceive(state.timer) { date in
            state.timerDate = date
            state.requestState()
        }
        .onAppear {
            state.requestState()
        }
    }

    var header: some View {
        HStack {
            HStack(alignment: .lastTextBaseline) {
                VStack(alignment: .leading, spacing: 0) {
                    HStack(alignment: .bottom) {
                        Text(state.glucose).font(.largeTitle).foregroundColor(colorOfGlucose)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        // .padding(.top, 2)
                        if state.timerDate.timeIntervalSince(state.lastUpdate) > 10 {
                            withAnimation {
                                BlinkingView(count: 8, size: 3)
                                    .frame(width: 25, height: 18)
                                    .padding(.bottom, 15)
                            }
                        }
                        Spacer()
                        Text("TDD").foregroundColor(.insulin).font(.caption).fixedSize()
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                            .padding(.bottom, 6)
                    }
                    HStack(alignment: .lastTextBaseline) {
                        Text(state.delta).font(.title3).foregroundColor(.gray)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        Text(state.trend).foregroundColor(.gray)
                        Text(state.eventualBG).font(.title3)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        Spacer()
                        Text(iobFormatter.string(from: (state.tdd ?? 0) as NSNumber)!).font(.caption).fixedSize()
                            .foregroundColor(.insulin)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                    }
                }
                Spacer()
                VStack(spacing: 4) {
                    HStack {
                        Circle().stroke(color, lineWidth: 6).frame(width: 30, height: 30).padding()
                    }

                    if state.lastLoopDate != nil {
                        Text(timeString).font(.caption2).foregroundColor(.gray)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                            .foregroundColor(.secondary)
                        // .padding(.bottom, 4)
                    } else {
                        Text("--").font(.caption2).foregroundColor(.gray)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                    }
                }
            }
            Spacer()
                .onAppear(perform: start)
        }
        .padding()
        // .scaleEffect(isDetectingLongPressOfBG ? 3 : 1)
        .gesture(longPresBGs)
    }

    var bigHeader: some View {
        VStack(alignment: .center) {
            HStack {
                Text(state.glucose)
                    .font(.custom("Big BG", size: 65))
                    .foregroundColor(colorOfGlucose)
                Text(state.trend)
                    .scaledToFill()
            }
            VStack {
                Circle().stroke(color, lineWidth: 12).frame(width: 60, height: 60).padding(10)

                if state.lastLoopDate != nil {
                    Text(timeString).font(.title3).foregroundColor(.gray)
                } else {
                    Text("--").font(.title3).foregroundColor(.gray)
                }
            }
        }
        .gesture(longPresBGs)
    }

    var longPress: some Gesture {
        LongPressGesture(minimumDuration: 1)
            .updating($isDetectingLongPress) { currentState, gestureState,
                _ in
                gestureState = currentState
            }
            .onEnded { _ in
                if completedLongPress {
                    completedLongPress = false
                } else { completedLongPress = true }
            }
    }

    var longPresBGs: some Gesture {
        LongPressGesture(minimumDuration: 1)
            .updating($isDetectingLongPressOfBG) { currentState, gestureState,
                _ in
                gestureState = currentState
            }
            .onEnded { _ in
                if completedLongPressOfBG {
                    completedLongPressOfBG = false
                } else { completedLongPressOfBG = true }
            }
    }

    var buttons: some View {
        VStack {
            Spacer()
            HStack(alignment: .lastTextBaseline) {
                Text(iobFormatter.string(from: (state.cob ?? 0) as NSNumber)!).font(.title3).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Text("g").foregroundColor(.loopYellow).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Spacer()
                Text(iobFormatter.string(from: (state.iob ?? 0) as NSNumber)!).font(.title3).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Text("U").foregroundColor(.insulin).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Spacer()
                Text(iobFormatter.string(from: (state.isf ?? 0) as NSNumber)!).font(.title3).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Text("isf").foregroundColor(.loopGreen).fixedSize()
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
            }.padding(.bottom)
            Spacer()
            HStack(alignment: .bottom) {
                NavigationLink(isActive: $state.isCarbsViewActive) {
                    CarbsView()
                        .environmentObject(state)
                } label: {
                    Image("carbs1", bundle: nil)
                        .renderingMode(.template)
                        .resizable()
                        .frame(width: 24, height: 24)
                        .foregroundColor(.loopYellow)
                }
                NavigationLink(isActive: $state.isBolusViewActive) {
                    BolusView()
                        .environmentObject(state)
                } label: {
                    Image("bolus", bundle: nil)
                        .renderingMode(.template)
                        .resizable()
                        .frame(width: 24, height: 24)
                        .foregroundColor(.insulin)
                }
                NavigationLink(isActive: $state.isTempTargetViewActive) {
                    TempTargetsView()
                        .environmentObject(state)
                } label: {
                    VStack {
                        Image("target1", bundle: nil)
                            .renderingMode(.template)
                            .resizable()
                            .frame(width: 24, height: 24)
                            .foregroundColor(.loopGreen)
                        if let until = state.tempTargets.compactMap(\.until).first, until > Date() {
                            Text(until, style: .relative)
                                .scaledToFill().fixedSize()
                                .font(.system(size: 8))
                        }
                    }
                }
            }
        }
    }

    func start() {
        autorizeHealthKit()
        startHeartRateQuery(quantityTypeIdentifier: .heartRate)
    }

    func autorizeHealthKit() {
        let healthKitTypes: Set = [
            HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!
        ]
        healthStore.requestAuthorization(toShare: healthKitTypes, read: healthKitTypes) { _, _ in }
    }

    private func startHeartRateQuery(quantityTypeIdentifier: HKQuantityTypeIdentifier) {
        let devicePredicate = HKQuery.predicateForObjects(from: [HKDevice.local()])
        let updateHandler: (HKAnchoredObjectQuery, [HKSample]?, [HKDeletedObject]?, HKQueryAnchor?, Error?) -> Void = {
            _, samples, _, _, _ in
            guard let samples = samples as? [HKQuantitySample] else {
                return
            }
            self.process(samples, type: quantityTypeIdentifier)
        }
        let query = HKAnchoredObjectQuery(
            type: HKObjectType.quantityType(forIdentifier: quantityTypeIdentifier)!,
            predicate: devicePredicate,
            anchor: nil,
            limit: HKObjectQueryNoLimit,
            resultsHandler: updateHandler
        )
        query.updateHandler = updateHandler
        healthStore.execute(query)
    }

    private func process(_ samples: [HKQuantitySample], type: HKQuantityTypeIdentifier) {
        var lastHeartRate = 0.0
        for sample in samples {
            if type == .heartRate {
                lastHeartRate = sample.quantity.doubleValue(for: heartRateQuantity)
            }
            pulse = Int(lastHeartRate)
        }
    }

    private var iobFormatter: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.maximumFractionDigits = 1
        formatter.numberStyle = .decimal
        return formatter
    }

    private var timeString: String {
        let minAgo = Int((Date().timeIntervalSince(state.lastLoopDate ?? .distantPast) - Config.lag) / 60) + 1
        if minAgo > 1440 {
            return "--"
        }
        return "\(minAgo) " + NSLocalizedString("min", comment: "Minutes ago since last loop")
    }

    private var colorOfGlucose: Color {
        guard let recentBG = Int(state.glucose)
        else { return .loopYellow }

        switch recentBG {
        case 61 ... 69:
            return .loopOrange
        case 70 ... 140:
            return .loopGreen
        case 141 ... 180:
            return .loopYellow
        default:
            return .loopRed
        }
    }

    private var color: Color {
        guard let lastLoopDate = state.lastLoopDate else {
            return .loopGray
        }
        let delta = Date().timeIntervalSince(lastLoopDate) - Config.lag

        if delta <= 5.minutes.timeInterval {
            return .loopGreen
        } else if delta <= 10.minutes.timeInterval {
            return .loopYellow
        } else {
            return .loopRed
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        let state = WatchStateModel()

        state.glucose = "266"
        state.delta = "+55"
        state.iob = 9.9
        state.cob = 88
        state.isf = 100
        state.tdd = 35.95
        state.eventualBG = "232"

        state.lastLoopDate = Date().addingTimeInterval(-200)
        state
            .tempTargets =
            [TempTargetWatchPreset(name: "Test", id: "test", description: "", until: Date().addingTimeInterval(3600 * 3))]

        return Group {
            MainView().previewDevice("Apple Watch Series 7 - 45mm")
        }.environmentObject(state)
    }
}
