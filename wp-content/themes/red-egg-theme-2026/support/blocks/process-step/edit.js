/**
 * Process Step – Edit Component
 *
 * Uses numbered-list-item for badge + content,
 * TagCloud for keyword pills on the right.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import TagCloud from '../../components/TagCloud.js';

const template = [
    [ 'red-egg-block/numbered-list-item', {} ],
];

const allowedBlocks = [
    'red-egg-block/numbered-list-item',
];

const EditProcessStep = ( { attributes, setAttributes } ) => {
    const { tags } = attributes;

    const blockProps = useBlockProps( {
        className: 'process-step',
    } );

    return (
        <div { ...blockProps }>
            <div className="process-step__row">
                <div className="process-step__content">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </div>
                <div className="process-step__tags">
                    <TagCloud
                        tags={ tags }
                        setAttributes={ setAttributes }
                        attrKey="tags"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProcessStep;
