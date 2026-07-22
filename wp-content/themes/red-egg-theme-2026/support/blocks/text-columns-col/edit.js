/**
 * Text Columns – Column Block – Edit Component
 *
 * InnerBlocks for headings, paragraphs, buttons. Content is seeded
 * by the parent's nested template.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
    'core/list',
    'core/buttons',
];

const EditTextColumnsCol = () => {
    const blockProps = useBlockProps( {
        className: 'text-columns__col',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks allowedBlocks={ allowedBlocks } />
        </div>
    );
};

export default EditTextColumnsCol;
