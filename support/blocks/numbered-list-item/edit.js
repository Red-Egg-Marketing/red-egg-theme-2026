/**
 * Numbered List Item – Edit Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

import NumberBadge from '../../components/NumberBadge.js';

const template = [
    [ 'core/heading', { level: 3, placeholder: 'Item Title' } ],
    [ 'core/paragraph', { placeholder: 'Item description...' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
];

const EditNumberedListItem = ( { attributes, setAttributes } ) => {
    const { badge } = attributes;

    const blockProps = useBlockProps( {
        className: 'numbered-list__item',
    } );

    return (
        <div { ...blockProps }>
            <div className="numbered-list__badge">
                <NumberBadge
                    value={ badge }
                    onChange={ ( val ) => setAttributes( { badge: val } ) }
                />
            </div>
            <div className="numbered-list__item-content">
                <InnerBlocks
                    template={ template }
                    allowedBlocks={ allowedBlocks }
                />
            </div>
        </div>
    );
};

export default EditNumberedListItem;
