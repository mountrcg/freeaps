import Foundation

struct Suggestion: JSON, Equatable {
    let reason: String
    let units: Decimal?
    let insulinReq: Decimal?
    let eventualBG: Int?
    let sensitivityRatio: Decimal?
    let rate: Decimal?
    let duration: Int?
    let iob: Decimal?
    let cob: Decimal?
    var predictions: Predictions?
    let deliverAt: Date?
    let carbsReq: Decimal?
    let temp: TempType?
    let bg: Decimal?
    let reservoir: Decimal?
    let isf: Decimal?
    let tdd: Decimal?
    let tddytd: Decimal?
    let tdd7d: Decimal?
    var timestamp: Date?
    var recieved: Bool?
    var duraISFratio: Decimal?
    var bgISFratio: Decimal?
    var deltaISFratio: Decimal?
    var ppISFratio: Decimal?
    var acceISFratio: Decimal?
    var autoISFratio: Decimal?
}

struct Predictions: JSON, Equatable {
    let iob: [Int]?
    let zt: [Int]?
    let cob: [Int]?
    let uam: [Int]?
}

extension Suggestion {
    private enum CodingKeys: String, CodingKey {
        case reason
        case units
        case insulinReq
        case eventualBG
        case sensitivityRatio
        case rate
        case duration
        case iob = "IOB"
        case cob = "COB"
        case predictions = "predBGs"
        case deliverAt
        case carbsReq
        case temp
        case bg
        case reservoir
        case timestamp
        case recieved
        case isf = "ISF"
        case tdd = "TDD"
        case tddytd = "TDDytd"
        case tdd7d = "TDD7d"
        case duraISFratio = "dura_ISFratio"
        case bgISFratio = "bg_ISFratio"
        case deltaISFratio = "delta_ISFratio"
        case ppISFratio = "pp_ISFratio"
        case acceISFratio = "acce_ISFratio"
        case autoISFratio = "auto_ISFratio"
    }
}

extension Predictions {
    private enum CodingKeys: String, CodingKey {
        case iob = "IOB"
        case zt = "ZT"
        case cob = "COB"
        case uam = "UAM"
    }
}

protocol SuggestionObserver {
    func suggestionDidUpdate(_ suggestion: Suggestion)
}

protocol EnactedSuggestionObserver {
    func enactedSuggestionDidUpdate(_ suggestion: Suggestion)
}

extension Suggestion {
    var reasonParts: [String] {
        reason.components(separatedBy: "; ").first?.components(separatedBy: ", ") ?? []
    }

    var reasonConclusion: String {
        reason.components(separatedBy: "; ").last ?? ""
    }
}
