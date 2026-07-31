/**
 * Semibold Format Type
 *
 * Adds a "Semibold" toggle to the rich-text formatting menu
 * (the same dropdown as Highlight / Inline code / etc).
 * Wraps the selected text in <span class="semibold"> which the
 * theme styles at font-weight: 500 (a true face — Figtree and
 * Poppins both load a 500 weight).
 *
 * Available on all rich-text blocks (paragraphs, headings, lists…),
 * so it is NOT restricted to a single block type.
 *
 *    ____          _   _____
 *   |  _ \ ___  __| | | ____|__ _  __ _
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |
 *   |  _ <  __/ (_| | | |__| (_| | (_| |
 *   |_| \_\___|\__,_| |_____\__, |\__, |
 *                            |___/ |___/
 */

const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { __ } = wp.i18n;

const NAME = 'red-egg-format/semibold';

const SemiboldEdit = ( { isActive, value, onChange } ) => {
    const onToggle = () => {
        onChange( toggleFormat( value, { type: NAME } ) );
    };

    return (
        <RichTextToolbarButton
            icon="editor-bold"
            title={ __( 'Semibold', 'red-egg' ) }
            onClick={ onToggle }
            isActive={ isActive }
        />
    );
};

registerFormatType( NAME, {
    title: __( 'Semibold', 'red-egg' ),
    tagName: 'span',
    className: 'semibold',
    edit: SemiboldEdit,
} );
