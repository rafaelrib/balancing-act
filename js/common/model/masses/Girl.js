// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model class that represents a girl who is roughly 10 years old.  The height
 * and weight information came from:
 * http://www.disabled-world.com/artman/publish/height-weight-teens.shtml
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var girlSittingImage = require( 'image!BALANCING_ACT/girl-sitting.png' );
  var girlStandingImage = require( 'image!BALANCING_ACT/girl-standing.png' );
  var inherit = require( 'PHET_CORE/inherit' );
  var HumanMass = require( 'BALANCING_ACT/common/model/masses/HumanMass' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var MASS = 30; // in kg
  var STANDING_HEIGHT = 1.3; // In meters.
  var SITTING_HEIGHT = 0.75; // In meters.
  var SITTING_CENTER_OF_MASS_X_OFFSET = 0.07; // In meters, determined visually.  Update if image changes.

  /**
   * @constructor
   */
  function Girl() {
    HumanMass.call( this, MASS, girlStandingImage, STANDING_HEIGHT, girlSittingImage, SITTING_HEIGHT,
      Vector2.ZERO, SITTING_CENTER_OF_MASS_X_OFFSET, false );
  }

  return inherit( HumanMass, Girl );
} );