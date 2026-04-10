/**
 * Contact Section Block – Save Component
 * 
 * If a form shortcode is provided, it will be rendered
 * via PHP (dynamic block render callback recommended).
 * Otherwise outputs styled placeholder form markup.
 */

const { RichText, useBlockProps } = wp.blockEditor;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

const SaveContactSection = ( { attributes } ) => {
    const {
        sectionLabel,
        heading,
        email,
        phone,
        addressLine1,
        addressLine2,
        formShortcode,
        padding,
        margin,
    } = attributes;

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps.save( {
        className: `contact-section ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    return (
        <section { ...blockProps }>
            <div className="contact-section__bg"></div>
            <div className="block-wrapper">
                <div className="contact-section__left">
                    <RichText.Content
                        tagName="p"
                        className="contact-section__label"
                        value={ sectionLabel }
                    />
                    <RichText.Content
                        tagName="h2"
                        className="contact-section__heading"
                        value={ heading }
                    />

                    <div className="contact-section__info">
                        <a href={ `mailto:${ email }` } className="contact-section__info-item">
                            <span className="contact-section__icon contact-section__icon--email"></span>
                            <span className="contact-section__info-text">{ email }</span>
                        </a>
                        <a href={ `tel:${ phone.replace( /\./g, '' ) }` } className="contact-section__info-item">
                            <span className="contact-section__icon contact-section__icon--phone"></span>
                            <span className="contact-section__info-text">{ phone }</span>
                        </a>
                        <div className="contact-section__info-item">
                            <span className="contact-section__icon contact-section__icon--location"></span>
                            <span className="contact-section__info-text">
                                { addressLine1 }<br />{ addressLine2 }
                            </span>
                        </div>
                    </div>
                </div>

                <div className="contact-section__right">
                    { formShortcode ? (
                        <div className="contact-section__form-shortcode" data-shortcode={ formShortcode }></div>
                    ) : (
                        <div className="contact-section__form">
                            <div className="contact-section__form-row">
                                <input type="text" placeholder="First Name" className="contact-section__input" />
                                <input type="text" placeholder="Last Name" className="contact-section__input" />
                            </div>
                            <div className="contact-section__form-row">
                                <input type="tel" placeholder="Phone" className="contact-section__input" />
                                <input type="email" placeholder="Email" className="contact-section__input" />
                            </div>
                            <div className="contact-section__form-row">
                                <textarea placeholder="Message" className="contact-section__textarea" rows="5"></textarea>
                            </div>
                            <div className="contact-section__form-submit">
                                <button type="submit" className="btn-gray">
                                    <span>SUBMIT</span>
                                    <span className="btn-arrow"></span>
                                </button>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </section>
    );
};

export default SaveContactSection;
