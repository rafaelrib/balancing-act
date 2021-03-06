// Copyright 2002-2013, University of Colorado Boulder

/**
 * Class that depicts a vector that has an origin as well as x and y components,
 * and that monitors the vector and updates the representation when changes
 * occur.
 *
 * NOTE: This only works with downward pointing vectors, which is what was
 * needed for Balancing Act.  This would need to be generalized to support
 * vectors pointing in other directions.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param positionedVectorProperty
   * @param visibilityProperty
   * @param scalingFactor
   * @param mvt
   * @param {Object} [options]
   * @constructor
   */
  function PositionedVectorNode( positionedVectorProperty, scalingFactor, visibilityProperty, mvt, options ) {
    Node.call( this );
    var thisNode = this;

    options = _.extend(
      {
        fill: 'white',
        stroke: 'black',
        lineWidth: 1,
        headHeight: 8,
        headWidth: 12,
        tailWidth: 5
      }, options );

    // Create the vector node and add it as a child.
    var length = positionedVectorProperty.value.vector.magnitude() * scalingFactor;
    thisNode.addChild( new ArrowNode( 0, 0, 0, length, options ) );

    positionedVectorProperty.link( function( positionedVector ) {
      thisNode.centerX = mvt.modelToViewX( positionedVector.origin.x );
      thisNode.top = mvt.modelToViewY( positionedVector.origin.y );
    } );

    visibilityProperty.link( function( visible ) {
      thisNode.visible = visible;
    } );
  }

  return inherit( Node, PositionedVectorNode );
} );
