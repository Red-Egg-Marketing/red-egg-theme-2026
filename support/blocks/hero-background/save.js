/**
 * Hero Background Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;

import { getPaddingClasses } from '../../components/Padding';
import { getMarginClasses } from '../../components/Margin';

const SaveHeroBackground = ( { attributes } ) => {
    const { image, mobileimage, padding, margin } = attributes;

    const paddingClasses = getPaddingClasses( padding );
    const marginClasses = getMarginClasses( margin );

    const blockProps = useBlockProps.save( {
        className: `hero-background ${ paddingClasses } ${ marginClasses }`.trim(),
    } );

    // Build inline background styles
    const bgStyle = {};
    if ( image.url !== '' ) {
        bgStyle.backgroundImage = `url(${ image.url })`;
        bgStyle.backgroundRepeat = image.repeat || 'no-repeat';
        bgStyle.backgroundAttachment = image.attachment || 'scroll';
        bgStyle.backgroundSize = image.sizekey || 'cover';

        if ( image.bgkeyword === 'keyword' ) {
            bgStyle.backgroundPosition = image.position || 'center center';
        } else {
            const unit = image.bgunit || 'px';
            bgStyle.backgroundPosition = `${ image.positionX || 0 }${ unit } ${ image.positionY || 0 }${ unit }`;
        }

        if ( image.sizekey === '' && image.size ) {
            bgStyle.backgroundSize = `${ image.size }${ image.unit || '%' }`;
        }
    }

    // Mobile background style (applied via data attribute, handled in CSS/JS)
    const mobileBgStyle = {};
    if ( mobileimage.url !== '' ) {
        mobileBgStyle.backgroundImage = `url(${ mobileimage.url })`;
        mobileBgStyle.backgroundRepeat = mobileimage.repeat || 'no-repeat';
        mobileBgStyle.backgroundAttachment = mobileimage.attachment || 'scroll';
        mobileBgStyle.backgroundPosition = mobileimage.position || 'center center';
        mobileBgStyle.backgroundSize = mobileimage.sizekey || 'cover';

        if ( mobileimage.sizekey === '' && mobileimage.size ) {
            mobileBgStyle.backgroundSize = `${ mobileimage.size }%`;
        }
    }

    return (
        <Fragment>
            <section { ...blockProps } style={ bgStyle }
                data-mobile-bg={ mobileimage.url !== '' ? JSON.stringify( mobileBgStyle ) : '' }
            >
                <div className="block-wrapper">
                    <div className="hero-background__content">
                        <InnerBlocks.Content />
                    </div><!-- .hero-background__content -->
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default SaveHeroBackground;
