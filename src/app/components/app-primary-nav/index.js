/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { AppNavLink as NavLink } from '@/components';
import './style.scss';

const AppPrimaryNavigation = () => (
	<div id="app-primary-navigation">
		<ul class="tabs">
			<li className="tab">
				<NavLink to="/">
					{__('Home', 'bluehost-wordpress-plugin')}
				</NavLink>
			</li>
			<li className="tab">
				<NavLink to="/marketplace/themes">
					{__('Themes', 'bluehost-wordpress-plugin')}
				</NavLink>
			</li>
			<li className="tab">
				<NavLink to="/marketplace/plugins">
					{__('Plugins', 'bluehost-wordpress-plugin')}
				</NavLink>
			</li>
			<li className="tab">
				<NavLink to="/marketplace/services">
					{__('Services', 'bluehost-wordpress-plugin')}
				</NavLink>
			</li>
			<li className="tab">
				<NavLink to="/tools">
					{__('Tools', 'bluehost-wordpress-plugin')}
				</NavLink>
			</li>
			<li className="tab">
				<NavLink to="/settings">
					{__('Settings', 'bluehost-wordpress-plugin')}
				</NavLink>
			</li>
		</ul>
	</div>
);

export default AppPrimaryNavigation;
