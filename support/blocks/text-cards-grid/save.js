/**
 * Text Cards Grid Block – Save Component
 */

const { Fragment } = wp.element;
const { RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveTextCardsGrid = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        description,
        cards,
        padding,
        margin,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'text-cards-grid',
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
        <section { ...blockProps }>
            <div className="block-wrapper">
                <div className="text-cards-grid__header">
                    <RichText.Content
                        tagName="p"
                        className="text-cards-grid__label"
                        value={ sectionLabel }
                    />
                    <RichText.Content
                        tagName="h2"
                        className="text-cards-grid__heading"
                        value={ heading }
                    />
                    <RichText.Content
                        tagName="p"
                        className="text-cards-grid__description"
                        value={ description }
                    />
                </div>

                <div className="text-cards-grid__cards">
                    { cards.map( ( card, i ) => (
                        <a href={ card.url } className="text-card" key={ i }>
                            { card.icon && (
                                <div className="text-card__icon">
                                    <img src={ card.icon } alt="" loading="lazy" />
                                </div>
                            ) }
                            <h3 className="text-card__title">{ card.title }</h3>
                            <p className="text-card__body">{ card.body }</p>
                            <div className="text-card__arrow">
                                <span className="arrow-circle">
                                    <span className="arrow-icon"></span>
                                </span>
                            </div>
                        </a>
                    ) ) }
                </div>
            </div>
        </section>
        </Fragment>
    );
};

export default SaveTextCardsGrid;