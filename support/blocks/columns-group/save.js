/**
 * Columns Group Block – Save Component
 */

const { RichText, useBlockProps } = wp.blockEditor;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

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

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );
    const positionClass = imagePosition === 'right' ? 'columns-group--img-right' : '';

    const blockProps = useBlockProps.save( {
        className: `columns-group ${ positionClass } ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
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
    );
};

export default SaveColumnsGroup;
