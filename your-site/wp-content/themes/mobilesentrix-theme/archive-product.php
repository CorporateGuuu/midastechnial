<?php
// Archive product template for MobileSentrix Theme
get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <h1>Product Archive</h1>
        <?php if ( have_posts() ) : ?>
            <ul class="products">
                <?php while ( have_posts() ) : the_post(); ?>
                    <li><?php the_title(); ?></li>
                <?php endwhile; ?>
            </ul>
        <?php else : ?>
            <p>No products found.</p>
        <?php endif; ?>
    </main>
</div>

<?php
get_footer();
?>
