/**
 * Text Cards Grid Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTextCardsGrid = ( { attributes } ) => {
    const { padding, margin } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'text-cards-grid',
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="block-wrapper">
                    <InnerBlocks.Content />
                </div>
            </section>
        </Fragment>
    );
};

export default SaveTextCardsGrid;
