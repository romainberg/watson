<?php 
  // Template Name: main-page
  ob_start();
  get_header(); ?>
  <div class="wrap">
  <div class="section-main-tc">
    <div class="section-top-tc">
      <div class="section-report-tc">
        <h4>Recent Reports</h4><?php
        $user = wp_get_current_user();
        $user_total_credit=get_the_author_meta('user_total_point_pi', $user->ID);
        $user_credit=get_the_author_meta('user_point_pi', $user->ID);
        $user_analyze_report=json_decode(get_the_author_meta('user_analyze_report', $user->ID ));
        echo '<ul class="report_list">';
        if(sizeof($user_analyze_report)>0)
        {
          foreach ($user_analyze_report as $key => $node) 
          {
            $timestamps[$key]    = $node->time;
          }
          array_multisort($timestamps, SORT_DESC, $user_analyze_report);
          foreach ($user_analyze_report as $key => $value) 
          {
            if($key <=3){
              
            $report_num = $key+1;
            echo '<li><a href="'.get_site_url().'/analyze-report/?report_stamp='.$value->time.'"><span class="date">'.date("m/d/Y", $value->time).'</span> '.$value->name_of_report.'</a></li>';
            }
          }
        }
        else
        {
          echo '<li><a href="'.get_site_url().'">No Generated Report Found ! Click To Generate New Report</a></li>';
        }
        echo '</ul>';?>
      </div> 
      <div class="section-credit-tc">
        <h4>Credits</h4>
        <div class="credit-sec">
          <ul>
            <li><span class="credit-detail"> Purchased:</span> <strong><?php echo $user_total_credit; ?></strong></li>
            <li><span class="credit-detail"> Used:</span> <strong><?php echo $user_total_credit-$user_credit; ?></strong></li>
            <li><span class="credit-detail"> Available:</span> <strong><?php echo $user_credit; ?></strong></li>
          </ul>
          <div class="credit-btn">
            <a href="<?php echo get_site_url();?>/billing/"><button>Add Credits</button></a>
          </div>
        </div>
      </div> 
    </div> 
    <div class="section-articles-tc">
      <h4>Popular Help Articles</h4>
      <ul><?php
        $args = array('post_type'=>'post','posts_per_page' => -1,'order'=>'ASC');
        $the_query = new WP_Query($args);
        if( $the_query->have_posts() ): 
          while ( $the_query->have_posts() ) : $the_query->the_post(); 
            echo '<li><a href="'.get_post_permalink().'">'.get_the_title().'</li></a>';
          endwhile;
        endif; 
        wp_reset_query();?>
      </ul>
    </div> 
  </div>
  </div><?php
  get_footer();
?>