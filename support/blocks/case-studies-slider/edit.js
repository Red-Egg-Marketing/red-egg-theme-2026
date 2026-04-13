/**
 * Case Studies Slider Block – Edit Component
 *
 * Fetches case studies from REST API with optional industry filter.
 * Renders a Swiper-powered preview in the editor.
 * Uses InnerBlocks for header intro + CTA buttons.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

import ResourceCard from '../../components/ResourceCard.js';
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import Swiper from 'swiper/bundle';

const apiUrl = '/wp-json/red-egg/v2/case-studies';
const industriesUrl = '/wp-json/red-egg/v2/industries';

const template = [
    [ 'red-egg-block/header-intro', {} ],
    [ 'core/buttons', {}, [
        [ 'core/button', { text: 'VIEW OUR WORK', url: '/work/?post-type=case-study' } ],
    ] ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
    'core/buttons',
    'core/heading',
    'core/paragraph',
];

const EditCaseStudiesSlider = ( { attributes, setAttributes, isSelected, clientId } ) => {
    const { industry, postsToShow, padding, margin, blockId } = attributes;

    const [ resources, setResources ] = useState( false );
    const [ industries, setIndustries ] = useState( false );
    const [ swiperReady, setSwiperReady ] = useState( false );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'case-studies-slider',
    } );

    // Set blockId on mount
    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Fetch industries for the filter dropdown
    useEffect( () => {
        if ( industries === false ) {
            wp.apiFetch( { url: industriesUrl } ).then( ( terms ) => {
                let opts = [ { label: '--', value: '' } ];
                terms.forEach( ( term ) => {
                    opts.push( {
                        label: term.name,
                        value: term.slug,
                    } );
                } );
                setIndustries( opts );
            } );
        }
    }, [] );

    // Fetch case studies (initial + when industry or postsToShow changes)
    useEffect( () => {
        setSwiperReady( false );
        let url = apiUrl + '?ppp=' + postsToShow;
        if ( industry ) {
            url += '&industry=' + industry;
        }
        wp.apiFetch( { url } ).then( ( data ) => {
            setResources( data );
            setSwiperReady( true );
        } ).catch( () => {
            setResources( [] );
            setSwiperReady( true );
        } );
    }, [ industry, postsToShow ] );

    // Initialize Swiper when resources are ready and block is selected
    useEffect( () => {
        if ( swiperReady && resources && resources.length > 0 && isSelected ) {
            const swiperEl = document.querySelector( `#${ blockId || 'block-' + clientId } .case-studies-swiper` );
            if ( swiperEl ) {
                new Swiper( swiperEl, {
                    loop: false,
                    slidesPerView: 1.25,
                    autoplay: false,
                    effect: 'slide',
                    spaceBetween: 15,
                    speed: 500,
                    breakpoints: {
                        768: {
                            slidesPerView: 3.25,
                            spaceBetween: 20,
                        },
                    },
                    navigation: {
                        nextEl: `#${ blockId || 'block-' + clientId } .swiper-button-next`,
                        prevEl: `#${ blockId || 'block-' + clientId } .swiper-button-prev`,
                    },
                } );
            }
        }
    }, [ swiperReady, isSelected ] );

    const setIndustryFilter = ( value ) => {
        setAttributes( { industry: value } );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={ __( 'Filter by Industry', 'red-egg' ) }
                    initialOpen={ true }
                >
                    { industries && (
                        <SelectControl
                            label={ __( 'Industry', 'red-egg' ) }
                            value={ industry }
                            options={ industries }
                            onChange={ setIndustryFilter }
                        />
                    ) }
                    <RangeControl
                        label={ __( 'Posts to Show', 'red-egg' ) }
                        value={ postsToShow }
                        onChange={ ( val ) => setAttributes( { postsToShow: val } ) }
                        min={ 3 }
                        max={ 30 }
                    />
                </PanelBody>
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ 'block-' + clientId }
                setAttributes={ setAttributes }
            />

            <section { ...blockProps }>
                <div className="block-wrapper">
                    <div className="case-studies-slider__header">
                        <InnerBlocks
                            template={ template }
                            allowedBlocks={ allowedBlocks }
                        />
                    </div>

                    <div className="resources-wrap">
                        <div className="case-studies-swiper swiper">
                            { swiperReady && resources && resources.length > 0 && (
                                <Fragment>
                                    <div className="swiper-wrapper">
                                        { resources.map( ( resource, i ) => (
                                            <ResourceCard
                                                key={ resource.ID || i }
                                                resourceIndex={ i }
                                                resourceURL={ resource.link }
                                                resourceID={ resource.ID || resource.id }
                                                resourceImg={ resource.featured_image || resource.image }
                                                resourceTitle={ resource.title }
                                                resourceClass="swiper-slide"
                                                displayButton={ false }
                                                displayExcerpt={ false }
                                            />
                                        ) ) }
                                    </div>
                                    <div className="swiper-button-prev"></div>
                                    <div className="swiper-button-next"></div>
                                </Fragment>
                            ) }
                            { swiperReady && ( ! resources || resources.length === 0 ) && (
                                <div className="error">
                                    <h3>{ __( 'No case studies found. Try a different filter.', 'red-egg' ) }</h3>
                                </div>
                            ) }
                            { ! swiperReady && (
                                <p>{ __( 'Loading case studies…', 'red-egg' ) }</p>
                            ) }
                        </div>
                    </div>
                </div><!-- .block-wrapper -->
            </section>
        </Fragment>
    );
};

export default EditCaseStudiesSlider;
