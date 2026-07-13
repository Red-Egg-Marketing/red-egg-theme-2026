/**
 * Testimonials Block – Save Component
 *
 * This block uses a PHP render_callback (red_egg_render_testimonials),
 * which wraps the saved InnerBlocks in the section markup and appends
 * the reviews shortcode output.
 *
 * For that to work the InnerBlocks header MUST be serialized into
 * post_content, so save() returns <InnerBlocks.Content />. Returning
 * null (the previous behaviour) meant the render callback received an
 * empty $content and the header never saved.
 */

const { InnerBlocks } = wp.blockEditor;

const SaveTestimonials = () => {
    return <InnerBlocks.Content />;
};

export default SaveTestimonials;
