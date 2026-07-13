/**
 * Numbered List Items Wrapper – Edit Component
 *
 * Simple wrapper that holds numbered-list-item children.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'red-egg-block/numbered-list-item', { badge: '01' } ],
    [ 'red-egg-block/numbered-list-item', { badge: '02' } ],
    [ 'red-egg-block/numbered-list-item', { badge: '03' } ],
];

const allowedBlocks = [
    'red-egg-block/numbered-list-item',
];

const EditNumberedListItems = () => {
    const blockProps = useBlockProps( {
        className: 'numbered-list__items',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks
                template={ template }
                allowedBlocks={ allowedBlocks }
            />
        </div>
    );
};

export default EditNumberedListItems;
