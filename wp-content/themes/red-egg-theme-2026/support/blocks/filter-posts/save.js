/**
 * Filter Posts Block – Save Component
 *
 * Outputs the editable hero (InnerBlocks) outside the
 * block-wrapper, then a hydration root for frontend.js.
 * hiddenTaxonomies is passed through a data attribute so
 * the frontend can drop those taxonomies from the filters.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveFilterPosts = ( { attributes } ) => {
    const { hiddenTaxonomies, initialCount, orderby, order, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'filter-posts',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="filter-posts__hero">
                    <InnerBlocks.Content />
                </div>
                <div className="block-wrapper">
                    <div
                        id="FilterPostsRoot"
                        data-hidden-taxonomies={ JSON.stringify( hiddenTaxonomies || [] ) }
                        data-initial-count={ initialCount !== 9 ? initialCount : undefined }
                        data-orderby={ orderby !== 'date' ? orderby : undefined }
                        data-order={ order !== 'DESC' ? order : undefined }
                    ></div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveFilterPosts;
