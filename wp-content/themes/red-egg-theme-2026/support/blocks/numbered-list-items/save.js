/**
 * Numbered List Items Wrapper – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveNumberedListItems = () => {
    const blockProps = useBlockProps.save( {
        className: 'numbered-list__items',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveNumberedListItems;
