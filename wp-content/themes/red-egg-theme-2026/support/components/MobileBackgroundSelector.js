
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls, MediaUpload } = wp.blockEditor;
const { Button, PanelBody, ToggleControl, SelectControl, RangeControl, ColorPalette, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;


const labelStyle = {
    'margin-bottom' : '5px',
    'margin-top' : '5px',
    'display' : 'block',
    'width' : '100%'
}

const repeatOptions = [
    {
        label: __( 'No Repeat' ),
        value: 'no-repeat',
    },
    {
        label: __( 'Repeat X' ),
        value: 'repeat-x',
    },
    {
        label: __( 'Repeat Y' ),
        value: 'repeat-y',
    },
    {
        label: __( 'Repeat X & Y' ),
        value: 'repeat',
    },
];


const attachOptions = [
    {
        label: __( 'Scroll' ),
        value: 'scroll',
    },
    {
        label: __( 'Fixed' ),
        value: 'fixed',
    },
    {
        label: __( 'Local' ),
        value: 'local',
    },
];


const sizeOptions = [
    {
        label: __( 'Cover' ),
        value: 'cover',
    },
    {
        label: __( 'Contain' ),
        value: 'contain',
	}
];

const positionOptions = [
    {
        label: __( 'Top Left' ),
        value: 'top left',
    },
    {
        label: __( 'Top Right' ),
        value: 'top right',
    },
    {
        label: __( 'Top Center' ),
        value: 'top center',
    },
    {
        label: __( 'Center Center' ),
        value: 'center center',
    },
    {
        label: __( 'Bottom Center' ),
        value: 'bottom center',
    },
    {
        label: __( 'Bottom Left' ),
        value: 'bottom left',
    },
    {
        label: __( 'Bottom Right' ),
        value: 'bottom right',
    },
];

const MobileBackgroundSelector = (props) => {

	const place = props.placeholder != '' ? props.placeholder : 'Content...';

	const { image, updateProp } = props;

	var prop = updateProp == undefined ? "image" : updateProp;

	const setBackgroundImage = (media) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.url = media.url;
    	newBody.width = media.width;
    	newBody.height = media.height;

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }

	const setBackgroundRepeat = ( selectedRepeat ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.repeat = selectedRepeat;

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }


    const setBackgroundAttach = ( selectedAttach ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.attachment = selectedAttach;

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }


    const setBackgroundPosition = ( selectedPos ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.position = selectedPos;

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }


    const setBackgroundSize = ( selectedSize ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.size = selectedSize;

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }

    const setBackgroundSizeKey = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.sizekey = selectedKey;
    	newBody.size = selectedKey == '' ? '100' : '';

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }

	const removeBackgroundImage = () => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.url = '';
    	newBody.width = '';
    	newBody.height = '';

    	var update = {};

    	update[prop] = newBody;

    	props.setAttributes(update);
    }
	
	return (
		<Fragment>
			<PanelBody
					title={__('Mobile Hero Background')}
					initialOpen={true}
				>
        			<label style={ labelStyle }>{__('Background Image')}</label>
        			<MediaUpload
						allowedTypes={ ['image'] }
						onSelect={ setBackgroundImage }
						value={ image.url }
						render={ ( {open} ) =>(
							<Fragment>
								<Button
									isSecondary
									onClick={ open }
									style={
										{
											'margin-bottom' : '15px',
											'height' : 'auto',
											'display' : 'block',
											'width' : '100%'
										}
									}
								> 
									{ image.url == '' && ( __('Add Background Image') )}
									{ image.url != '' && (
										<ResponsiveWrapper
											naturalWidth={ image.width }
											naturalHeight={ image.height }
										>
											<img 
												src={ image.url }
												style={
													{
														'max-height' : 'auto',
														'width' : 'auto',
													}
												}
											/>
										</ResponsiveWrapper>
									)}
								</Button>
								
								{ image.url != '' && (
									<Fragment>
										<Button
											isDestructive
											isSmall
											onClick={
												removeBackgroundImage
											}
										>
											Remove Image
										</Button>
									</Fragment>
								)}
							</Fragment>
						)}
					/>
					<SelectControl
						label={ __( 'Set Background Repeat' ) }
            			options={ repeatOptions }
            			value={ image.repeat }
            			onChange={ ( selectedRepeat ) => {
            				setBackgroundRepeat( selectedRepeat )
            			}}
        			/>
        			<SelectControl
						label={ __( 'Set Background Attachment' ) }
            			options={ attachOptions }
            			value={ image.attachment }
            			onChange={ ( selectedAttach ) => {
            				setBackgroundAttach( selectedAttach )
            			}}
        			/>
        			<SelectControl
						label={ __( 'Set Background Position' ) }
            			options={ positionOptions }
            			value={ image.position }
            			onChange={ ( selectedPos ) => {
            				setBackgroundPosition( selectedPos )
            			}}
        			/>
        			<SelectControl
						label={ __( 'Set Background Size Keyword' ) }
            			options={ sizeOptions }
            			value={ image.sizekey }
            			onChange={ ( selectedKey ) => {
            				setBackgroundSizeKey( selectedKey )
            			}}
        			/>
        			<RangeControl
						label={ __( 'Set Background Size %' ) }
            			value={ image.size }
            			onChange={ ( selectedSize ) => {
            				setBackgroundSize( selectedSize )
            			}}
            			min={1}
            			max={100}
            			resetFallbackValue={100}
        			/>
			</PanelBody>
		</Fragment>
	)
}

MobileBackgroundSelector.View = (props) => {
	return null;
}

export default MobileBackgroundSelector;
