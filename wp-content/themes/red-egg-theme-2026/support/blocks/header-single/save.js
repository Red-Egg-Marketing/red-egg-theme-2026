/**
 * Header Single – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHeaderSingle = ( { attributes } ) => {
    const { padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'header-single',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
                <div className="header-single__inner">
                    <InnerBlocks.Content />
                </div>
            </div>
        </Fragment>
    );
};

export default SaveHeaderSingle;
