const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { __ } = wp.i18n;

import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const template = [
    [ 'core/heading', { level: 2, placeholder: 'Section heading...' } ],
    [ 'core/paragraph', { placeholder: 'Section description...' } ],
    [ 'core/columns', {} ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/columns',
    'core/column',
    'core/image',
    'core/buttons',
    'core/group',
    'core/separator',
    'core/spacer',
    'core/list',
    'core/list-item',
];

const EditColumnsGroup = ( { attributes, setAttributes, clientId } ) => {
    const { bgColor, bgSlug, padding, margin } = attributes;

    const blockId = `block-${ clientId }`;

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'columns-group' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    // Apply background color inline if set
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
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
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
                </div><!-- .block-wrapper -->
            </div>
        </Fragment>
    );
};

export default EditColumnsGroup;
