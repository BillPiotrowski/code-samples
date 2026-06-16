//
//  ReadingLayoutSimpleMathExtension.swift
//  Madame Endora
//
//  Created by William Piotrowski on 5/16/22.
//

import UIKit

// MARK: SIMPLE MATH
extension ReadingLayout {
    
    /// Calculates the gutter ratio in each direction relative to respective dimension.
    /// - Parameters:
    ///   - frameSize: the size of the container.
    ///   - horizontalGutterRatio: the ratio of the horizontal gutter relative to the width of container
    ///   - verticalToHorizontalGutterRatio: the ratio of the vertical gutter relative to the horizontal gutter
    /// - Returns: an XYRatio element that includes the horizontal gutter ratio relative to the container width and the vertical gutter ratio relative to the container height
//    static func getGutterRatios(
//        frameSize: CGSize,
//        horizontalGutterRatio: Double,
//        verticalToHorizontalGutterRatio: Double
//    ) -> XYRatio {
//        let horizontalGutter = Self.getElementDimension(
//            ratio: horizontalGutterRatio,
//            total: frameSize.width
//        )
//        let verticalGutter = Self.getElementDimension(
//            ratio: verticalToHorizontalGutterRatio,
//            total: horizontalGutter
//        )
//        let verticalGutterRatio = Self.getRatio(
//            elementDimension: verticalGutter,
//            totalDimension: frameSize.height
//        )
//        return XYRatio(
//            xRatio: horizontalGutterRatio,
//            yRatio: verticalGutterRatio
//        )
//    }
//    
    
    /// Calculates the ratio of a single element in relation to the total dimension.
    ///
    /// 1) Calculates total gutter amount, then
    ///
    /// 2) subtracts that from 100%, then
    ///
    /// 3) divides remaining ratio by the element count.
    /// - Parameters:
    ///   - elementCount: total count of elements
    ///   - totalDimension: the CGFloat measurement of total dimension
    ///   - gutterRatio: the ratio of a single gutter element to the total dimension.
    /// - Returns: the ratio of a single element in relation to the total dimension.
    static func getElementRatio(
        elementCount: Int,
        totalDimension: CGFloat,
        gutterRatio: Double
    ) -> Double {
        let gutterCount = Self.getGutterCount(
            elementCount: elementCount
        )
        let totalGutterRatios = Double(gutterCount) * gutterRatio
        let totalElementRatios = 1 - totalGutterRatios
        return totalElementRatios / Double(elementCount)
    }
    
    
    /// Calculate the ratio of an element
    /// - Parameters:
    ///   - elementDimension: the measurement of a single element in pixels (CGFloat)
    ///   - totalDimension: the total dimension measured in pixels (CGFloat)
    /// - Returns: the ratio of a single element relative to total dimension.
    static func getRatio(
        elementDimension: CGFloat,
        totalDimension: CGFloat
    ) -> Double {
        Double(elementDimension / totalDimension)
    }
    
    /// Calculates total dimension in pixels (CGFloat) by calculating single element and multiplying by `totalElements`.
    /// - Parameters:
    ///   - ratio: the ratio of a single element relative to total dimension
    ///   - totalElements: the total amount of elements
    ///   - totalDimension: the total dimension measured in pixels (CGFloat)
    /// - Returns: the sum measurement of all elements in pixels (CGFloat)
    static func getTotalDimension(
        ratio: Double,
        totalElements: Int,
        totalDimension: CGFloat
    ) -> CGFloat {
        let singleGutterDimension = Self.getElementDimension(
            ratio: ratio,
            total: totalDimension
        )
        return Self.getTotalDimension(
            elementDimension: singleGutterDimension,
            elementCount: totalElements
        )
    }
    
    /// Calculates by multiplying the two inputs.
    /// - Parameters:
    ///   - elementDimension: the total dimension in pixels (CGFloat)
    ///   - elementCount: total amount of all elements
    /// - Returns: the total dimension of all of the elements in pixels (CGFloat)
    static func getTotalDimension(
        elementDimension: CGFloat,
        elementCount: Int
    ) -> CGFloat {
        CGFloat(elementCount) * elementDimension
    }
    
    /// Determines the total amount of gutters given an amount of elements.
    ///
    /// - note: used to calculate to dimensions. There is always one fewer gutter than elements.
    /// - Parameter elementCount: total count of all elements
    /// - Returns: the elementCount - 1
    static func getGutterCount(
        elementCount: Int
    ) -> Int {
        elementCount - 1
    }
    
    /// Calculates element's height.
    /// - Parameters:
    ///   - aspectRatio: the aspect ratio of the element. Measured as aspectRatio : 1. A portrait will have an aspect ratio smaller than 1. Landscape will have an aspect ratio larger than 1.
    ///   - width: the element's width as measured in pixels (CGFloat)
    /// - Returns: the element's height as measured in pixels (CGFloat)
    static func getHeight(
        aspectRatio: Double,
        width: CGFloat
    ) -> CGFloat {
        width / CGFloat(aspectRatio)
    }
    
    /// Calculates the width from aspect ratio.
    /// - Parameters:
    ///   - aspectRatio: the aspect ratio of the element. Measured as aspectRatio : 1. A portrait will have an aspect ratio smaller than 1. Landscape will have an aspect ratio larger than 1.
    ///   - height: the element's height as measured in pixels (CGFloat)
    /// - Returns: the element's width as measured in pixels (CGFloat)
    static func getWidth(
        aspectRatio: Double,
        height: CGFloat
    ) -> CGFloat {
        return height * CGFloat(aspectRatio)
    }
    
    /// Calculates elements total dimension by mulitplying.
    /// - Parameters:
    ///   - ratio: the element ratio relative to total
    ///   - total: the total dimension measured in pixels (CGFloat)
    /// - Returns: the element's dimension in pixels (CGFloat)
    static func getElementDimension(
        ratio: Double,
        total: CGFloat
    ) -> CGFloat {
        total * CGFloat(ratio)
    }
    
    
}
