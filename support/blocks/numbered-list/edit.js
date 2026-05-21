/**
 * Numbered List Items Block – Edit Component
 *
 * Two-column layout: header-intro (left) + numbered-list-item children (right).
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/numbered-list-items', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'red-egg-block/numbered-list-items',
];

const EditNumberedList = ( { attributes, setAttributes, clientId } ) => {
    const { padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'numbered-list',
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
                <div className="numbered-list__bg"></div>
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

export default EditNumberedList;
