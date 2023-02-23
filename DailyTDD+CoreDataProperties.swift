import CoreData
import Foundation

public extension DailyTDD {
    @nonobjc class func fetchRequest() -> NSFetchRequest<DailyTDD> {
        NSFetchRequest<DailyTDD>(entityName: "DailyTDD")
    }

    @NSManaged var tdd: NSDecimalNumber?
    @NSManaged var timestamp: Date?
}
