<?php
/**
 * Plugin Name: Bluehost
 * Description: This plugin integrates your WordPress site with the Bluehost control panel, including performance, security, and update features.
 * Version: 1.4.3
 * Author: Bluehost
 * Author URI: https://www.bluehost.com/
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Bluehost
 */

// Do not access file directly!
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Define constants
define( 'MM_VERSION', '1.4.3' );
define( 'MM_BASE_URL', plugin_dir_url( __FILE__ ) );
define( 'MM_ASSETS_URL', 'https://www.mojomarketplace.com/mojo-plugin-assets/' );

define( 'BLUEHOST_PLUGIN_VERSION', MM_VERSION );
define( 'BLUEHOST_PLUGIN_DIR', dirname( __FILE__ ) );

// Composer autoloader
if ( version_compare( phpversion(), 5.3, '<' ) ) {
	require BLUEHOST_PLUGIN_DIR . '/vendor/autoload_52.php';
} else {
	require BLUEHOST_PLUGIN_DIR . '/vendor/autoload.php';
}

// Handle any upgrade routines
if ( is_admin() ) {

	require BLUEHOST_PLUGIN_DIR . '/inc/upgrade-handler.php';

	$upgrade_handler = new Bluehost_Upgrade_Handler(
		BLUEHOST_PLUGIN_DIR . '/upgrades',
		get_option( 'bluehost_plugin_version', BLUEHOST_PLUGIN_VERSION ),
		BLUEHOST_PLUGIN_VERSION
	);

	$did_upgrade = $upgrade_handler->maybe_upgrade();
	if ( $did_upgrade ) {
		update_option( 'bluehost_plugin_version', BLUEHOST_PLUGIN_VERSION, true );
	}
}

// Require files
require BLUEHOST_PLUGIN_DIR . '/inc/class-access-token.php';
require BLUEHOST_PLUGIN_DIR . '/inc/class-response-utilities.php';
require BLUEHOST_PLUGIN_DIR . '/inc/class-site-meta.php';
require BLUEHOST_PLUGIN_DIR . '/inc/base.php';
require BLUEHOST_PLUGIN_DIR . '/inc/checkout.php';
require BLUEHOST_PLUGIN_DIR . '/inc/menu.php';
require BLUEHOST_PLUGIN_DIR . '/inc/shortcode-generator.php';
require BLUEHOST_PLUGIN_DIR . '/inc/mojo-themes.php';
require BLUEHOST_PLUGIN_DIR . '/inc/styles.php';
require BLUEHOST_PLUGIN_DIR . '/inc/plugin-search.php';
require BLUEHOST_PLUGIN_DIR . '/inc/jetpack.php';
require BLUEHOST_PLUGIN_DIR . '/inc/user-experience-tracking.php';
require BLUEHOST_PLUGIN_DIR . '/inc/notifications.php';
require BLUEHOST_PLUGIN_DIR . '/inc/staging.php';
require BLUEHOST_PLUGIN_DIR . '/inc/updates.php';
require BLUEHOST_PLUGIN_DIR . '/inc/coming-soon.php';
require BLUEHOST_PLUGIN_DIR . '/inc/tests.php';
require BLUEHOST_PLUGIN_DIR . '/inc/track-last-login.php';
require BLUEHOST_PLUGIN_DIR . '/inc/performance.php';
require BLUEHOST_PLUGIN_DIR . '/inc/partners.php';

mm_require( BLUEHOST_PLUGIN_DIR . '/inc/branding.php' );
if ( mm_jetpack_bluehost_only() ) {
	$onboard_time = strtotime( get_option( 'mm_install_date', 0 ) ) + DAY_IN_SECONDS * 90;
	if ( $onboard_time > time() ) {
		mm_require( BLUEHOST_PLUGIN_DIR . '/vendor/automattic/jetpack-onboarding/jetpack-onboarding.php' );
		mm_require( BLUEHOST_PLUGIN_DIR . '/lib/jetpack-onboarding-tracks/jetpack-onboarding-tracks.php' );
	}
}
mm_require( BLUEHOST_PLUGIN_DIR . '/updater.php' );
// Check proper PHP and bring CLI loader online
if ( version_compare( PHP_VERSION, '5.3.29' ) >= 0 ) {
	mm_require( BLUEHOST_PLUGIN_DIR . '/inc/cli-init.php' );
}

mm_require( BLUEHOST_PLUGIN_DIR . '/inc/admin-page-notifications-blocker.php' );

if ( is_admin() ) {
	// Keep the Bluehost API access token fresh.
	add_action( 'shutdown', array( 'Bluehost_Access_Token', 'maybe_refresh_token' ) );
}
