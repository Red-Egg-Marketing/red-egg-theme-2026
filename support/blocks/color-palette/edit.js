/**
 * Color Palette Block – Edit Component
 *
 * InnerBlocks: header-intro-left (label + heading), then color-swatch children.
 * Swatches laid out in a CSS grid that matches the Figma
 * (2 large on top, 3 smaller on bottom).
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro-left', {} ],
    [ 'red-egg-block/color-swatch', { color: '#024D69', label: 'BLUE' } ],
    [ 'red-egg-block/color-swatch', { color: '#D4982A', label: 'GOLD' } ],
    [ 'red-egg-block/color-swatch', { color: '#8FA3A8', label: 'SILVER' } ],
    [ 'red-egg-block/color-swatch', { color: '#BCC9CE', label: 'LIGHT SILVER' } ],
    [ 'red-egg-block/color-swatch', { color: '#EADEC9', label: 'LIGHT NEUTRAL' } ],
];

const allowedBlocks = [
    'red-egg-block/header-intro-left',
    'red-egg-block/color-swatch',
];

const EditColorPalette = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'color-palette-block',
    } );

    return (
        <Fragment>
            <InspectorControls>
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
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
            </section>
        </Fragment>
    );
};

export default EditColorPalette;
