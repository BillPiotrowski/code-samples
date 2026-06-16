//
//  GridLocation.swift
//  Madame Endora
//
//  Created by William Piotrowski on 5/16/22.
//

import Foundation


/// Struct type that stores an object's location in the grid.
///
///
struct GridLocation {
    /// Used by Reading Layout to match correct grid layout. This is simply the elements minus one.
    let gridIndex: Int
    
    /// The total number of grid elements. Rows if measuring y alignment and columns if measuring x
    let elements: Int
    
    /// The index of the grid element the object will be placed. If measuring y origin on a 3 row grid: 0 indicates the first row, 1 the seconds, and; 2 the third.
    let index: Int
    
    init(
        elements: Int,
        index: Int
    ){
        let gridIndex = elements - 1
        
        self.elements = elements
        self.index = index
        self.gridIndex = gridIndex
    }
}

