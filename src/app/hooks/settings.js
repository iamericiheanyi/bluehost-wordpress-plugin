import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Settings functionality
 *
 * @return {Array}
 */
export default function useSettings() {
    /**
    * The notice to be displayed to the user.
    *
    * @member {string}
    */
	const [ notice, setNotice ] = useState( null );

	/**
    * Fallback error message.
    *
    * @type {string}
    */
	const unknownErrorMsg = __( 'An unknown error has occurred.', 'bluehost-wordpress-plugin' );

	/**
  * Call the WordPress REST API.
  *
  * @param options
  * @return {Promise<null>}
  */
	const callApi = async ( options ) => {
		setIsError( false );
		setIsLoading( true );
		setNotice( null );

		try {
			const response = await apiFetch( options );

			if ( response.hasOwnProperty( 'status' ) && response.status === 'error' ) {
				throw new Error( response.message );
			}

			setIsLoading( false );
			return response;
		} catch ( error ) {
			setIsLoading( false );
			setIsError( true );
			setNotice( ( typeof error === 'object' ? error.message : error ) || unknownErrorMsg );
			return null;
		}
	};

	const setup = ( response ) => {
		// if ( response.hasOwnProperty( 'creationDate' ) ) {
		// 	setCreationDate( response.creationDate );
		// }
	};

	useEffect( () => {
		// Set staging details.
		callApi( { path: '/bluehost/v1/staging' } )
			.then( setup );
	}, [] );

	return [
		{
			notice
		}, {
			setNotice
		},
	];
}
