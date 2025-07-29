<?php
// Single product template for MobileSentrix Theme
get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <?php
        while ( have_posts() ) :
            the_post();
            wc_get_template_part( 'content', 'single-product' );
        endwhile;
        ?>
    </main>
</div>

<?php
get_footer();
?>
