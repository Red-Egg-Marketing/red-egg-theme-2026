/**
 * Custom Video Controls
 *
 * Shows a play button overlay on videos. Clicking plays
 * the video and shows native controls. When paused
 * (not seeking), the overlay returns.
 */

( function() {

    function CustomVideoControls() {
        var buttons = document.querySelectorAll( '.custom-video-button' );

        if ( buttons.length === 0 ) return;

        buttons.forEach( function( bttn ) {
            var vid = bttn.nextElementSibling;
            var par = bttn.parentNode;

            if ( ! vid || vid.tagName !== 'VIDEO' ) return;

            bttn.addEventListener( 'click', function() {
                par.classList.add( 'playing' );
                vid.setAttribute( 'controls', true );
                vid.controls = true;
                vid.play();
            } );

            vid.addEventListener( 'pause', function() {
                var seek = vid.seeking;

                if ( seek === false ) {
                    par.classList.remove( 'playing' );
                    vid.setAttribute( 'controls', false );
                    vid.controls = false;
                }
            } );
        } );
    }

    // Run on DOMContentLoaded and also immediately for late-loading scripts
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', CustomVideoControls );
    } else {
        CustomVideoControls();
    }

} )();
