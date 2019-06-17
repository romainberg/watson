<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/style.css">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'twentyseventeen' ); ?></a>

	<header id="masthead" class="site-header" role="banner">

		<?php //get_template_part( 'template-parts/header/header', 'image' ); ?>
		<div class="custom-header">
			<?php //get_template_part( 'template-parts/header/site', 'branding' ); ?>
			<div class="site-branding">
				<div class="wrap">
					<div class="logo">
						<?php the_custom_logo(); ?>
					</div>
				</div>
			</div>
			<div class="site-menu">
				<div class="wrap">
				<?php if ( has_nav_menu( 'top' ) ) : ?>
			<div class="navigation-top">
				<?php get_template_part( 'template-parts/navigation/navigation', 'top' ); ?>
			</div><!-- .navigation-top -->
		<?php endif; ?>

				</div><!-- .wrap -->
			</div><!-- .site-branding -->

		</div><!-- .custom-header -->

		
	</header><!-- #masthead -->



	<div class="site-content-contain">
		<div id="content" class="site-content">
