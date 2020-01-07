/**
 * Internal Dependencies
 */
import SettingsControl from '../settings-control';
import { BWAToggle, BWASpinner } from '@/components/atoms';
import { BWASnackbar } from '@/components/molecules';
import { useState, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { sleep } from '@/functions';

const SettingsToggleUI = ( { label, storeValue, onChange } ) => {
	const [ isChanging, setIsChanging ] = useState('no');
	const [ initialValue, updateInitialValue ] = useState(storeValue);
   
   function handleOnChange() {
	   setIsChanging('changing');
	   onChange();
	};
   
	useEffect(() => {
	   if ( storeValue !== initialValue ) {
		   sleep(480).then(() => {
			   setIsChanging('changed');
			   updateInitialValue(storeValue);
		   });
	   }
	}, [storeValue]);
   
	console.log( 'rendering...' + label );
	
	return (
	   <SettingsControl>
		   <div className="label pure-u-3-4">
			   <label>{ label }</label>
		   </div>
		   <div className="toggle pure-u-1-4">
			   { ('changing' !== isChanging) && ( <BWAToggle checked={ storeValue } onChange={ handleOnChange } /> ) }
			   { 'changing' === isChanging && (<div style={{ float: 'right' }}><BWASpinner micro /></div>) }
		   </div>
		   {'changed' === isChanging && (<BWASnackbar status="success" isDismissible onRemove={() => {}}>{label} updated successfully.</BWASnackbar>)}
	   </SettingsControl>
	)
};

const SettingsToggle = compose(
	withSelect( ( select, { label, settingKey } ) => ({
		label: label,
		data: select('bluehost/plugin').getSetting( settingKey )
	}) ),
	withDispatch( ( dispatch, { settingKey } ) => {
		const { toggleSetting } = dispatch('bluehost/plugin');
		console.log( 'the setting key: ' + settingKey );
		return {
			onChange() {
				toggleSetting( settingKey );
			},
		};
	} )
)( SettingsToggleUI );

// const SettingsToggle = ( { label, checked, onChange } ) => {
//  const [ isChanging, setIsChanging ] = useState('no');
//  const [ initialValue, updateInitialValue ] = useState(checked);

// function handleOnChange() {
// 	console.log('running');
// 	setIsChanging('changing');
// 	onChange();
//  };

//  useEffect(() => {
// 	if ( checked !== initialValue ) {
// 		sleep(480).then(() => {
// 			setIsChanging('changed');
// 			updateInitialValue(checked);
// 		});
// 	}
//  }, [checked]);

//  console.log( 'rendering...' + label );
 
//  return (
// 	<SettingsControl key={key}>
// 		<div className="label pure-u-3-4">
// 			<label>{ label }</label>
// 		</div>
// 		<div className="toggle pure-u-1-4">
// 			{ ('changing' !== isChanging) && ( <BWAToggle checked={ checked } onChange={ handleOnChange } /> ) }
// 			{ 'changing' === isChanging && (<div style={{ float: 'right' }}><BWASpinner micro /></div>) }
// 		</div>
// 		{'changed' === isChanging && (<BWASnackbar status="success" isDismissible onRemove={() => {}}>{label} updated successfully.</BWASnackbar>)}
// 	</SettingsControl>
//  )
// };

export default SettingsToggle;
