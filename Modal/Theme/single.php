<?php wp_enqueue_script( 'script', get_template_directory_uri() . '/js/modal.js?v0.13', array ( 'jquery' ), 1.1, true); ?>
<?php wp_enqueue_style( 'modal', get_template_directory_uri() . '/css/modal.css?v0.12',false,'1.1','all'); ?>

<?php
/**
 * The template for displaying all single posts.
 *
 * @package Sydney
 */

get_header(); ?>

	<?php if (get_theme_mod('fullwidth_single')) { //Check if the post needs to be full width
		$fullwidth = 'fullwidth';
	} else {
		$fullwidth = '';
	} ?>

	<?php do_action('sydney_before_content'); ?>

	<div id="primary" class="content-area col-md-9 <?php echo $fullwidth; ?>">
		<main id="main" class="post-wrap" role="main">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'content', 'single' ); ?>

<!-- <?php sydney_post_navigation(); ?>

			<?php
				// If comments are open or we have at least one comment, load up the comment template
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;
			?>

		<?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

	<?php do_action('sydney_after_content'); ?>

<?php if ( get_theme_mod('fullwidth_single', 0) != 1 ) {
	get_sidebar();
} ?>
<?php get_footer(); ?>

            <div class="modal-wrapper">
              <div class="modal-test">
                <div class="close-modal">X</div>
                <div id="modal-content"></div>
              </div>
            </div>
            <!-- end modal-wrapper -->

            <div class="show-in-modal hide">
              <h1>This is the modal content</h1>
            </div>
            <!-- our JS calls the .show-in-modal class -->