/**
 * Header Intro Right – Edit Component
 *
 * InnerBlocks for description text, lists, and buttons.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'core/paragraph', { placeholder: 'Section description...' } ],
];

const allowedBlocks = [
    'core/paragraph',
    'core/list',
    'core/buttons',
    'core/heading',
];

const EditHeaderIntroRight = () => {
    const blockProps = useBlockProps( {
        className: 'header-intro__right',
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

export default EditHeaderIntroRight;
