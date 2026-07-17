/**
 * Color Palette Block – Edit Component
 *
 * InnerBlocks: header-intro-left (label + heading), then color-swatch children.
 * Swatches laid out in a CSS grid that matches the Figma
 * (2 large on top, 3 smaller on bottom).
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps, useInnerBlocksProps } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-single', {} ],
    [ 'red-egg-block/color-swatch', { color: '#024D69', label: 'BLUE' } ],
    [ 'red-egg-block/color-swatch', { color: '#D4982A', label: 'GOLD' } ],
    [ 'red-egg-block/color-swatch', { color: '#8FA3A8', label: 'SILVER' } ],
    [ 'red-egg-block/color-swatch', { color: '#BCC9CE', label: 'LIGHT SILVER' } ],
    [ 'red-egg-block/color-swatch', { color: '#EADEC9', label: 'LIGHT NEUTRAL' } ],
];

const allowedBlocks = [
    'red-egg-block/header-single',
    'red-egg-block/color-swatch',
];

const EditColorPalette = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin, blockId, columns } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'block-wrapper' },
        { template, allowedBlocks }
    );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'color-palette-block' + ( columns && columns !== 'original' ? ' swatch-cols-' + columns : '' ),
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Swatch Layout', 'red-egg' ) } initialOpen={ true }>
                    <SelectControl
                        label={ __( 'Columns', 'red-egg' ) }
                        value={ columns }
                        options={ [
                            { label: __( 'Original grid', 'red-egg' ), value: 'original' },
                            { label: __( '2 columns', 'red-egg' ), value: '2' },
                            { label: __( '3 columns', 'red-egg' ), value: '3' },
                            { label: __( '4 columns', 'red-egg' ), value: '4' },
                        ] }
                        onChange={ ( val ) => setAttributes( { columns: val } ) }
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
                <div { ...innerBlocksProps } />
            </section>
        </Fragment>
    );
};

export default EditColorPalette;
