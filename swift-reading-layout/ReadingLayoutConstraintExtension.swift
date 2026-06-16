//
//  ReadingLayoutConstraintExtension.swift
//  Madame Endora
//
//  Created by William Piotrowski on 5/16/22.
//

import UIKit

// MARK: STATIC METHODS
extension ReadingLayout {
    
    /// Returns all constraints between the child and parent view.
    ///
    /// This may not be best since the child view may have some constraints relative to another view in the heirarchy.
    ///
    /// - note: checks all constraints of the parent that include the child.
    /// - Parameters:
    ///   - childView:
    ///   - parentView:
    /// - Returns: An sub array of constraints from the parent view that contain the child view as the firstItem.
    static func getAllConstraints(
        for childView: UIView,
        in parentView: UIView
    ) -> [NSLayoutConstraint] {
        parentView.constraints.compactMap(){
            (
                $0.firstItem === childView ||
                $0.secondItem === childView
            ) ? $0 : nil
        }
    }
}
