/**
 * Columns Group Block – Edit Component
 *
 * InnerBlocks container for header-intro + image-text.
 * BackgroundColor in InspectorControls.
 */

const { Fragment, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'red-egg-block/image-text', {} ],
];

const allowedBlocks = [
    'red-egg-block/image-text',
    'red-egg-block/header-intro',
];

const EditColumnsGroup = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'columns-group' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    const bgStyle = bgColor ? { backgroundColor: bgColor } : {};

    return (
        <Fragment>
            <InspectorControls>
                <BackgroundColor
                    bgColor={ bgColor }
                    bgSlug={ bgSlug }
                    setAttributes={ setAttributes }
                    title="Background Color"
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

            <div { ...blockProps } style={ bgStyle }>
                <div className="block-wrapper">
                    <div className="block-content">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditColumnsGroup;
