/**
 * Text Columns – Column Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveTextColumnsCol = () => {
    const blockProps = useBlockProps.save( {
        className: 'text-columns__col',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
};

export default SaveTextColumnsCol;
