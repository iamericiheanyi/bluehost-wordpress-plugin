/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import SettingsSection from '../settings-section';
import SettingsGroup from '../settings-group';
import SettingsToggle from '../settings-toggle';

const fields = [
	{
		label: __( 'WordPress Core', 'bluehost-wordpress-plugin' ),
		key: 'autoUpdatesMajorCore'
	},
	{
		label: __( 'Themes', 'bluehost-wordpress-plugin' ),
		key: 'autoUpdatesThemes'
	},
	{
		label: __( 'Plugins', 'bluehost-wordpress-plugin' ),
		key: 'autoUpdatesPlugins'
	}
];

const AutomaticUpdates = () => {
	return (
		<SettingsSection name={ __( 'Automatic Updates', 'bluehost-wordpress-plugin' ) }>
			<SettingsGroup>
				<SettingsToggle
					label={ __( 'WordPress Core', 'bluehost-wordpress-plugin' ) }
					settingKey="autoUpdatesMajorCore"
				/>
				<SettingsToggle
					label={ __( 'Themes', 'bluehost-wordpress-plugin' ) }
					settingKey="autoUpdatesThemes"
				/>
				<SettingsToggle
					label={ __( 'Plugins', 'bluehost-wordpress-plugin' ) }
					settingKey="autoUpdatesPlugins"
				/>
			</SettingsGroup>
		</SettingsSection>
	);
};

// const AutomaticUpdates = () => {
// 	return (
// 		<SettingsSection name={ __( 'Automatic Updates', 'bluehost-wordpress-plugin' ) }>
// 			<SettingsGroup>
// 				{/* <SettingsToggle
// 					label={ __( 'WordPress Core', 'bluehost-wordpress-plugin' ) }
// 					checked={ core }
// 					onChange={ () => { toggleSetting( 'autoUpdatesMajorCore') } }
// 				/>
// 				<SettingsToggle
// 					label={ __( 'Themes', 'bluehost-wordpress-plugin' ) }
// 					checked={ themes }
// 					onChange={ () => toggleSetting( 'autoUpdatesThemes' ) }
// 				/>
// 				<SettingsToggle
// 					label={ __( 'Plugins', 'bluehost-wordpress-plugin' ) }
// 					checked={ plugins }
// 					onChange={ () => toggleSetting( 'autoUpdatesPlugins' ) }
// 				/> */}
// 			</SettingsGroup>
// 		</SettingsSection>
// 	);
// };

export default AutomaticUpdates;

// export default compose(
// 	withSelect( ( select ) => ( {
// 		core: select( 'bluehost/plugin' ).getSetting( 'autoUpdatesMajorCore' ),
// 		themes: select( 'bluehost/plugin' ).getSetting( 'autoUpdatesThemes' ),
// 		plugins: select( 'bluehost/plugin' ).getSetting( 'autoUpdatesPlugins' ),
// 	} ) ),
// 	withDispatch( ( dispatch ) => ( {
// 		toggleSetting: dispatch( 'bluehost/plugin' ).toggleSetting,
// 	} ) )
// )( AutomaticUpdates );
