import Foundation

struct TDD_avg: JSON, Equatable {
    var avgTDD7d: Decimal
    var timestamp: Date

    init(
        avgTDD7d: Decimal,
        timestamp: Date
    ) {
        self.avgTDD7d = avgTDD7d
        self.timestamp = timestamp
    }
}

extension TDD_avg {
    private enum CodingKeys: String, CodingKey {
        case avgTDD7d
        case timestamp
    }
}
