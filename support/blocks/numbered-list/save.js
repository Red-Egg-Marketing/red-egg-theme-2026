/**
 * Numbered List Items Block – Save Component
 */

const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveNumberedList = ( { attributes } ) => {
    const { items, padding, margin } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'numbered-list',
    } );

    const blockId = blockProps.id;

    const padNumber = ( num ) => {
        return String( num ).padStart( 2, '0' );
    };

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <div className="numbered-list__bg"></div>
                <div className="block-wrapper">
                    <div className="numbered-list__left">
                        <InnerBlocks.Content />
                        <div className="numbered-list__logo-mark"></div>
                    </div>

                    <div className="numbered-list__right">
                        { items.map( ( item, i ) => (
                            <div className="numbered-list__item" key={ i }>
                                <span className="numbered-list__number">
                                    { padNumber( i + 1 ) }
                                </span>
                                <div className="numbered-list__item-content">
                                    <RichText.Content
                                        tagName="h3"
                                        className="numbered-list__item-title"
                                        value={ item.title }
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        className="numbered-list__item-body"
                                        value={ item.body }
                                    />
                                </div>
                            </div>
                        ) ) }
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveNumberedList;
