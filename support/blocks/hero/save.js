/**
 * Hero Block – Save Component
 */

const { RichText, useBlockProps } = wp.blockEditor;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

const SaveHero = ( { attributes } ) => {
    const {
        heading,
        description,
        buttonText,
        buttonUrl,
        padding,
        margin,
    } = attributes;

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps.save( {
        className: `hero ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
        <section { ...blockProps }>
            <div className="hero__bg"></div>
            <div className="block-wrapper">
                <div className="hero__content">
                    <RichText.Content
                        tagName="h1"
                        className="hero__heading"
                        value={ heading }
                    />
                    <RichText.Content
                        tagName="p"
                        className="hero__description"
                        value={ description }
                    />
                    <div className="hero__cta">
                        <a href={ buttonUrl } className="btn-gray">
                            <span>{ buttonText }</span>
                            <span className="btn-arrow"></span>
                        </a>
                    </div>
                </div>
                <div className="hero__eggs">
                    <div className="hero__egg-grid">
                        <span className="hero__egg hero__egg--white"></span>
                        <span className="hero__egg hero__egg--red"></span>
                        <span className="hero__egg hero__egg--white"></span>
                        <span className="hero__egg hero__egg--white"></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaveHero;
