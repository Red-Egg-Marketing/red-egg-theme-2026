/**
 * Case Study Stats Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCaseStudyStats = ( { attributes } ) => {
    const { padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'case-study-stats',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
                <div className="case-study-stats__label">
                    <span>KEY METRICS</span>
                </div>
                <div className="case-study-stats__grid">
                    <InnerBlocks.Content />
                </div>
            </div>
        </Fragment>
    );
};

export default SaveCaseStudyStats;
