/**
 * Custom Video Controls
 *
 * Shows a play button overlay on videos. Clicking plays
 * the video and shows native controls. When paused
 * (not seeking), the overlay returns.
 *
 * Also wires an optional custom mute/unmute button (the video's next
 * sibling in markup, class .custom-video-mute) if present — visible
 * only while playing via CSS, toggles vid.muted on click.
 */

import { onPageView } from './lifecycle';

( function() {

    function CustomVideoControls() {
        var buttons = document.querySelectorAll( '.custom-video-button' );

        if ( buttons.length === 0 ) return;

        buttons.forEach( function( bttn ) {
            if ( bttn.dataset.videoBound ) return;
            bttn.dataset.videoBound = '1';

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

            // ---- Mute toggle ----
            // Sibling of the video (inserted right after it in markup),
            // shown only while .playing via CSS, mirroring the play
            // button's own visibility toggle.
            var muteBtn = vid.nextElementSibling;
            if ( muteBtn && muteBtn.classList.contains( 'custom-video-mute' ) ) {
                var syncMuteState = function() {
                    muteBtn.classList.toggle( 'is-muted', vid.muted );
                    muteBtn.setAttribute( 'aria-pressed', vid.muted ? 'true' : 'false' );
                    muteBtn.setAttribute(
                        'aria-label',
                        vid.muted ? 'Unmute video' : 'Mute video'
                    );
                };

                muteBtn.addEventListener( 'click', function( e ) {
                    e.stopPropagation();
                    vid.muted = ! vid.muted;
                    syncMuteState();
                } );

                syncMuteState();
            }
        } );
    }

    // Run on DOMContentLoaded and also immediately for late-loading scripts
    onPageView( CustomVideoControls );

} )();
