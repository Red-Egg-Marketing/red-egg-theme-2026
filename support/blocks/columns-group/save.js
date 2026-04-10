/**
 * Columns Group Block – Save Component
 */

const { Fragment } = wp.element;
const { RichText, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveColumnsGroup = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        headingColor,
        introText,
        bodyText,
        buttonText,
        buttonUrl,
        image,
        imageAlt,
        showDivider,
        imagePosition,
        padding,
        margin,
    } = attributes;
    const positionClass = imagePosition === 'right' ? 'columns-group--img-right' : '';

    const blockProps = useBlockProps.save( {
        className: 'columns-group',
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
        <section { ...blockProps }>
            <div className="block-wrapper">
                <div className="columns-group__image-col">
                    { image && (
                        <div className="columns-group__image-wrap">
                            <img src={ image } alt={ imageAlt } loading="lazy" />
                        </div>
                    ) }
                </div><!-- .columns-group__image-col -->

                <div className="columns-group__content-col">
                    <RichText.Content
                        tagName="p"
                        className="columns-group__label"
                        value={ sectionLabel }
                    />
                    <RichText.Content
                        tagName="h2"
                        className={ `columns-group__heading columns-group__heading--${ headingColor }` }
                        value={ heading }
                    />
                    <RichText.Content
                        tagName="p"
                        className="columns-group__intro"
                        value={ introText }
                    />
                    <RichText.Content
                        tagName="p"
                        className="columns-group__body"
                        value={ bodyText }
                    />
                    <div className="columns-group__cta">
                        <a href={ buttonUrl } className="btn-gray">
                            <span>{ buttonText }</span>
                            <span className="btn-arrow"></span>
                        </a>
                    </div>
                    { showDivider && (
                        <div className="columns-group__divider"></div>
                    ) }
                </div><!-- .columns-group__content-col -->
            </div><!-- .block-wrapper -->
        </section>
        </Fragment>
    );
};

export default SaveColumnsGroup;