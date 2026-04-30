/**
 * Process Step – Edit Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import NumberBadge from '../../components/NumberBadge.js';
import TagCloud from '../../components/TagCloud.js';

const template = [
    [ 'core/heading', { level: 3, placeholder: 'BRAND DISCOVERY' } ],
    [ 'core/paragraph', { placeholder: 'Step description...' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
];

const EditProcessStep = ( { attributes, setAttributes } ) => {
    const { badge, tags } = attributes;

    const blockProps = useBlockProps( {
        className: 'process-step',
    } );

    return (
        <div { ...blockProps }>
            <div className="process-step__row">
                <div className="process-step__badge">
                    <NumberBadge
                        value={ badge }
                        onChange={ ( val ) => setAttributes( { badge: val } ) }
                    />
                </div>
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
