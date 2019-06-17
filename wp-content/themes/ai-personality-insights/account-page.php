<?php 
// Template Name: account-page
get_header(); 
ob_start();
if(@$_POST['pwd1']!='' && $_POST['first_name']!='' && $_POST['last_name']!='' && $_POST['email']!='' && $_POST['task'] == 'register')
{
	global $wpdb;
	$pwd1 = trim($_POST['pwd1']);
	$first_name = sanitize_text_field($_POST['first_name']);
	$last_name = sanitize_text_field($_POST['last_name']);
	$email = sanitize_email($_POST['email']);
	$parts = explode("@", $email);
	$username = $parts[0];
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) 
	{
	  	$error_msg='<p class="error--message">Invalid email address.<p>';
	} 
	else if(email_exists($email) ) 
	{
	  	$error_msg='<p class="error--message">Email already exist.<p>';
	}
	else{
	  $user_id = wp_insert_user( array ('first_name' => apply_filters('pre_user_first_name', $first_name), 'last_name' => apply_filters('pre_user_last_name', $last_name), 'user_pass' => apply_filters('pre_user_user_pass', $pwd1), 'user_login' => apply_filters('pre_user_user_login', $username), 'user_email' => apply_filters('pre_user_user_email', $email), 'role' => 'customer' ) );
	  if( is_wp_error($user_id) ) 
	  {
	    	$error_msg='<p class="error--message">Error on user creation.<p>';
	  }
	  else
	  {
		    update_user_meta( $user_id, 'billing_first_name', $first_name);
		    update_user_meta( $user_id, 'billing_last_name', $last_name);
		    update_user_meta( $user_id, 'billing_email', $email);
		    wp_set_auth_cookie($user_id,true, '');
		    header("Location:".get_site_url());
	  }         
	}
}
if (!is_user_logged_in())
{?>
	<div class="wrap">
  <div class="forms_tech">          
    <div class="techno-main-login">
	    <?php if(isset($error_msg)) 
	    {
	    	echo $error_msg;
	    }?>
	    
		<form name="loginform" id="loginform" action="<?php echo get_site_url();?>/wp-login.php" method="post">
			<p class="login-username">
			  	<label  class="lbl_login" for="user_login">Username or Email Address</label>
			  	<input type="text" name="log" id="user_login" class="input" value="" size="20" required>
			</p>
			<p class="login-password">
			  	<label class="lbl_login" for="user_pass">Password</label>
			  	<input type="password" name="pwd" id="user_pass" class="input" value="" size="20" required>
			</p>          
			<p class="login-remember forgetmenot">
			  	<label class="lbl_login" for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever"> Remember Me</label>
			</p>
			<p class="login-submit">
			  	<input type="submit" name="wp-submit" id="wp-submit" class="button button-primary" value="Log In">
			  	<input type="hidden" name="redirect_to" value="<?php echo get_site_url();?>">
			</p>            
		</form>
    </div>
    <div class="techno-main-ragister">
      <form method="POST" id="signup">
        <div>     
          <div class="col-5">
            <label class="lbl_login">First Name</label>
            <input type="text" required value="" name="first_name" id="first_name" size="20">
          </div>
          <div class="col-5">
            <label class="lbl_login">Last Name</label>
            <input type="text" required value="" name="last_name" id="last_name" size="20">
          </div>
          <div class="col-1">
            <label class="lbl_login">Email</label>
            <input type="email" required value="" name="email" id="email" size="20">
          </div>
          <div class="col-1">
            <label class="lbl_login">Password</label>
            <input type="password" required value="" minlength="6" name="pwd1" id="pwd1" size="20">
          </div>
          <input type="hidden" name="task" value="register" />
        </div>
        <p class="login-submit">
          <button type="submit" name="btnregister" class="button button-primary">Register</button>
        </p>
      </form>
    </div>
  </div>
  </div><?php
} 
get_footer(); ?>