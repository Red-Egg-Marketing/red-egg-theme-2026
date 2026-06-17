/**
 * Case Study Body Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const SaveCaseStudyBody = ( { attributes } ) => {
    const {
        label, padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition,
    } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'case-study-body',
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <BlobAnimation.View
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                />
                <div className="block-wrapper">
                    { label && (
                        <RichText.Content
                            tagName="p"
                            className="case-study-body__label"
                            value={ label }
                        />
                    ) }
                    <div className="case-study-body__content">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveCaseStudyBody;
