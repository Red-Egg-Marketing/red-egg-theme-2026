/**
 * Values Section Block – Edit Component
 *
 * Marquee text configured in InspectorControls (comma-separated).
 * InnerBlocks for header-intro, flip-cards, and buttons.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'red-egg-block/flip-card',
    'core/buttons',
];

/**
 * Build the marquee display string from comma-separated input.
 * "VERSATILE, CREATIVE, DETAILED" becomes "VERSATILE • CREATIVE • DETAILED •"
 */
const buildMarqueeText = ( input ) => {
    if ( ! input ) return '';
    return input
        .split( ',' )
        .map( ( word ) => word.trim().toUpperCase() )
        .filter( ( word ) => word )
        .join( ' \u2022 ' ) + ' \u2022 ';
};

const EditValuesSection = ( { attributes, setAttributes, clientId } ) => {
    const {
        marqueeLineOne, marqueeLineTwo, marqueeSpeed,
        padding, margin, blockId,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'values-section',
    } );

    const lineOneText = buildMarqueeText( marqueeLineOne );
    const lineTwoText = buildMarqueeText( marqueeLineTwo );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Scrolling Marquee Text', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <TextControl
                        label={ __( 'Line 1 (comma-separated)', 'red-egg' ) }
                        value={ marqueeLineOne }
                        onChange={ ( val ) => setAttributes( { marqueeLineOne: val } ) }
                        help={ __( 'e.g. VERSATILE, CREATIVE, DETAILED, HONEST', 'red-egg' ) }
                    />
                    <TextControl
                        label={ __( 'Line 2 (comma-separated)', 'red-egg' ) }
                        value={ marqueeLineTwo }
                        onChange={ ( val ) => setAttributes( { marqueeLineTwo: val } ) }
                    />
                    <RangeControl
                        label={ __( 'Speed (seconds)', 'red-egg' ) }
                        value={ marqueeSpeed }
                        onChange={ ( val ) => setAttributes( { marqueeSpeed: val } ) }
                        min={ 10 }
                        max={ 60 }
                    />
                </PanelBody>
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <div className="values-section__marquee">
                    <div className="values-section__marquee-line">
                        <span>{ lineOneText }</span>
                        <span>{ lineOneText }</span>
                    </div>
                    <div className="values-section__marquee-line values-section__marquee-line--reverse">
                        <span>{ lineTwoText }</span>
                        <span>{ lineTwoText }</span>
                    </div>
                </div>

                <div className="block-wrapper">
                    <div className="block-content">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default EditValuesSection;
