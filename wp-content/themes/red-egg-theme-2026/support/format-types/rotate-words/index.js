/**
 * Rotate Words Format Type
 *
 * Adds a "Word Swap" toolbar button to core/heading blocks.
 * Wraps selected text in a <words> tag with a comma-separated
 * list of words that rotate on the frontend.
 *
 * Restricted to core/heading blocks only.
 */

const { compose, ifCondition } = wp.compose;
const { registerFormatType, applyFormat, removeFormat } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;
const { Button, Modal, TextareaControl } = wp.components;
const { __ } = wp.i18n;

class RotateWordsList extends Component {

    constructor() {
        super( ...arguments );
        this.render = this.render.bind( this );
        this.openModal = this.openModal.bind( this );
        this.closeModal = this.closeModal.bind( this );
        this.updateWords = this.updateWords.bind( this );
        this.removeWord = this.removeWord.bind( this );
        this.removeWordWrap = this.removeWordWrap.bind( this );
        this.applyWordWrap = this.applyWordWrap.bind( this );
        this.state = {
            activeModal: false,
            words: '',
            wordsArray: [],
        };
    }

    openModal() {
        var currentWords = '';

        if ( this.props.value.activeFormats && this.props.value.activeFormats.length > 0 ) {
            var fmt = this.props.value.activeFormats[0];
            if ( fmt.attributes && Object.keys( fmt.attributes ).length !== 0 ) {
                currentWords = fmt.attributes.words || '';
            } else if ( fmt.unregisteredAttributes && Object.keys( fmt.unregisteredAttributes ).length !== 0 ) {
                currentWords = fmt.unregisteredAttributes.words || '';
            }
        }

        this.setState( { words: currentWords, activeModal: true } );

        if ( currentWords.length > 0 ) {
            this.setState( { wordsArray: currentWords.split( ',' ) } );
        }
    }

    closeModal() {
        this.setState( { activeModal: false } );
    }

    removeWord( index ) {
        var tempArray = this.state.wordsArray.slice();
        tempArray.splice( index, 1 );
        var wordToString = tempArray.toString();
        this.setState( { wordsArray: tempArray, words: wordToString } );
        this.props.onChange( applyFormat(
            this.props.value,
            {
                type: 'red-egg-format/rotate-words',
                attributes: { words: wordToString },
            }
        ) );
    }

    removeWordWrap() {
        var activeFormat = this.props.value.activeFormats[0].type;
        this.props.onChange( removeFormat(
            this.props.value,
            activeFormat
        ) );
        this.setState( { words: '', wordsArray: [], activeModal: false } );
    }

    applyWordWrap() {
        var wordToString = this.state.wordsArray.toString();
        this.props.onChange( applyFormat(
            this.props.value,
            {
                type: 'red-egg-format/rotate-words',
                attributes: { words: wordToString },
            }
        ) );
        this.setState( { activeModal: false } );
    }

    updateWords( value ) {
        this.setState( {
            words: value,
            wordsArray: value.split( ',' ),
        } );
    }

    render() {
        const { isActive } = this.props;
        const { activeModal, words, wordsArray } = this.state;

        return (
            <Fragment>
                <RichTextToolbarButton
                    icon="welcome-write-blog"
                    title={ __( 'Word Swap', 'red-egg' ) }
                    onClick={ this.openModal }
                    isActive={ isActive }
                />
                { activeModal === true && (
                    <Modal
                        onRequestClose={ this.closeModal }
                        title={ __( 'Word Swap', 'red-egg' ) }
                        className="tooltip-modal"
                        focusOnMount={ true }
                    >
                        <TextareaControl
                            label={ __( 'Enter list of words', 'red-egg' ) }
                            help={ __( 'List words separated by commas (,) for swapping with selected text', 'red-egg' ) }
                            value={ words }
                            onChange={ this.updateWords }
                        />
                        <ul className="word-list" style={ {
                            listStyleType: 'none',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '5px',
                            padding: 0,
                            margin: '10px 0',
                        } }>
                            { wordsArray.length > 0 && wordsArray.map( ( word, wIndex ) => (
                                <Fragment key={ wIndex }>
                                    { word.length > 0 && (
                                        <li>
                                            <Button
                                                isDestructive
                                                isSmall
                                                onClick={ () => this.removeWord( wIndex ) }
                                            >
                                                { word }
                                            </Button>
                                        </li>
                                    ) }
                                </Fragment>
                            ) ) }
                        </ul>
                        { wordsArray.length > 0 && words.length > 0 && (
                            <div className="controls" style={ { display: 'flex', gap: '8px' } }>
                                <Button
                                    isDestructive
                                    onClick={ this.removeWordWrap }
                                >
                                    { __( 'Remove Word Wrap', 'red-egg' ) }
                                </Button>
                                <Button
                                    isPrimary
                                    onClick={ this.applyWordWrap }
                                >
                                    { __( 'Apply Word Wrap', 'red-egg' ) }
                                </Button>
                            </div>
                        ) }
                    </Modal>
                ) }
            </Fragment>
        );
    }
}

/**
 * Restrict to core/heading blocks only.
 */
const ConditionRotateWordsList = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/block-editor' ).getSelectedBlock(),
        };
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'core/heading'
        );
    } )
)( RotateWordsList );

registerFormatType(
    'red-egg-format/rotate-words', {
        title: __( 'Word Swap', 'red-egg' ),
        tagName: 'words',
        className: 'rotate-words',
        attributes: {
            words: '',
        },
        edit: ConditionRotateWordsList,
    }
);
