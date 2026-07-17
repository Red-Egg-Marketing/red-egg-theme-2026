/**
 * Section Nav – Edit Component
 *
 * InnerBlocks (core/buttons). Editors add buttons and point each
 * button URL at an on-page anchor (e.g. #the-challenge).
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/buttons', {}, [
        [ 'core/button', { text: 'Section One' } ],
        [ 'core/button', { text: 'Section Two' } ],
    ] ],
];

const allowedBlocks = [ 'core/buttons' ];

const EditSectionNav = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) setAttributes( { blockId: 'block-' + clientId } );
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'section-nav' + ( bgSlug ? ' ' + bgSlug : '' ),
        style: bgColor ? { backgroundColor: bgColor } : {},
    } );

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                    title={ __( 'Bar Background', 'red-egg' ) }
                />
            </InspectorControls>

            <PaddingSelector padding={ padding } id={ 'block-' + clientId } setAttributes={ setAttributes } />
            <MarginSelector margin={ margin } id={ 'block-' + clientId } setAttributes={ setAttributes } />

            <nav { ...blockProps } aria-label={ __( 'Section navigation', 'red-egg' ) }>
                <div className="block-wrapper">
                    <InnerBlocks template={ template } allowedBlocks={ allowedBlocks } />
                </div>
            </nav>
        </Fragment>
    );
};

export default EditSectionNav;
