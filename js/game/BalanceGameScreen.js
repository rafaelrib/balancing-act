// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Intro' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var BalanceGameModel = require( 'BALANCING_ACT/game/model/BalanceGameModel' );
  var BalanceGameView = require( 'BALANCING_ACT/game/view/BalanceGameView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var gameString = require( 'string!BALANCING_ACT/game' );

  // images
  var gameIcon = require( 'image!BALANCING_ACT/game-icon.png' );
  var gameIconSmall = require( 'image!BALANCING_ACT/game-icon-small.png' );

  function BalanceGameScreen() {
    Screen.call( this,
      gameString,
      new Image( gameIcon ),
      function() { return new BalanceGameModel(); },
      function( model ) { return new BalanceGameView( model ); },
      {
        navigationBarIcon: new Image( gameIconSmall )
      } );
  }

  return inherit( Screen, BalanceGameScreen );
} );