<?php

class Mojo_Items_Controller extends WP_REST_Controller {

	protected $namespace = 'mojo/v1';

	protected $rest_base = 'items';

	/**
	 * Query the Mojo items endpoint.
	 *
	 * @param array            $params
	 * @param \WP_REST_Request $request
	 *
	 * @return array|mixed|object|null
	 */
	public function query_mojo_items( $params, WP_REST_Request $request ) {
		$params       = wp_parse_args( $this->get_params( $params, $request ), $request->get_default_params() );
		$api_url      = add_query_arg( $params, 'https://api.mojomarketplace.com/api/v2/items' );
		$api_response = mm_api_cache( $api_url );

		return $this->get_response( $api_response );
	}

	/**
	 * Query the Mojo search endpoint.
	 *
	 * @param array            $params
	 * @param \WP_REST_Request $request
	 *
	 * @return array|mixed|object|null
	 */
	public function query_mojo_search( $params, WP_REST_Request $request ) {
		$params = wp_parse_args( $this->get_params( $params, $request ), $request->get_default_params() );

		// Rename 'count' to 'size' for Mojo search endpoint.
		if ( ! empty( $params['count'] ) ) {
			$params['size'] = $params['count'];
			unset( $params['count'] );
		}

		// Rename 'count' to 'size' for Mojo search endpoint.
		if ( ! empty( $params['type'] ) ) {
			$params['item_type'] = $params['type'];
			unset( $params['item_type'] );
		}

		$api_url      = add_query_arg( $params, 'https://api.mojomarketplace.com/api/v2/search' );
		$api_response = mm_api_cache( $api_url );

		return $this->get_response( $api_response );
	}

	/**
	 * Get all applicable params.
	 *
	 * @param array            $params
	 * @param \WP_REST_Request $request
	 *
	 * @return array
	 */
	public function get_params( $params, WP_REST_Request $request ) {

		if ( ! empty( $request['category'] ) ) {
			$params['category'] = $request->get_param( 'category' );
		}

		if ( ! empty( $request['count'] ) ) {
			$params['count'] = $request->get_param( 'count' );
		}

		if ( ! empty( $request['direction'] ) ) {
			$params['direction'] = $request->get_param( 'direction' );
		}

		if ( ! empty( $request['itemCategory'] ) ) {
			$params['itemCategory'] = $request->get_param( 'itemCategory' );
		}

		if ( ! empty( $request['order'] ) ) {
			$params['order'] = $request->get_param( 'order' );
		}

		if ( ! empty( $request['page'] ) ) {
			$params['page'] = $request->get_param( 'page' );
		}

		if ( ! empty( $request['query'] ) ) {
			$params['query'] = $request->get_param( 'query' );
		}

		if ( ! empty( $request['seller'] ) ) {
			$params['seller'] = $request->get_param( 'seller' );
		}

		if ( ! empty( $request['services'] ) ) {
			$params['services'] = $request->get_param( 'services' );
		}

		if ( ! empty( $request['type'] ) ) {
			$params['type'] = $request->get_param( 'type' );
		}

		return $params;
	}

	/**
	 * Get the REST response from the Mojo API response.
	 *
	 * @param array|\WP_Error $api_response
	 *
	 * @return array
	 */
	public function get_response( $api_response ) {

		$status_code = absint( wp_remote_retrieve_response_code( $api_response ) );

		$response = [
			'status'     => 'error',
			'statusCode' => $status_code,
			'message'    => 'An unknown error occurred.',
		];

		if ( is_wp_error( $api_response ) ) {
			return $response;
		}

		$body = wp_remote_retrieve_body( $api_response );
		if ( empty( $body ) ) {
			$response['message'] = 'Unable to parse response body.';
		}

		$data = json_decode( $body, true );
		if ( ! $data ) {
			$response['message'] = 'Unable to parse response JSON.';
		}

		$response = array_merge( $data, [ 'statusCode' => $status_code ] );

		// Ensure page property is always an integer.
		if ( isset( $response['page'] ) && ! is_int( $response['page'] ) ) {
			$response['page'] = absint( $response['page'] );
		}

		return rest_ensure_response( $response );
	}

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 *
	 * @return WP_Error|bool
	 */
	public function get_items_permissions_check( $request ) {
		return true;

		// We don't want these endpoints to be publicly queryable.
		// This would make it easy to DDoS any bluehost site.
		return current_user_can( 'edit_post' );
	}

	/**
	 * Prepare the item for the REST response
	 *
	 * @param mixed           $item WordPress representation of the item.
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return mixed
	 */
	public function prepare_item_for_response( $item, $request ) {
		return array();
	}

	/**
	 * Get the query params for collections
	 *
	 * @return array
	 */
	public function get_collection_params() {
		return array(
			'category'     => array(
				'description' => 'Category ID or slug (this is ItemTypeCategory).',
				'type'        => 'string',
				'enum'        => array(
					'wordpress',
				),
				'default'     => 'wordpress',
			),
			'count'        => array(
				'description' => 'Maximum number of items to return (maximum allowed is 50).',
				'type'        => 'integer',
				'default'     => 12,
			),
			'direction'    => array(
				'description' => 'Sort direction.',
				'type'        => 'string',
				'enum'        => array(
					'asc',
					'desc',
				),
				'default'     => 'desc',
			),
			'itemCategory' => array(
				'description'       => 'Item Category slug (this is ItemCategory).',
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
			'order'        => array(
				'description' => 'Order to sort items by.',
				'type'        => 'string',
				'enum'        => array(
					'popular',
					'latest',
					'random',
					'sales',
				),
				'default'     => 'sales',
			),
			'page'         => array(
				'description' => 'Offset from the first several items (maximum allowed is 10).',
				'type'        => 'integer',
			),
			'query'        => array(
				'description' => 'A search query.',
				'type'        => 'string',
				'default'     => '',
			),
			'seller'       => array(
				'description'       => 'User ID or brand profile name.',
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
			),
			'services'     => array(
				'description' => 'Indicates that services should be returned instead of purchasable items. If you define the type as services then you can ignore this flag.',
				'type'        => 'boolean',
				'default'     => false,
			),
			'type'         => array(
				'description' => 'Item type.',
				'type'        => 'string',
				'enum'        => array(
					'themes',
					'graphics',
					'plugins',
					'services',
				),
				'default'     => 'themes',
			),
		);
	}
}