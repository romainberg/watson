<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'rbergdweseo_wp533' );

/** MySQL database username */
define( 'DB_USER', 'rbergdweseo_wp533' );

/** MySQL database password */
define( 'DB_PASSWORD', '!4S33Cpk(0' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'txpqk0za8jufr1iyta0u1b0cz1fgh0kepo8fu6ptczyi6ahcsvco1cevi2iqqpmp' );
define( 'SECURE_AUTH_KEY',  'eyioa9oajdojebegrbbgpjcoddmydyj1zj1rezjscbpvyaflt8gx7pkqlkggnumb' );
define( 'LOGGED_IN_KEY',    'ce1pgyar4h8zja6c89tczkqllh35wbvhp6hbvxzfx6zl8yprw1uzvpc9guchduam' );
define( 'NONCE_KEY',        'iphqxvnl3ppxsggyfj34emy9txzm27sqaskezqfrg0zbrgv7kdjkbhrflbs45d1c' );
define( 'AUTH_SALT',        'ezdx5w48brnqfpqmltouchgayd5utbye39jgakmwlvxfxuimt3p8d9dooufzafmm' );
define( 'SECURE_AUTH_SALT', 'lwtmodtgfhavrvnbmabusniffl8j26ycwekxeplbdu7467difjvrchrnfrkz0nge' );
define( 'LOGGED_IN_SALT',   'rwa4jzx2z6p3vhdf5judp2w4sfhfdk4dum086wcmwezcjnqve8gxhts55cucalbc' );
define( 'NONCE_SALT',       'hiikhtcusq1dc4hyuenvglnmddjquvxtl4hgujtdz05iv9fmmq2qev1uadgcp5db' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpjc_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
