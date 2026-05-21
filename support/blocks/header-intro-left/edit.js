/**
 * Header Intro Left – Edit Component
 *
 * InnerBlocks for section label (paragraph) and heading.
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const template = [
    [ 'core/paragraph', { placeholder: 'SECTION LABEL', className: 'header-intro__label' } ],
    [ 'core/heading', { level: 2, placeholder: 'Section Heading' } ],
];

const allowedBlocks = [
    'core/heading',
    'core/paragraph',
];

const EditHeaderIntroLeft = () => {
    const blockProps = useBlockProps( {
        className: 'header-intro__left',
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

export default EditHeaderIntroLeft;
