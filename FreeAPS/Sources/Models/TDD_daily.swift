import Foundation

struct TDD_daily: JSON, Equatable {
    var TDD: Decimal
    var timestamp: Date

    init(
        TDD: Decimal,
        timestamp: Date
    ) {
        self.TDD = TDD
        self.timestamp = timestamp
    }
}

extension TDD_daily {
    private enum CodingKeys: String, CodingKey {
        case TDD
        case timestamp
    }
}
