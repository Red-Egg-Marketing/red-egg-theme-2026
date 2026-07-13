/**
 * Numbered List Item – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

import NumberBadge from '../../components/NumberBadge.js';

const SaveNumberedListItem = ( { attributes } ) => {
    const { badge } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'numbered-list__item',
    } );

    return (
        <div { ...blockProps }>
            <div className="numbered-list__badge">
                <NumberBadge.View value={ badge } />
            </div>
            <div className="numbered-list__item-content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default SaveNumberedListItem;
