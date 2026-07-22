/**
 * Word Rotater – Frontend
 *
 * Finds all .rotate-words elements, reads the comma-separated
 * words attribute, and types them out letter by letter on a loop.
 * Only activates when the element scrolls into view.
 */

import { onPageView } from '../../js/lifecycle';

( function() {

    function WordRotater() {
        var win = window;
        // Only bind unclaimed elements (main.js runs twice + SPA re-runs)
        var words = Array.prototype.filter.call(
            document.querySelectorAll( '.rotate-words' ),
            function ( w ) { return ! w.dataset.rotateInit; }
        );
        words.forEach( function ( w ) { w.dataset.rotateInit = '1'; } );
        var winHeight = win.innerHeight;
        var intervals = [];

        if ( words.length === 0 ) return;

        words.forEach( function( word, index ) {
            intervals[ index ] = { hasInterval: false, active: true };
        } );

        win.addEventListener( 'load', detectScrollPosition );
        win.addEventListener( 'scroll', detectScrollPosition );

        function detectScrollPosition() {
            // Self-cleanup after an SPA swap removed our elements
            if ( words[ 0 ] && ! document.contains( words[ 0 ] ) ) {
                win.removeEventListener( 'scroll', detectScrollPosition );
                win.removeEventListener( 'load', detectScrollPosition );
                return;
            }

            winHeight = win.innerHeight;

            words.forEach( function( word, index ) {
                var rect = word.getBoundingClientRect();
                var elemTop = rect.top;
                var elemBottom = rect.bottom;
                var isVisible = ( elemTop >= 0 ) && ( elemBottom <= winHeight );

                if ( isVisible ) {
                    var wordList = word.getAttribute( 'words' );
                    if ( ! wordList || wordList.length === 0 ) return;

                    wordList = wordList.split( ',' );

                    var wordArrays = wordList.map( function( w ) {
                        return w.split( '' );
                    } );

                    var counter = 0;
                    var letterCounter = 0;
                    var size = wordArrays.length;
                    var interval;
                    var paused = 0;

                    if ( ! intervals[ index ].hasInterval ) {
                        intervals[ index ].hasInterval = true;

                        interval = setInterval( function() {
                            if ( paused === 0 ) {
                                word.classList.remove( 'highlight' );

                                var newWord = wordArrays[ counter ];
                                var newWordSize = newWord.length;
                                var uString = newWord.slice( 0, letterCounter ).join( '' );
                                word.innerHTML = uString;

                                if ( letterCounter === newWordSize ) {
                                    counter = counter < ( size - 1 ) ? counter + 1 : 0;
                                    letterCounter = 0;
                                    paused = false;
                                    word.classList.add( 'waiting' );
                                    setTimeout( function() {
                                        word.classList.add( 'highlight' );
                                        paused = 1;
                                    }, 1500 );
                                }

                                letterCounter = letterCounter < newWordSize ? letterCounter + 1 : 0;

                                if ( intervals[ index ].active === false ) {
                                    clearInterval( interval );
                                    interval = undefined;
                                }
                            } else if ( paused === 1 ) {
                                setTimeout( function() {
                                    paused = 0;
                                }, 200 );
                            }
                        }, 70 );
                    }
                }
            } );
        }
    }

    onPageView( WordRotater );

} )();
