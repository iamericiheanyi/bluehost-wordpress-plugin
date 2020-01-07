/**
 * WordPress dependencies
 */
import { TAB } from '@wordpress/keycodes';

export default () => {
	/**
  	* Register Helpers
  	*
  	* @param e
  	*/
	const bluehostHandleFirstTab = ( event ) => {
		if ( event.keyCode === TAB ) {
			document.body.classList.add( 'bluehost-admin-keynav' );
			window.removeEventListener( 'keydown', bluehostHandleFirstTab );
		}
	}
	window.addEventListener( 'keydown', bluehostHandleFirstTab );
};
