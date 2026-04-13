/**
 * Text Cards Grid Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTextCardsGrid = ( { attributes } ) => {
    const { columns, bgColor, bgSlug, padding, margin } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'text-cards-grid'
            + ' columns-' + columns
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' ),
    } );

    const blockId = blockProps.id;
    const bgStyle = bgColor ? { backgroundColor: bgColor } : {};

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps } style={ bgStyle }>
                <div className="block-wrapper">
                    <div className="block-content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveTextCardsGrid;
