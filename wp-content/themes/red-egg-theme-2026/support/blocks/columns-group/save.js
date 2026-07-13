/**
 * Columns Group Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveColumnsGroup = ( { attributes } ) => {
    const { bgColor, bgSlug, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'columns-group' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    const bgStyle = bgColor ? { backgroundColor: bgColor } : {};

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps } style={ bgStyle }>
                <div className="block-wrapper">
                    <div className="block-content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SaveColumnsGroup;
