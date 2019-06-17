<?php 
/* Child theme generated with WPS Child Theme Generator */
            
if ( ! function_exists( 'b7ectg_theme_enqueue_styles' ) ) 
{            
    add_action( 'wp_enqueue_scripts', 'b7ectg_theme_enqueue_styles' );    
    function b7ectg_theme_enqueue_styles() 
    {
        wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
        wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'parent-style' ) );
    }
}
add_role('staff','Staff',array('read'=> false,'edit_posts'=> false,'delete_posts' => false));
add_action( 'show_user_profile', 'ai_personality_insights_fields' );
add_action( 'edit_user_profile', 'ai_personality_insights_fields' );
function ai_personality_insights_fields( $user ) 
{ ?>
    <h3>Ai Personality Insights</h3>
    <table class="form-table">
        <tr>
            <th><label for="user_point_pi">Ai Personality Insights Point</label></th>
            <td>
                <input type="number" name="user_point_pi" id="user_point_pi" value="<?php echo esc_attr( get_the_author_meta('user_point_pi', $user->ID )); ?>">
            </td>
        </tr>
    </table><?php 
}
add_action( 'personal_options_update', 'save_ai_personality_insights_fields' );
add_action( 'edit_user_profile_update', 'save_ai_personality_insights_fields' );
function save_ai_personality_insights_fields( $user_id ) {
    if ( !current_user_can( 'edit_user', $user_id ) ) { 
        return false; 
    }
    update_user_meta( $user_id, 'user_point_pi', $_POST['user_point_pi'] );
}
add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' ); 
function custom_override_checkout_fields( $fields ) 
{
    unset($fields['billing']['billing_address_1']);
    unset($fields['billing']['billing_address_2']);
    unset($fields['billing']['billing_city']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_company']);
    return $fields;
}
function action_woocommerce_payment_complete( $order_id, $int1, $int2 ) 
{ 
    $order = wc_get_order( $order_id );
    $items = $order->get_items();
    foreach ( $items as $item ) 
    {
        $order_data_tc=$item->get_data();  
        $new_order_cridit = get_field('no_of_point',$item->get_product_id())*$order_data_tc['quantity'];
        $user_credit=get_the_author_meta('user_point_pi', $order->user_id);
        $user_total_credit=get_the_author_meta('user_total_point_pi', $order->user_id);
        update_post_meta( $order_id, '_updated_credit',$user_credit+$new_order_cridit); 
        update_user_meta($order->user_id,'user_point_pi',$user_credit+$new_order_cridit);      
        update_user_meta($order->user_id,'user_total_point_pi',$user_total_credit+$new_order_cridit);      
    }
}
add_action( 'woocommerce_payment_complete', 'action_woocommerce_payment_complete', 10, 3 ); 
add_action('wp_footer','wp_footer_callback');
function wp_footer_callback()
{?>    
  <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/jquery.simplePopup.js"></script>
  <div id="buy_credit_tc" style="display: none;" class="simplePopup">
    <div class="buy_credit_aria">
      <p class="error--message">You Must First Buy Credit To Analyze Your Text...!!</p>
        <a href="<?php echo get_site_url();?>/billing/"><button>Buy Credit Now</button></a>
    </div>
  </div>
  <script type="text/javascript">
      (function() {
        jQuery(".buy_credit_tc_btn").click(function(e)
        {
            jQuery("#buy_credit_tc").simplePopup(); 
            return false;
        });
      })();
  </script><?php
}
function my_custom_insert_after_helper( $items, $new_items, $after ) 
{
  $position = array_search( $after, array_keys( $items ) ) + 1;
  $array = array_slice( $items, 0, $position, true );
  $array += $new_items;
  $array += array_slice( $items, $position, count( $items ) - $position, true );
  return $array;
}
function my_custom_my_account_menu_items( $items ) 
{
  $new_items = array();
  $new_items['analyze_report'] = __( 'Analyze Report', 'woocommerce' );
  return my_custom_insert_after_helper( $items, $new_items, 'orders' );
}
add_filter( 'woocommerce_account_menu_items', 'my_custom_my_account_menu_items' );
function techno_add_my_account_endpoint() 
{
  add_rewrite_endpoint( 'analyze_report', EP_PAGES );
}
add_action( 'init', 'techno_add_my_account_endpoint' );

function techno_analyze_report_endpoint_content() 
{
  $user = wp_get_current_user();
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
      echo '<li><span>['.$report_num.'] '.$value->name_of_report.'</span><a href="'.get_site_url().'/analyze-report/?report_stamp='.$value->time.'">Report : '.date("Y-m-d h:i:sa", $value->time).'</a></li>';
    }
  }
  else
  {
    echo '<li><a href="'.get_site_url().'">No Generated Report Found ! Click To Generate New Report</a></li>';
  }
  echo '</ul>';
} 
add_action( 'woocommerce_account_analyze_report_endpoint', 'techno_analyze_report_endpoint_content' );
function get_percentile_rount($percentile)
{
  return round($percentile*100);
}
add_filter( 'wp_nav_menu_items', 'wti_loginout_menu_link', 10, 2 );
function wti_loginout_menu_link( $items, $args ) 
{
  if (is_user_logged_in()) {
     $items .= '<li class="right"><a href="'. wp_logout_url(get_site_url().'/account/') .'">'. __("Logout") .'</a></li>';
  } 
  return $items;
}