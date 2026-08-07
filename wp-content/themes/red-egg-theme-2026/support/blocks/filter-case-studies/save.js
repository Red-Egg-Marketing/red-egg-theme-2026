/**
 * Filter Case Studies Block – Save Component
 *
 * Outputs a root element for frontend.js to hydrate.
 * No static content — everything rendered client-side.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveFilterCaseStudies = ( { attributes } ) => {
    const { initialCount, orderby, order, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'filter-case-studies',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="filter-case-studies__hero">
                    <InnerBlocks.Content />
                </div>
                <div className="block-wrapper">
                    <div
                        id="FilterCaseStudiesRoot"
                        data-initial-count={ initialCount !== 9 ? initialCount : undefined }
                        data-orderby={ orderby !== 'date' ? orderby : undefined }
                        data-order={ order !== 'DESC' ? order : undefined }
                    ></div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveFilterCaseStudies;
