<?php
/**
 * REST API: WP_REST_Settings_Controller class
 *
 * @package WordPress
 * @subpackage REST_API
 * @since 4.7.0
 */

/**
 * Core class used to manage a site's settings via the REST API.
 *
 * @since 4.7.0
 *
 * @see WP_REST_Controller
 */
class Bluehost_REST_Settings_Controller extends WP_REST_Settings_Controller {

	public $prefixes = array(
		'bh_',
		'mm_',
	);

	/**
	 * Constructor.
	 *
	 * @since 4.7.0
	 */
	public function __construct() {
		$this->namespace = 'bluehost/v1';
		$this->rest_base = 'settings';
	}

	/*
	 * Filter out any setting that is not plugin specific.
	 */
	public function filter_out_core_options( $var ) {
		foreach ( $this->prefixes as $prefix ) {
			if ( 0 === strpos( $var['name'], $prefix ) ) {
				return true;
			}
		}

		return false;
	}

	public function get_item_schema() {
		// Leave core options.
		$options = $this->get_registered_options();
		// Remove core options.
		// $options = array_filter( $this->get_registered_options(), 'filter_out_core_options' );

		$schema = array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'settings',
			'type'       => 'object',
			'properties' => array(),
		);

		foreach ( $options as $option_name => $option ) {
			$schema['properties'][ $option_name ]                = $option['schema'];
			$schema['properties'][ $option_name ]['arg_options'] = array(
				'sanitize_callback' => array( $this, 'sanitize_callback' ),
			);
		}

		return $this->add_additional_fields_schema( $schema );
	}

}
