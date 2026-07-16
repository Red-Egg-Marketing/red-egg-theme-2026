/**
 * Header Single – Edit Component
 *
 * InnerBlocks: label (paragraph) + heading + description (paragraph),
 * stacked in a single column.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/paragraph', { placeholder: 'SECTION LABEL', className: 'header-single__label' } ],
    [ 'core/heading', { level: 2, placeholder: 'Section heading…', className: 'header-single__heading' } ],
    [ 'core/paragraph', { placeholder: 'Description…', className: 'header-single__desc' } ],
];

const allowedBlocks = [
    'core/paragraph',
    'core/heading',
];

const EditHeaderSingle = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'header-single',
    } );

    return (
        <Fragment>
            <PaddingSelector padding={ padding } id={ 'block-' + clientId } setAttributes={ setAttributes } />
            <MarginSelector margin={ margin } id={ 'block-' + clientId } setAttributes={ setAttributes } />

            <div { ...blockProps }>
                <div className="header-single__inner">
                    <InnerBlocks template={ template } allowedBlocks={ allowedBlocks } />
                </div>
            </div>
        </Fragment>
    );
};

export default EditHeaderSingle;
