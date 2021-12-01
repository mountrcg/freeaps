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
    var body: some View {
        ZStack {
            VStack {
                header
                Spacer()
                buttons
            }

            if state.isConfirmationViewActive {
                ConfirmationView(success: $state.confirmationSuccess)
                    .background(Rectangle().fill(.black))
            }
        }
        .frame(maxHeight: .infinity)
        .padding()
        .onReceive(state.timer) { _ in
            state.requestState()
        }
        .onAppear {
            state.requestState()
        }
    }

    var header: some View {
        VStack {
            HStack(alignment: .top) {
                VStack(alignment: .leading) {
                    HStack {
                        Text(state.glucose).font(.largeTitle)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                        Text(state.trend)
                    }
                    Text(state.delta).font(.caption2)
                        .scaledToFill()
                        .minimumScaleFactor(0.5)
                }
                Spacer()

                VStack(spacing: 0) {
                    HStack {
                        Circle().stroke(color, lineWidth: 6).frame(width: 30, height: 30).padding(10)
                    }

                    if state.lastLoopDate != nil {
                        Text(timeString).font(.caption2)
                            .scaledToFill()
                            .minimumScaleFactor(0.5)
                    } else {
                        Text("--").font(.caption2)
                    }
                }
            }
            Spacer()
            HStack (alignment: .firstTextBaseline) {
                Text("IOB: " + iobFormatter.string(from: (state.iob ?? 0) as NSNumber)! + " U").font(.caption2)
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
                Spacer()
                Text("COB: " + iobFormatter.string(from: (state.cob ?? 0) as NSNumber)! + " g").font(.caption2)
                    .scaledToFill()
                    .minimumScaleFactor(0.5)
            }
            Spacer()
        }.padding()
    }

    var buttons: some View {
        HStack {
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
                        Text(until, style: .timer).font(.system(size: 8))
                    }
                }
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
        }
    }

    private var iobFormatter: NumberFormatter {
        let formatter = NumberFormatter()
        formatter.maximumFractionDigits = 2
        formatter.numberStyle = .decimal
        return formatter
    }

    private var timeString: String {
        let minAgo = Int((Date().timeIntervalSince(state.lastLoopDate ?? .distantPast) - Config.lag) / 60) + 1
        if minAgo > 1440 {
            return "--"
        }
        return "\(minAgo) " + NSLocalizedString("min ago", comment: "Minutes ago since last loop")
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

        state.glucose = "15,7"
        state.delta = "+0.39"
        state.iob = 10.38
        state.cob = 112

        state.lastLoopDate = Date().addingTimeInterval(-200)

        return Group {
            MainView()
            MainView().previewDevice("Apple Watch Series 5 - 40mm")
        }.environmentObject(state)
    }
}