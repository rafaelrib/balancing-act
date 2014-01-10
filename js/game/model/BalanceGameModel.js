// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main model class for the balance game.
 *
 * Note: Levels in this model are zero-indexed, even though they are often
 * presented to the user as starting at level 1.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var AttachmentBar = require( 'BALANCING_ACT/common/model/AttachmentBar' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Fulcrum = require( 'BALANCING_ACT/common/model/Fulcrum' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSupportColumn = require( 'BALANCING_ACT/common/model/LevelSupportColumn' );
  var Plank = require( 'BALANCING_ACT/common/model/Plank' );
  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var TiltedSupportColumn = require( 'BALANCING_ACT/game/model/TiltedSupportColumn' );
  var Vector2 = require( 'DOT/Vector2' );

  // Constants
  var MAX_LEVELS = 4;
//  var MAX_POINTS_PER_PROBLEM = 2;
  var CHALLENGES_PER_PROBLEM_SET = 6;
  var FULCRUM_HEIGHT = 0.85; // In meters.
  var PLANK_HEIGHT = 0.75; // In meters.

  function BalanceGameModel() {
    var thisModel = this;

    PropertySet.call( this,
      {
        soundEnabled: true,
        timerEnabled: true,
        level: 0, // Zero-based in the model, though levels appear to the user to start at 1.
        challengeIndex: 0,
        score: 0,
        gameState: 'choosingLevel',
        columnState: 'singleColumns', // Valid values are none, singleColumn, doubleColumns
        elapsedTime: 0
      } );

    // Wall time at which current game was started.
    thisModel.gameStartTime = 0;

    // Best times and scores.
    thisModel.bestTimes = [];
    thisModel.bestScores = [];
    _.times( MAX_LEVELS, function() {
      thisModel.bestTimes.push( Number.POSITIVE_INFINITY );
      thisModel.bestScores.push( new Property( 0 ) );
    } );

    // TODO: Put vars below back in (commented out to enable grunt to run).
    // Counters used to track progress on the game.
//    this.challengeCount = 0;
//    this.incorrectGuessesOnCurrentChallenge = 0;

    // Current set of challenges, which collectively comprise a single level, on
    // which the user is currently working.
//    var challengeList = null;

    // Fixed masses that sit on the plank and that the user must attempt to balance.
    thisModel.fixedMasses = new ObservableArray();

    // Masses that the user moves on to the plank to counterbalance the fixed masses.
    thisModel.movableMasses = new ObservableArray();

    // Masses that the user is (or users are) moving.
    thisModel.userControlledMasses = new ObservableArray();

    // Add the plank.
    thisModel.plank = new Plank( new Vector2( 0, PLANK_HEIGHT ), new Vector2( 0, FULCRUM_HEIGHT ), thisModel.columnStateProperty, thisModel.userControlledMasses );

    // Tilted support column.  In this model, there is only one.
    var tiltedSupportColumnXPos = 1.8; // Meters, empirically chosen to look good.
    thisModel.tiltedSupportColumn = new TiltedSupportColumn( PLANK_HEIGHT + tiltedSupportColumnXPos * Math.tan( thisModel.plank.maxTiltAngle ),
      tiltedSupportColumnXPos, -thisModel.plank.maxTiltAngle );

    // Level support columns.
    thisModel.levelSupportColumns = [
      new LevelSupportColumn( PLANK_HEIGHT, -1.625 ),
      new LevelSupportColumn( PLANK_HEIGHT, 1.625 )
    ];

    // Bar that attaches the fulcrum to the pivot point.
    thisModel.attachmentBar = new AttachmentBar( thisModel.plank );

    // Fulcrum on which the plank pivots
    thisModel.fulcrum = new Fulcrum( new Dimension2( 1, FULCRUM_HEIGHT ) );
  }

  return inherit( PropertySet, BalanceGameModel,
    {
      step: function( dt ) {
        this.plank.step( dt );
        this.movableMasses.forEach( function( mass ) {
          mass.step( dt );
        } );
        this.fixedMasses.forEach( function( mass ) {
          mass.step( dt );
        } );
      },

      reset: function() {
        // TODO
      },

      startLevel: function( level ) {
        this.level = level;
        this.score = 0;
        this.challengeIndex = 0;
        this.elapsedTime = 0;

        // Set up the challenges.
        // TODO: uncomment and make work
//        this.challengeList = BalanceGameChallengeFactory.generateChallengeSet( level );

        // Set up the model for the next challenge
        // TODO: Uncomment and make work
        // this.setChallenge( this.challengeList[ 0 ], this.challengeList[ 0 ].initialColumnState );

        // Change to new game state.
        this.gameState = 'presentingInteractiveChallenge';
      },

      setChallenge: function( balanceChallenge, columnState ) {

        var thisModel = this;

        // Clear out the previous challenge (if there was one).  Start by
        // resetting the plank.
        thisModel.plank.removeAllMasses();

        // Force the plank to be level and still.  This prevents any floating
        // point inaccuracies when adding masses.
        thisModel.columnState = 'doubleColumns';

        // Clear out the masses from the previous challenge.
        thisModel.fixedMasses.clear();
        thisModel.movableMasses.clear();

        // Set up the new challenge.
        balanceChallenge.fixedMassDistancePairs.forEach( function( fixedMassDistancePair ) {
          thisModel.fixedMasses.push( fixedMassDistancePair );
          thisModel.plank.addMassToSurface( fixedMassDistancePair.mass, fixedMassDistancePair.distance );
        } );

        balanceChallenge.movableMassDistancePairs.forEach( function( mass ) {
          var initialPosition = new Vector2( 3, 0 );
          mass.position = initialPosition;
          mass.userControlled.link( function( userControlled ) {
            if ( !userControlled ) {
              // The user has dropped this mass.
              if ( !thisModel.plank.addMassToSurface( mass ) ) {
                // The attempt to add this mass to surface of plank failed,
                // probably because the mass wasn't over the plank or there
                // wasn't on open spot near where it was released.
                mass.setPosition( initialPosition );
              }
            }
          } );
          thisModel.movableMasses.add( mass );
        } );

        // Set the column state.
        thisModel.columnState = columnState;
      },

      setChoosingLevelState: function() {
        this.gameState = 'choosingLevel';
      },

      PROBLEMS_PER_LEVEL: CHALLENGES_PER_PROBLEM_SET
    } );
} );