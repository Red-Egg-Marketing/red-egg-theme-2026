/**
 * Case Study Gallery Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveCaseStudyGallery = ( { attributes } ) => {
    const { bgSlug, padding, margin, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'cs-gallery' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

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

export default SaveCaseStudyGallery;
