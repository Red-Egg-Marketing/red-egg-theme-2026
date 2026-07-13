/**
 * Vibe CTA Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

/**
 * Build scrolling display text.
 */
const buildMarqueeDisplay = ( text ) => {
    if ( ! text ) return '';
    return text.trim().toUpperCase() + ' ';
};

const SaveVibeCta = ( { attributes } ) => {
    const {
        marqueeText, marqueeSpeed,
        bgSlug, padding, margin, blockId,
    } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'vibe-cta' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    const displayText = buildMarqueeDisplay( marqueeText );
    const speedStyle = { animationDuration: marqueeSpeed + 's' };

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="vibe-cta__marquee" aria-hidden="true">
                    <div className="vibe-cta__marquee-line" style={ speedStyle }>
                        <span>{ displayText }</span>
                        <span>{ displayText }</span>
                        <span>{ displayText }</span>
                        <span>{ displayText }</span>
                    </div>
                </div>

                <div className="block-wrapper">
                    <div className="vibe-cta__buttons">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveVibeCta;
