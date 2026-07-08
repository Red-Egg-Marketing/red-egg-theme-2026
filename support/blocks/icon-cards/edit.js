const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const ALLOWED_BLOCKS = [ 'red-egg-block/icon-card' ];

const TEMPLATE = [
    [ 'red-egg-block/icon-card', {} ],
    [ 'red-egg-block/icon-card', {} ],
    [ 'red-egg-block/icon-card', {} ],
];

const EditIconCards = ( { attributes, setAttributes, clientId } ) => {
    const { eyebrow, heading, columns, bgColor, bgSlug, padding, margin } = attributes;

    const blockId = `block-${ clientId }`;
    const blockProps = useBlockProps( {
        id: blockId,
        className: 'icon-cards' + ( bgSlug ? ' ' + bgSlug : '' ),
        style: bgColor ? { backgroundColor: bgColor } : {},
    } );

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Layout', 'red-egg' ) } initialOpen={ true }>
                    <RangeControl
                        label={ __( 'Columns', 'red-egg' ) }
                        value={ columns }
                        onChange={ ( val ) => setAttributes( { columns: val } ) }
                        min={ 1 }
                        max={ 4 }
                    />
                </PanelBody>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                    title={ __( 'Section Background', 'red-egg' ) }
                />
            </InspectorControls>

            <PaddingSelector padding={ padding } id={ blockId } setAttributes={ setAttributes } />
            <MarginSelector margin={ margin } id={ blockId } setAttributes={ setAttributes } />

            <div { ...blockProps }>
                <div className="block-wrapper">
                    <div className="icon-cards-header">
                        <RichText
                            tagName="span"
                            className="icon-cards-eyebrow"
                            value={ eyebrow }
                            onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
                            placeholder={ __( 'EYEBROW', 'red-egg' ) }
                            allowedFormats={ [] }
                        />
                        <RichText
                            tagName="h2"
                            className="icon-cards-heading"
                            value={ heading }
                            onChange={ ( val ) => setAttributes( { heading: val } ) }
                            placeholder={ __( 'Section heading…', 'red-egg' ) }
                        />
                    </div>
                    <div className={ 'icon-cards-grid cols-' + columns }>
                        <InnerBlocks
                            allowedBlocks={ ALLOWED_BLOCKS }
                            template={ TEMPLATE }
                            templateLock={ false }
                            orientation="horizontal"
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditIconCards;
