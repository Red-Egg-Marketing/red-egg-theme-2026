/**
 * Text Cards Grid Block – Edit Component
 *
 * Uses InnerBlocks with header-intro and flip-card children.
 * InspectorControls: background style, background color, columns.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import Columns from '../../components/Columns.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
    [ 'red-egg-block/flip-card', {} ],
];

const allowedBlocks = [
    'red-egg-block/flip-card',
    'red-egg-block/header-intro',
    'core/buttons',
];

const bgOptions = [
    { label: __( '--', 'red-egg' ), value: '' },
    { label: __( 'Left partial box', 'red-egg' ), value: 'left-partial-box' },
    { label: __( 'Left partial box with airplane', 'red-egg' ), value: 'left-partial-box-plane' },
    { label: __( 'Right partial box', 'red-egg' ), value: 'right-partial-box' },
];

const EditTextCardsGrid = ( { attributes, setAttributes, clientId } ) => {
    const { columns, bgColor, bgSlug, padding, margin } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'text-cards-grid'
            + ' columns-' + columns
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
    } );

    const bgStyle = bgColor ? { backgroundColor: bgColor } : {};

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Background Style', 'red-egg' ) }
                    initialOpen={ true }
                >
                    <SelectControl
                        label={ __( 'Background Style', 'red-egg' ) }
                        value={ bgSlug }
                        options={ bgOptions }
                        onChange={ ( value ) => setAttributes( { bgSlug: value } ) }
                    />
                </PanelBody>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                />
                <Columns
                    setAttributes={ setAttributes }
                    columns={ columns }
                />
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps } style={ bgStyle }>
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

export default EditTextCardsGrid;
