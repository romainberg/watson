<?php 
// Template Name: billing-page
get_header();?>
<div class="wrap">
  <div class="section-main-tc">
    <div class="section-top-tc">
      <div class="section-transactions-tc">
        <h4>Recent Reports</h4><?php
        $user = wp_get_current_user();  
        $user_credit=get_the_author_meta('user_point_pi', $user->ID);
        $user_analyze_report=json_decode(get_the_author_meta('user_analyze_report', $user->ID ));
        $customer_orders = wc_get_orders( array('meta_key' => '_customer_user','meta_value' => $user->ID,'numberposts' => -1));
		$billing_arr=array();
		foreach ($customer_orders as $orders_key => $orders_value) 
		{
			$order = wc_get_order($orders_value);
			$data_order = $order->get_date_completed()->date("F j, Y, g:i:s A T");
			$date = new DateTime($data_order);
			$order_timestamp = $date->getTimestamp();
			foreach ( $order->get_items() as $item ) 
	  		{		
	  			$order_data_tc=$item->get_data();  
	  			$new_order_cridit = get_field('no_of_point',$item->get_product_id())*$order_data_tc['quantity'];
	  			$billing_arr[]=array('timestamps'=>$order_timestamp,'type'=>'Credit Purchase','cridit'=>$new_order_cridit,'new_credit'=>get_post_meta($order_data_tc['order_id'], '_updated_credit',true));
	  		}
		}
        echo '<ul class="report_list billing-page">';
        if(sizeof($user_analyze_report)>0)
        {
          foreach ($user_analyze_report as $key => $value) 
          {
  			$billing_arr[]=array('timestamps'=>$value->time,'type'=>'Order '.$value->time,'cridit'=>-1,'new_credit'=>@$value->user_credit);
          }
        }
		foreach ($billing_arr as $key => $node) 
		{
			$timestamps[$key] = $node['timestamps'];
		}
		if(sizeof($billing_arr)>0)
        {
			array_multisort($timestamps, SORT_ASC, $billing_arr);
        }
		foreach ($billing_arr as $key => $value) 
		{
			echo '<li><span>'.date("m/d/Y", $value['timestamps']).'</span> <span>'.$value['type'].'</span> <span> '.$value['cridit'].'</span> <span> '.$value['new_credit'].'</span></li>';
		}
        echo '</ul>';?>
      </div> 
      <div class="section-credit-tc add-credit">
        <h4>Add Credits</h4>
        <ul>          
          	<?php $args = array('post_type'=>'product','posts_per_page' => -1,'order'=>'ASC');
			$the_query = new WP_Query($args);
			if( $the_query->have_posts() ): 
				while ( $the_query->have_posts() ) : $the_query->the_post(); 
					$product = wc_get_product(get_the_ID());
					echo '<li>
						<form class="cart" action="'.get_site_url().'/cart" method="post" enctype="multipart/form-data">
	        				<button type="submit" name="add-to-cart" value="'.get_the_ID().'" class="button button-primary buy_credit_btn">'.get_field('no_of_point',get_the_ID()).' - $'.$product->get_price().'</button>
	      				</form>
      				</li>';
				endwhile;
			endif; 
			wp_reset_query(); ?>
        </ul>
      </div> 
    </div>  
  </div>
  </div><?php	
get_footer();
?>