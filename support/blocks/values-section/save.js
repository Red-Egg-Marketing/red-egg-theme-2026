/**
 * Values Section Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

/**
 * Build marquee display string from comma-separated input.
 */
const buildMarqueeText = ( input ) => {
    if ( ! input ) return '';
    return input
        .split( ',' )
        .map( ( word ) => word.trim().toUpperCase() )
        .filter( ( word ) => word )
        .join( ' \u2022 ' ) + ' \u2022 ';
};

const SaveValuesSection = ( { attributes } ) => {
    const {
        marqueeLineOne, marqueeLineTwo, marqueeSpeed,
        padding, margin, blockId,
    } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'values-section',
    } );

    const lineOneText = buildMarqueeText( marqueeLineOne );
    const lineTwoText = buildMarqueeText( marqueeLineTwo );

    const speedStyle = { animationDuration: marqueeSpeed + 's' };

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="values-section__marquee" aria-hidden="true">
                    <div className="values-section__marquee-line" style={ speedStyle }>
                        <span>{ lineOneText }</span>
                        <span>{ lineOneText }</span>
                    </div>
                    <div className="values-section__marquee-line values-section__marquee-line--reverse" style={ speedStyle }>
                        <span>{ lineTwoText }</span>
                        <span>{ lineTwoText }</span>
                    </div>
                </div>

                <div className="block-wrapper">
                    <div className="block-content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveValuesSection;
