/**
 * Vibe CTA Block – Edit Component
 *
 * Scrolling marquee text (single line) with
 * InnerBlocks for CTA buttons below.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
        [ 'core/button', { text: 'HIRE US', className: 'is-style-outline-gray' } ],
        [ 'core/button', { text: 'JOIN US', className: 'is-style-outline-gray' } ],
    ] ],
];

const allowedBlocks = [
    'core/buttons',
    'core/button',
];

/**
 * Build scrolling display text.
 * Repeats the phrase with bullet separators for seamless scroll.
 */
const buildMarqueeDisplay = ( text ) => {
    if ( ! text ) return '';
    return text.trim().toUpperCase() + ' ';
};

const EditVibeCta = ( { attributes, setAttributes, clientId } ) => {
    const {
        marqueeText, marqueeSpeed,
        bgColor, bgSlug,
        padding, margin, blockId,
    } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'vibe-cta' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    const displayText = buildMarqueeDisplay( marqueeText );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
                <PanelBody
                    title={ __( 'Scrolling Text', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <TextControl
                        label={ __( 'Marquee Text', 'red-egg' ) }
                        value={ marqueeText }
                        onChange={ ( val ) => setAttributes( { marqueeText: val } ) }
                        help={ __( 'e.g. DIG OUR VIBE?', 'red-egg' ) }
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
                <div className="vibe-cta__marquee">
                    <div className="vibe-cta__marquee-line">
                        <span>{ displayText }</span>
                        <span>{ displayText }</span>
                        <span>{ displayText }</span>
                        <span>{ displayText }</span>
                    </div>
                </div>

                <div className="block-wrapper">
                    <div className="vibe-cta__buttons">
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

export default EditVibeCta;
