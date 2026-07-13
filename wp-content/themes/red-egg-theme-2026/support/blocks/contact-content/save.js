const { InnerBlocks, useBlockProps } = wp.blockEditor;

import ContactIcons from '../../components/ContactIcons.js';

const SaveContactContent = ( { attributes } ) => {
    const { icons } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'contact-section__left',
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
            <ContactIcons.View icons={ icons } />
        </div>
    );
};

export default SaveContactContent;
