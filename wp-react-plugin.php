<?php
/**
 * Plugin Name:     1Wp React Plugin
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     wp-react-plugin
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Wp_React_Plugin
 */

if ( !defined( 'WPR_VERSION' ) ) {
    /**
     * The version of the plugin.
     */
    define( 'WPR_VERSION', '0.1.0' );
}
if ( !defined( 'WPR_PATH' ) ) {
    /**
     *  The server file system path to the plugin directory.
     */
    define( 'WPR_PATH', plugin_dir_path( __FILE__ ) );
}
if ( !defined( 'WPR_URL' ) ) {
    /**
     * The url to the plugin directory.
     */
    define( 'WPR_URL', plugin_dir_url( __FILE__ ) );
}
if ( !defined( 'WPR_BASE_NAME' ) ) {
    /**
     * The url to the plugin directory.
     */
    define( 'WPR_BASE_NAME', plugin_basename( __FILE__ ) );
}

add_action( 'wp_enqueue_scripts', 'react_scripts' );

function react_scripts() {
    wp_enqueue_script( 'wp-tinymce' );
    wp_enqueue_script( 'react-wp', 'https://unpkg.com/react@18/umd/react.development.js', array(), WPR_VERSION, true );
    wp_enqueue_script( 'react-dom-wp', 'https://unpkg.com/react-dom@18/umd/react-dom.development.js', array( 'react-wp' ), WPR_VERSION, true );
    wp_enqueue_script(
        'react-custom',
        trailingslashit( WPR_URL ) . 'custom-scripts.js',
        array( 'react-wp', 'react-dom-wp' ),
        WPR_VERSION,
        true
    );

    $user = wp_get_current_user();
    $user_name = $user->user_login;

    $args = array(
        'tinymce'       => array(
            'toolbar1'      => 'bold,italic,underline,separator,alignleft,aligncenter,alignright,separator,link,unlink,undo,redo',
            'toolbar2'      => '',
            'toolbar3'      => '',
        ),
    );

    // ob_start();
    // wp_editor( 'ABC', 'test_id', $args );
    // $editor_ed = ob_get_clean();

    $data = array(
        'current_user_name' => $user_name,
        // 'wp_ediotr'         => $editor_ed,
    );

    wp_localize_script( 'react-custom', 'bb_react' , $data );
}

add_filter( 'script_loader_tag', 'add_id_to_script', 10, 3 );

function add_id_to_script( $tag, $handle, $source ) {
    if ( 'react-custom' === $handle ) {
        $tag = '<script type="text/javascript" src="' . $source . '" type="module" id="'.$handle.'-js"></script>';
    }

    return $tag;
}
