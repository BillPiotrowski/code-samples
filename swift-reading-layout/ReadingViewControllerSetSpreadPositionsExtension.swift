//
//  NewReadingViewControllerSetSpreadPositionsExtension.swift
//  Madame Endora
//
//  Created by William Piotrowski on 8/3/22.
//

import UIKit
import MEKit
import WPCardDeck

protocol ReadingCardSetupProtocol: UIViewController {
    var cardViews: [BrowsingCardView] { get }
    var reading: Reading! { get }
    
}

extension ReadingCardSetupProtocol {
    var readingCardPositions: [ReadingCardPosition] {
        self.cardViews.enumerated().map(){
            return ReadingCardPosition(
                cardView: $0.element,
                reading: self.reading,
                index: $0.offset
            )
        }
    }
}

// MARK: exposed SETUP CARDS method
extension ReadingViewController: ReadingCardSetupProtocol {
    
    /// Add cards to superview and add tap gesture recognizer.
    ///
    /// Should only be called once, Method will remove all previous gesture recognizers and will remove from previous superview.
    func setUpCardViews(){
        for (index, cardView) in cardViews.enumerated() {
            
            Self.addCardViewToContainer(
                cardView: cardView,
                containerView: self.innerSpreadCardContainer
            )
            
            Self.addCardViewTapGesture(
                cardView: cardView,
                tapGestureTarget: self,
                tapGestureAction: #selector(self.readingSceneTapRecognizer(_:))
            )
            Self.setSpreadCardViewConstraints(
                cardView: cardView,
                containerView: self.innerSpreadCardContainer,
                widthMultiplier: self.readingLayout.widthMultiplier,
                widthConstant: self.readingLayout.widthConstant,
                heightMultiplier: self.readingLayout.heightMultiplier,
                heightConstant: self.readingLayout.heightConstant,
                xMultiplier: self.readingLayout.xMultipliers[index],
                xConstant: self.readingLayout.xConstants[index],
                yMultiplier: self.readingLayout.yMultipliers[index],
                yConstant: self.readingLayout.yConstants[index]
            )
        }
    }
}


// MARK: exposed SET CARD IMAGEs method
extension ReadingViewController {
    func setCardImages(){
        for readingCard in self.readingCardPositions {
            Self.setCardImage(readingCardPosition: readingCard)
        }
    }
}


// MARK: SET CARD IMAGE method
extension ReadingCardSetupProtocol {
    static func setCardImage(
        readingCardPosition: ReadingCardPosition
    ){
        readingCardPosition.cardView?.isHidden = false
        readingCardPosition.cardView?.imageView.image = readingCardPosition.image.uiImage
        if let label = readingCardPosition.text {
            readingCardPosition.cardView?.setLabel(text: label)
        } else {
            readingCardPosition.cardView?.hideLabels()
        }
    }
}

// MARK: ADD CARD TO CONTAINER method
extension ReadingCardSetupProtocol {
    static func addCardViewToContainer(
        cardView: BrowsingCardView,
        containerView: UIView
    ){
        
        // Hide black overlay - hopefully make it default to hidden in future.
        cardView.blackOverlayView.isHidden = true
        
        cardView.removeFromSuperview()
        
        containerView.addSubview(cardView)
    }
}




// MARK: ADD TAP GESTURE method
extension ReadingCardSetupProtocol {
    static func addCardViewTapGesture(
        cardView: BrowsingCardView,
        tapGestureTarget: ReadingViewController,
        tapGestureAction: Selector
    ){
        Self.removeGestureRecognizers(from: cardView)
        
        let tap = UITapGestureRecognizer(
            target: tapGestureTarget,
            action: tapGestureAction
        )
        cardView.addGestureRecognizer(tap)
    }
}




// MARK: REMOVE TAP GESTURES method
extension ReadingCardSetupProtocol {
    static func removeGestureRecognizers(from view: UIView){
        for gesture in view.gestureRecognizers ?? [] {
            view.removeGestureRecognizer(gesture)
        }
    }
    
}




// MARK: SET CARD VIEW CONSTRAINTS method
extension ReadingCardSetupProtocol {
    /// Iterates through each card view in the spread and sets constraint based on readingLayout.
    ///
    /// Deactivates all previous constraints.
    ///
    /// - note: this deactivation is very fragile. May be error-prone in the future.
    static func setSpreadCardViewConstraints(
        cardView: BrowsingCardView,
        containerView: UIView,
        widthMultiplier: CGFloat,
        widthConstant: CGFloat,
        heightMultiplier: CGFloat,
        heightConstant: CGFloat,
        xMultiplier: CGFloat,
        xConstant: CGFloat,
        yMultiplier: CGFloat,
        yConstant: CGFloat
    ){
        cardView.translatesAutoresizingMaskIntoConstraints = false
        
        let previousConstraints = ReadingLayout.getAllConstraints(
            for: cardView,
            in: containerView
        )
        
        
//            cardView.translatesAutoresizingMaskIntoConstraints = false
        /*
         This is incredibly fragile.
         For some reason, you can not deactivate from `cardView.constraints`
         Must get from parsing arraw of constraints in `self.spreadView`
         Which is strange because the deckViews must be `self.readingSceneView`
         To test that this (and other card constraints) work, place the constraint setting function in viewDidAppear or viewWillAppear.
         Then navigate to and from Reading Info page.
         Ensure there are no error warnings when overriding old constraints.
         */
        NSLayoutConstraint.deactivate(previousConstraints)
        
        
        let widthConstraint = NSLayoutConstraint(
            item: cardView,
            attribute: .width,
            relatedBy: .equal,
            toItem: containerView,
            attribute: .width,
            multiplier: widthMultiplier,
            constant: widthConstant
        )
        
        // UNIT TEST POSITION IMAGE MATCHES CARD IMAGES
        let heightConstraint = NSLayoutConstraint(
            item: cardView,
            attribute: .height,
            relatedBy: .equal,
            toItem: containerView,
            attribute: .height,
            multiplier: heightMultiplier,
            constant: heightConstant
        )
    
    
        let preparedXToAttribute: NSLayoutConstraint.Attribute = (xMultiplier == 0) ? .left : .right
        let preparedXMultiplier: CGFloat = (xMultiplier == 0) ? 1 : xMultiplier
            
        let xConstraint = NSLayoutConstraint(
            item: cardView,
            attribute: .left,
            relatedBy: .equal,
            toItem: containerView,
            attribute: preparedXToAttribute,
            multiplier: preparedXMultiplier,
            constant: xConstant
        )
        
        
        let preparedYToAttribute: NSLayoutConstraint.Attribute = (yMultiplier == 0) ? .top : .bottom
        let preparedYMultiplier: CGFloat = (yMultiplier == 0) ? 1 : yMultiplier
        
        let yConstraint = NSLayoutConstraint(
            item: cardView,
            attribute: .top,
            relatedBy: .equal,
            toItem: cardView.superview!,
            attribute: preparedYToAttribute,
            multiplier: preparedYMultiplier,
            constant: yConstant
        )
        
//            heightConstraint.priority = UILayoutPriority(rawValue: 995)
//            let aspectRatioConstraint = NSLayoutConstraint(
//                item: cardView,
//                attribute: .height,
//                relatedBy: .equal,
//                toItem: cardView,
//                attribute: .width,
//                multiplier: 1/0.579242636746143,
//                constant: 0
//            )
//
//            aspectRatioConstraint.isActive = true
        
        widthConstraint.isActive = true
        heightConstraint.isActive = true
        xConstraint.isActive = true
        yConstraint.isActive = true
    }
}
