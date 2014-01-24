// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var inherit = require( 'PHET_CORE/inherit' );
  var ImageMass = require( 'BALANCING_ACT/common/model/ImageMass' );
  var blueBucketImage = require( 'image!BALANCING_ACT/blue-bucket.png' );

  // Constants
  var MASS = 2.5; // In kg
  var HEIGHT = 0.3; // In meters

  /**
   * @param initialPosition
   * @param isMystery
   * @constructor
   */
  function SmallBucket( initialPosition, isMystery ) {
    ImageMass.call( this, MASS, blueBucketImage, HEIGHT, initialPosition, isMystery );
  }

  return inherit( ImageMass, SmallBucket,
    {
      createCopy: function() {
        return new SmallBucket( this.position.copy(), this.isMystery );
      }
    } );
} );