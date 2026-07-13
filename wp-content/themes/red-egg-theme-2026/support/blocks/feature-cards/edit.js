/**
 * Feature Cards Block – Edit Component
 *
 * Editable label + heading (RichText) +
 * grid of feature-card children (single InnerBlocks).
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/feature-card', {} ],
    [ 'red-egg-block/feature-card', {} ],
    [ 'red-egg-block/feature-card', {} ],
];

const allowedBlocks = [
    'red-egg-block/feature-card',
];

const EditFeatureCards = ( { attributes, setAttributes, clientId } ) => {
    const { label, heading, bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'feature-cards' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
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
                <div className="block-wrapper">
                    <RichText
                        tagName="p"
                        className="feature-cards__label"
                        value={ label }
                        onChange={ ( val ) => setAttributes( { label: val } ) }
                        placeholder={ __( 'SECTION LABEL', 'red-egg' ) }
                        allowedFormats={ [] }
                    />
                    <RichText
                        tagName="h2"
                        className="feature-cards__heading"
                        value={ heading }
                        onChange={ ( val ) => setAttributes( { heading: val } ) }
                        placeholder={ __( 'Section heading…', 'red-egg' ) }
                    />
                    <div className="feature-cards__grid">
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

export default EditFeatureCards;
