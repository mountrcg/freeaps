import Foundation

struct Oref2_variables: JSON, Equatable {
    var average_total_data: Decimal
    var weightedAverage: Decimal
    var past2hoursAverage: Decimal
    var tddYtd: Decimal
    var tdd7d: Decimal
    var date: Date
    var isEnabled: Bool
//    var overridePercentage: Decimal
//    var useOverride: Bool
//    var duration: Decimal
//    var unlimited: Bool
    var hbt: Decimal

    init(
        average_total_data: Decimal,
        weightedAverage: Decimal,
        past2hoursAverage: Decimal,
        tddYtd: Decimal,
        tdd7d: Decimal,
        date: Date,
        isEnabled: Bool,
//        overridePercentage: Decimal,
//        useOverride: Bool,
//        duration: Decimal,
//        unlimited: Bool,
        hbt: Decimal
    ) {
        self.average_total_data = average_total_data
        self.weightedAverage = weightedAverage
        self.past2hoursAverage = past2hoursAverage
        self.tddYtd = tddYtd
        self.tdd7d = tdd7d
        self.date = date
        self.isEnabled = isEnabled
//        self.overridePercentage = overridePercentage
//        self.useOverride = useOverride
//        self.duration = duration
//        self.unlimited = unlimited
        self.hbt = hbt
    }
}

extension Oref2_variables {
    private enum CodingKeys: String, CodingKey {
        case average_total_data
        case weightedAverage
        case past2hoursAverage
        case tddYtd
        case tdd7d
        case date
        case isEnabled
//        case overridePercentage
//        case useOverride
//        case duration
//        case unlimited
        case hbt
    }
}
