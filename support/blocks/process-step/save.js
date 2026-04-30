/**
 * Process Step – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

import TagCloud from '../../components/TagCloud.js';

const SaveProcessStep = ( { attributes } ) => {
    const { tags } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'process-step',
    } );

    return (
        <div { ...blockProps }>
            <div className="process-step__row">
                <div className="process-step__content">
                    <InnerBlocks.Content />
                </div>
                <div className="process-step__tags">
                    <TagCloud.View tags={ tags } />
                </div>
            </div>
        </div>
    );
};

export default SaveProcessStep;
