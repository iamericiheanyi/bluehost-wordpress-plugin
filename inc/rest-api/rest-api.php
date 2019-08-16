<?php
/**
 * Include REST API related files.
 */
function bluehost_include_rest_api() {
	require_once MM_BASE_DIR . 'inc/rest-api/class-bluehost-settings-endpoint.php';
}
add_action( 'rest_api_init', 'bluehost_include_rest_api', 5 );
/**
 * Instanciate controllers and register routes.
 */
function bluehost_init_rest_api() {
	$controllers = array(
		'Bluehost_REST_Settings_Controller',
	);
	foreach ( $controllers as $controller ) {
		$temp = new $controller();
		$temp->register_routes();
	}
}
add_action( 'rest_api_init', 'bluehost_init_rest_api' );
