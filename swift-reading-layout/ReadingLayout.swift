//
//  NewReadingLayout.swift
//  Madame Endora
//
//  Created by William Piotrowski on 7/31/22.
//

import Foundation
import MEKit
import UIKit

// Change SpreadType to Spread??

struct ReadingLayout {
    private let maxRowCount: Int
    private let maxColumnCount: Int
    
    let containerWidthMultiplier: CGFloat
    let containerHeightMultiplier: CGFloat
    
    let containerWidthConstant: CGFloat
    let containerHeightConstant: CGFloat
    
    let widthMultiplier: CGFloat
    let heightMultiplier: CGFloat
    let widthConstant: CGFloat
    let heightConstant: CGFloat
    
    let xMultipliers: [CGFloat]
    let yMultipliers: [CGFloat]
    let xConstants: [CGFloat]
    let yConstants: [CGFloat]
    
    init(
        spreadType: SpreadType,
        gutterWidth: CGFloat,
        gutterHeight: CGFloat,
        cardScale: CGFloat
    ){
        // VERIFY ROWS AND COLUMNS ARE CORRECT DIMENSIONS WITH TEST
        let allRows = spreadType.gridLocations.map(){
            $0.y.elements
        }
        let maxRowCount = allRows.max() ?? 0
        let allColumns = spreadType.gridLocations.map(){
            $0.x.elements
        }
        let maxColumnCount = allColumns.max() ?? 0
        
        let horizontalGutterCount = ReadingLayout.getGutterCount(elementCount: maxRowCount)
        let verticalGutterCount = ReadingLayout.getGutterCount(elementCount: maxColumnCount)
        
        let widthMultiplier = 1 / CGFloat(maxColumnCount)
        let heightMultiplier = 1 / CGFloat(maxRowCount)
        let totalGutterWidth = ReadingLayout.getTotalDimension(
            elementDimension: gutterWidth,
            elementCount: verticalGutterCount
        )
        let totalGutterHeight = ReadingLayout.getTotalDimension(
            elementDimension: gutterHeight,
            elementCount: horizontalGutterCount
        )
        let widthConstant = -totalGutterWidth / CGFloat(maxColumnCount)
        let heightConstant = -totalGutterHeight / CGFloat(maxRowCount)
        
        let partOfGutterWidthPerCard = totalGutterWidth / CGFloat(maxColumnCount)
        let partOfGutterHeightPerCard = totalGutterHeight / CGFloat(maxRowCount)
        
        let xMultipliers: [CGFloat] = spreadType.gridLocations.map(){
            Self.getOriginMultiplier(
                maxColumnElementCount: maxColumnCount,
                elementCount: $0.x.elements,
                index: $0.x.index
            )
//            let widthMult = 1 / CGFloat (maxColumnCount)
//            let initialMult = CGFloat($0.x.index) * widthMult
//            let offsetCount = maxColumnCount - $0.x.elements
//            let offset = CGFloat(offsetCount) * widthMult * 0.5
//            return initialMult + offset
        }
        let xConstants: [CGFloat] = spreadType.gridLocations.map(){
            Self.getOriginConstant(
                gutterLengthPerElement: partOfGutterWidthPerCard,
                index: $0.x.index
            )
//            let initialConstant = CGFloat($0.x.index) * gutterWidth
//            let offsetCount = maxColumnCount - $0.x.elements
//            let offset = CGFloat(offsetCount) * gutterWidth * 0.5
////            let gutterOffset = CGFloat($0.x.index) * partOfGutterWidthPerCard
//            return (partOfGutterWidthPerCard / 2) * CGFloat($0.x.index)
//            return initialConstant - widthConstant
//            return initialConstant// + offset// + gutterOffset
        }
        let yMultipliers: [CGFloat] = spreadType.gridLocations.map(){
            Self.getOriginMultiplier(
                maxColumnElementCount: maxRowCount,
                elementCount: $0.y.elements,
                index: $0.y.index
            )
//            let widthMult = 1 / CGFloat (maxRowCount)
//            let initialMult = CGFloat($0.y.index) * widthMult
//            let offsetCount = maxRowCount - $0.y.elements
//            let offset = CGFloat(offsetCount) * widthMult * 0.5
//            return initialMult + offset
        }
        let yConstants: [CGFloat] = spreadType.gridLocations.map(){
            Self.getOriginConstant(
                gutterLengthPerElement: partOfGutterHeightPerCard,
                index: $0.y.index
            )
//            return (partOfGutterHeightPerCard / 2) * CGFloat($0.y.index)
//            return (partOfGutterHeightPerCard / 2) * CGFloat($0.y.index)
//            CGFloat($0.y.index) * gutterWidth
        }
        
        self.maxRowCount = maxRowCount
        self.maxColumnCount = maxColumnCount
        
        self.containerWidthMultiplier = CGFloat(maxColumnCount) * cardScale
        self.containerHeightMultiplier = CGFloat(maxRowCount) * cardScale
        
        self.containerWidthConstant = totalGutterWidth
        self.containerHeightConstant = totalGutterHeight
        
        self.widthMultiplier = widthMultiplier
        self.heightMultiplier = heightMultiplier
        self.widthConstant = widthConstant
        self.heightConstant = heightConstant
        
        self.xMultipliers = xMultipliers
        self.yMultipliers = yMultipliers
        self.xConstants = xConstants
        self.yConstants = yConstants
        
    }
    
    static func getOriginMultiplier(
        maxColumnElementCount: Int,
        elementCount: Int,
        index: Int
    ) -> CGFloat {
        let widthMult = 1 / CGFloat (maxColumnElementCount)
        let initialMult = CGFloat(index) * widthMult
        let offsetCount = maxColumnElementCount - elementCount
        let offset = CGFloat(offsetCount) * widthMult * 0.5
        return initialMult + offset
    }
    
    static func getOriginConstant(
        gutterLengthPerElement: CGFloat,
        index: Int
    ) -> CGFloat {
        return (gutterLengthPerElement / 2) * CGFloat(index)
    }
    
    
}
