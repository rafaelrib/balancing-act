// Copyright 2002-2013, University of Colorado Boulder

/**
 * Type that defines the "Balance Lab" screen.
 */
define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var BasicBalanceScreen = require( 'BALANCING_ACT/common/view/BasicBalanceScreen' );
  var MassKitSelectionNode = require( 'BALANCING_ACT/common/view/MassKitSelectionNode' );
  var HStrut = require( 'BALANCING_ACT/common/view/HStrut' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // Constants
  var PANEL_X_MARGIN = 5;

  /**
   * @param model
   * @constructor
   */
  function BalanceLabScreen( model ) {
    BasicBalanceScreen.call( this, model );
    var thisScreen = this;

    // Add the mass selection carousel.
    this.massKitSelectionNode = new MassKitSelectionNode( model, thisScreen.mvt );
    thisScreen.nonMassLayer.addChild( new Panel( new VBox(
      {
        children: [
          new HStrut( thisScreen.controlPanelBounds.width - PANEL_X_MARGIN * 2 ),
          this.massKitSelectionNode ]
      } ),
      {
        centerX: thisScreen.controlPanelBounds.centerX,
        top: thisScreen.controlPanelBounds.bottom + 5,
        xMargin: PANEL_X_MARGIN,
        fill: 'rgb( 240, 240, 240 )'
      } ) );
  }

  return inherit( BasicBalanceScreen, BalanceLabScreen, {
    reset: function() {
      this.massKitSelectionNode.reset();
      BasicBalanceScreen.prototype.reset.call( this );
    }
  } );
} );

