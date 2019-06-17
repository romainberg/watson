<?php 
  // Template Name: report-page
  ob_start();
  get_header(); ?>
  <div class="wrap">
  <div class="section-main-tc">
    <div class="section-top-tc">
      <div class="section-report-tc repot-page-section">
        <h4>Recent Reports</h4><?php
        $user = wp_get_current_user();
        $user_total_credit=get_the_author_meta('user_point_pi', $user->ID);
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
            $report_num = $key+1;
            echo '<li><a class="r_list" href="'.get_site_url().'/analyze-report/?report_stamp='.$value->time.'"><span>'.$value->time.' </span><span> '.date("m/d/Y", $value->time).' </span><span>'.$value->name_of_report.'</span></a></li>';
          }
        }
        else
        {
          echo '<li><a href="'.get_site_url().'">No Generated Report Found ! Click To Generate New Report</a></li>';
        }
        echo '</ul>';?>
      </div> 
    </div> 
  </div>
  </div><?php
  get_footer();
?>