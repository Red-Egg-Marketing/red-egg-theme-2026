/**
 * Feature Cards Block – Edit Component
 *
 * Single InnerBlocks: header-single + feature-card children.
 * grid of feature-card children (single InnerBlocks).
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps, useInnerBlocksProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-single', {} ],
    [ 'red-egg-block/feature-card', {} ],
    [ 'red-egg-block/feature-card', {} ],
    [ 'red-egg-block/feature-card', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-single',
    'red-egg-block/feature-card',
];

const EditFeatureCards = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'feature-cards' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    // Spread the inner-blocks props onto .block-content so the block
    // children render as its DIRECT children (no .block-editor-inner-blocks
    // / __layout wrappers). The frontend .block-content grid then applies in
    // the editor too — no editor-only override needed.
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'block-content' },
        { template, allowedBlocks }
    );

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
                    <div { ...innerBlocksProps } />
                </div>
            </section>
        </Fragment>
    );
};

export default EditFeatureCards;
