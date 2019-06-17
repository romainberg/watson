<?php 
  // Template Name: Ai Personality Insights
use Dompdf\Dompdf;
ob_start();  
$user = wp_get_current_user();
if(!isset($_GET['pdf_download'])){

  global $wpdb;
  $error_msg='';
  get_header(); 
  echo '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>';
  if(isset($_POST['analyze_inputtext']) && isset($_POST['name_of_report'])) 
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://gateway-lon.watsonplatform.net/personality-insights/api/v3/profile?version=2017-10-13&consumption_preferences=true&raw_scores=true&csv_headers=true');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST['analyze_inputtext']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, 'apikey' . ':' . 'E-C5F7nKY28wCl1CKv5HWpQ7hMccAbA74RsKeLam9hHP');

    $headers = array();
    $headers[] = 'Content-Type: text/plain;charset=utf-8';
    $headers[] = 'Accept: application/json';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close ($ch);
    $result_status_tc = json_decode($result);

    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, 'https://gateway-lon.watsonplatform.net/personality-insights/api/v3/profile?version=2017-10-13&consumption_preferences=true&raw_scores=true&csv_headers=true');
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch2, CURLOPT_POSTFIELDS, $_POST['analyze_inputtext']);
    curl_setopt($ch2, CURLOPT_POST, 1);
    curl_setopt($ch2, CURLOPT_USERPWD, 'apikey' . ':' . 'E-C5F7nKY28wCl1CKv5HWpQ7hMccAbA74RsKeLam9hHP');
    $headers2 = array();
    $headers2[] = 'Content-Type: text/plain;charset=utf-8';
    $headers2[] = 'Accept: text/csv';
    curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers2);
    $result2 = curl_exec($ch2);
    if (curl_errno($ch2)) {
        echo 'Error:' . curl_error($ch2);
    }
    curl_close ($ch2);
    if(!isset($result_status_tc->code) && !isset($result_status_tc->error) && is_user_logged_in())
    {      
    if (!file_exists('wp-content/uploads/report_'.$user->ID))
    {
        mkdir('wp-content/uploads/report_'.$user->ID, 0777, true);
    }    
    if ($handle = opendir('wp-content/uploads/report_'.$user->ID)) 
    {
        $files = array();
        while (false !== ($file = readdir($handle))) 
        {
            $fpath = 'wp-content/uploads/report_'.$user->ID.'/'.$file;
            if ($file != "." && $file != ".." && file_exists($fpath)) 
            {
               $files[filemtime($fpath)] = $fpath;
            }
        }
        closedir($handle);
        // sort
        krsort($files);
        $i=0;
        foreach ($files as $file_key => $file_value) 
        {
          if($i>10){
            unlink($file_value);
          }
          $i++;
        }
    }
    $csvFileName = 'wp-content/uploads/report_'.$user->ID.'/report-'.$_POST['name_of_report'].'.csv';
    $report=explode('
', $result2);
    $array_1=explode(',', $report[0]);
    $array_2=explode(',', $report[1]);
    $fp = fopen($csvFileName, 'w');
    foreach ($array_1 as $key => $value) 
    {
      fputcsv($fp, array($array_1[$key],$array_2[$key]));
    }
    fclose($fp);
      $time_store = time();
      if(in_array( 'customer', (array) $user->roles) && get_the_author_meta('user_point_pi', $user->ID ) > 0 )
      {
        $user_credit=get_the_author_meta('user_point_pi', $user->ID );
        $user_analyze_report=json_decode(get_the_author_meta('user_analyze_report', $user->ID ));
        update_user_meta($user->ID,'user_point_pi',$user_credit-1); 
        if(sizeof($user_analyze_report)<=10)
        {
          if(sizeof($user_analyze_report)==10)
          {
            array_shift($user_analyze_report);
          }
          $user_analyze_report[]= array('name_of_report'=>$_POST['name_of_report'],'text' => base64_encode(serialize($_POST['analyze_inputtext'])),'report' => $result_status_tc,'user_credit'=>$user_credit-1, 'report_csv'=>$csvFileName,'time'=> $time_store );
          update_user_meta($user->ID,'user_analyze_report',json_encode($user_analyze_report)); 
        }
        else{
          $error_msg='<p class="error--message">Your Analyze report storage limit exceeded...!!<p>';
        }
      }
      elseif(in_array( 'staff', (array) $user->roles) || in_array( 'administrator', (array) $user->roles))
      {
        $user_analyze_report=json_decode(get_the_author_meta('user_analyze_report', $user->ID ));
        if(sizeof($user_analyze_report)<=10)
        {
          if(sizeof($user_analyze_report)==10)
          {
            array_shift($user_analyze_report);
          }
          $user_analyze_report[]= array('name_of_report' => $_POST['name_of_report'],'text' => base64_encode(serialize($_POST['analyze_inputtext'])),'report' => $result_status_tc,'report_csv'=>$csvFileName,'time'=> $time_store );
          update_user_meta($user->ID,'user_analyze_report',json_encode($user_analyze_report));        
        }
        else{
          $error_msg='<p class="error--message">Your Analyze report storage limit exceeded...!!<p>';
        }
      }
      else{
        $error_msg='<p class="error--message">You Must First Buy Credit To Analyze Your Text...!!<p>';
      }
    }
  }?>
    <div class="wrap">
      <div class="tab-panels">
        <div class="tab-panels--tab-content">          
        <form class="input--form2" method="POST">
          <label class="report-name">Report Name</label>
          <input style="margin-top: 10px;" type="text" name="name_of_report" id="name_of_report" placeholder="Name of Report" required>
          <label class="base--inline-label input--radio smartphone-hidden"  id="paste">Paste Text</label><?php
          if(in_array( 'customer', (array) $user->roles) && is_user_logged_in())
          {
            echo '<label class="base--inline-label input--radio credit_scrore_lbl">Your Current Credit : <span>'.get_the_author_meta('user_point_pi', $user->ID ).'</span></label>';
          }?>
          <textarea id="inputText" name="analyze_inputtext" class="base--textarea input--text-area orientation" required><?php if(isset($_POST['analyze_inputtext'])){ echo $_POST['analyze_inputtext']; } ?></textarea>
          <div id="display_count_word"></div>
          <div class="input--button-container">
            <button type="submit" id="techno_analyze_btn" class="base--button input--submit-button2">Analyze</button>
          </div>
        </form>
        </div>
      </div>
    </div>
      <script type="text/javascript">
        jQuery(document).ready(function(e)
        {
          jQuery('#paste').click(function (e) 
          {
            jQuery('#inputText').val('');
            navigator.clipboard.readText()
              .then(text => {
                jQuery('#inputText').val(text);
              })
              .catch(err => {
                console.log('Something went wrong', err);
              });
          });
          jQuery("#inputText").on('keyup click change', function(e) 
          {   
            if(this.value!='')
            {
              var words = this.value.match(/\S+/g).length;
              if (words < 2000) 
              {
                jQuery('#display_count_word').text(words+' Word (Weak Analysis)');                  
              }
              else if(words > 2000 && words < 5000)
              {
                jQuery('#display_count_word').text(words+' Word (Decent Analysis)');   
              }
              else if(words > 5000)
              {
                jQuery('#display_count_word').text(words+' Word (Strong Analysis)');   
              }
            }
            else 
            {
              jQuery('#display_count_word').text('');
            }
          });
        });
      </script>
      <?php 
      if(isset($result))
      {?>
        <script type="text/javascript">
          var data_res_tc = <?php echo $result; ?>;
          console.log(data_res_tc);
        </script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-url-parser/2.3.1/purl.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/5.0.2/markdown-it.min.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/personality-text-summary.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/personality-trait-info.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/personality-trait-descriptions.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/personality-trait-names.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/personality-consumption-preferences.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/script.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/consumption-preferences-likely-sort.js"></script>
        <script type="text/javascript" src="<?php echo get_stylesheet_directory_uri(); ?>/js/consumption-preferences-unlikely-sort.js"></script>
          <div class="_demo--bg-container">
            <div class="_demo--container">
              <div class="_content">
                <h3 class="base--h3 output--header">Output</h3>
                <div class="loading" style="display: block;">
                  <div class="loading--icon">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/loading-indicator.gif" width="100%" alt="">
                  </div>
                </div>
                <div class="error_msg">
                  <?php echo $error_msg; ?>
                </div>
                <div class="error">
                  <p class="error--message">
                    Sorry, your language is either unsupported or we did not find sufficient words in your input to analyze.
                  </p>
                </div>
                <div id="dvContainer" class="output">
                  <h2 class="base--h2">Personality Portrait</h2>
                  <h4 class="base--h4 output--word-count-header"><span class="output--word-count-number">0</span> words analyzed:
                    <div class="output--word-count-message techno_remove output--word-count-message_VERY-STRONG">Very Strong Analysis
                      <div class="output--word-count-tooltip_VERY-STRONG tooltip">A word count of 6000 or more is a high-quality assessment of someone's personality. It's statistically significant.</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_STRONG">Strong Analysis
                      <div class="output--word-count-tooltip_STRONG tooltip">This is a confident read of someone's personality. It's statistically significant! ...but wait, there's more! For only 6000 words, you'll get something so accurate it's scary. Do it!</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_DECENT">Decent Analysis
                      <div class="output--word-count-tooltip_DECENT tooltip">These results are a general impression of this person, and they should be taken with a grain of salt. Increase the word count to 3500 to get a strong one.</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_WEAK">Weak Analysis
                      <div class="output--word-count-tooltip_WEAK tooltip">With this many words, you can't get a fair read on someone's personality. Can you use at least 1500 to get a general impression?</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_VERY-STRONG_NEW_MODEL">Very Strong Analysis
                      <div class="output--word-count-tooltip_VERY-STRONG tooltip">With 3000 words or more, you get a high-quality personality assessment. This is the most accurate our text-based analysis can be.</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_STRONG_NEW_MODEL">Strong Analysis
                      <div class="output--word-count-tooltip_STRONG tooltip">You are using the recommended number of words. The service is almost performing at its best. Use 3000 words or more to be a bit more accurate.</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_DECENT_NEW_MODEL">Decent Analysis
                      <div class="output--word-count-tooltip_DECENT_NEW_MODEL tooltip">These results are a general impression of this person. Increase the word count to 1200 to get a stronger analysis.</div>
                    </div>
                    <div class="output--word-count-message techno_remove output--word-count-message_WEAK_NEW_MODEL">Weak Analysis
                      <div class="output--word-count-tooltip_WEAK tooltip">With this many words, you can't get a fair read on someone's personality. Use atleast 600 words to get a general impression.</div>
                    </div>
                  </h4>
                  <div class="output-summary">
                    <div class="output-summary--left">
                      <h4 class="base--h4">Summary</h4>
                      <div id="personalitySummary" class="output-summary--summary">
                        <p class="base--p">
                          Analyze your profile to get your personality summary.
                        </p>
                      </div>
                    </div>
                    <div class="output-summary--right">
                      <div class="output-summary--consumption-behaviors--section">
                        <h4 class="base--h4">You are likely to______ </h4>
                        <div class="output-summary--likely-behaviors">
                        </div>
                        <h4 class="base--h4">You are unlikely to______ </h4>
                        <div class="output-summary--unlikely-behaviors">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="output--stats-row">
                    <div class="output-big-5 output-stats-column">
                      <h4 class="base--h4">Personality</h4>
                      <div class="output-stats-column--percentile-label">*% =
                        percentile
                      </div>
                      <div class="output-big-5--traits output-stats-column--traits"></div>
                    </div>
                    <div class="output-needs output-stats-column">
                      <h4 class="base--h4">Consumer Needs</h4>
                      <div class="output-stats-column--percentile-label">*% =
                        percentile
                      </div>
                      <div class="output-needs--traits output-stats-column--traits"></div>
                      <div class="output-needs--more-traits"></div>
                      <a class="output-needs--toggle output-stats-column--toggle base--a" href="javascript:void(0);">&gt;&gt;</a>
                    </div>
                    <div class="output-values output-stats-column">
                      <h4 class="base--h4">Values</h4>
                      <div class="output-stats-column--percentile-label">*% =
                        percentile
                      </div>
                      <div class="output-values--traits output-stats-column--traits"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <script type="text/html" id="big5PercentTemplate">
            <% _.each(items, function(item, key, list) { %>
              <% if (typeof list[key - 1] != 'undefined' && (list[key - 1].score >= 50 && item.score < 50)) { %>
                <hr class="base--hr output-stats-column--hr">
                <% } %>
                  <div class="percent-bar-and-score">
                    <div class="percent-bar-and-score--label output-big-5--trait-label <%= (item.score >= 50) ? 'output-big-5--trait-label_POSITIVE' : 'output-big-5--trait-label_NEGATIVE' %>">
                      <%= item.name %>
                        <i class="icon icon-down-arrow percent-bar-and-score--toggle-icon"></i>
                        <div class="tooltip">
                          <%= tooltips(item.id) || 'Tooltip not available' %>
                        </div>
                    </div>
                    <div class="percent-bar percent-bar-and-score--percent-bar">
                      <div class="percent-bar--meter" style="-webkit-transform: translate(<%= item.score %>%); transform: translate(<%= item.score %>%)">
                        <div class="percent-bar--ball <%= (item.score >= 50) ? 'percent-bar--ball_POSITIVE-FILL' : 'percent-bar--ball_NEGATIVE-FILL' %>"></div>
                        <div class="percent-bar-and-score--number">
                          <%= item.score %>%</div>
                      </div>
                    </div>
                  </div>
                  <div class="output-big-5--sub-tree">
                    <% _.each(item.children, function(item2, key, list) { %>
                      <div class="percent-bar-and-score">
                        <div class="percent-bar-and-score--label output-big-5--sub-trait-label <%= (item2.score >= 50) ? 'output-big-5--sub-trait-label_POSITIVE' : 'output-big-5--sub-trait-label_NEGATIVE' %>">
                          <%= item2.name %>
                            <div class="tooltip">
                              <%= tooltips(item2.id) || 'Tooltip not available' %>
                            </div>
                        </div>
                        <div class="percent-bar percent-bar-and-score--percent-bar">
                          <div class="percent-bar--meter" style="-webkit-transform: translate(<%= item.score %>%); transform: translate(<%= item2.score %>%)">
                            <div class="percent-bar--ball <%= (item2.score >= 50) ? 'percent-bar--ball_POSITIVE-FILL' : 'percent-bar--ball_NEGATIVE-FILL' %>"></div>
                            <div class="percent-bar-and-score--number">
                              <%= item2.score %>%</div>
                          </div>
                        </div>
                      </div>
                      <% }); %>
                  </div>
                  <% });%>
          </script>
          <script type="text/html" id="outputStatsPercentTemplate">
            <% _.each(items, function(item, key, list) { %>
              <% if (typeof list[key - 1] != 'undefined' && (list[key - 1].score >= 50 && item.score < 50)) { %>
                <hr class="base--hr output-stats-column--hr">
                <% } %>
                  <div class="percent-bar-and-score">
                    <div class="percent-bar-and-score--label <%= (item.score >= 50) ? 'percent-bar-and-score--label_POSITIVE' : 'percent-bar-and-score--label_NEGATIVE' %>">
                      <%= item.name %>
                        <div class="tooltip">
                          <%= tooltips(item.id) || 'Tooltip not available' %>
                        </div>
                    </div>
                    <div class="percent-bar percent-bar-and-score--percent-bar">
                      <div class="percent-bar--meter" style="-webkit-transform: translate(<%= item.score %>%); transform: translate(<%= item.score %>%)">
                        <div class="percent-bar--ball <%= (item.score >= 50) ? 'percent-bar--ball_POSITIVE-FILL' : 'percent-bar--ball_NEGATIVE-FILL' %>"></div>
                        <div class="percent-bar-and-score--number">
                          <%= item.score %>%</div>
                      </div>
                    </div>
                  </div>
                  <% });%>
          </script>
          <script type="text/html" id="outputBehaviorsTemplate">
            <% _.each(items, function(item, key, list) { %>
              <div class="output-summary--behavior <%= item.score > 0.5 ? 'output-summary--behavior_POSITIVE' : 'output-summary--behavior_NEGATIVE' %>">
                <i class="icon <%= item.score > 0.5 ? 'icon-likely' : 'icon-not-likely' %>"></i>
                <%= item.verb %>
                  <div class="tooltip">
                    <%= item.description %>
                      <div class="tooltip--hover-fix"></div>
                  </div>
              </div>
            <% }); %>
          </script>
          <div class="download_btn_area">            
            <form method="GET" style="float: left;">                
              <input type="hidden" id="section_left_html" name="left_html">
              <input type="hidden" id="section_right_html" name="right_html">
              <input type="hidden" name="pdf_download" value="1">
              <input type="hidden" name="report_stamp" value="<?php echo $time_store; ?>">                
              <input type="hidden" name="name_report" value="report-<?php echo $_POST['name_of_report']; ?>">
              <input type="submit" value="Download PDF" id="btnPrint"/>
            </form>
            <a class="csv_export_btn" target="_blank" href="<?php echo get_site_url().'/'.$csvFileName; ?>">Download CSV</a>         
          </div>
    <div id="editor"></div>     
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script type="text/javascript">       
      $("#btnPrint").live("click", function () 
      {     
        jQuery('#section_left_html').val(jQuery('.output-summary--left').html());   
        jQuery('#section_right_html').val(jQuery('.output-summary--right').html());                    
      });
    </script>
        <script type="text/javascript">
          (function() {
            $('.tab-panels--tab').click(function(e){
              e.cancelBubble = true;
              e.preventDefault();
              if (e.stopPropagation)
                e.stopPropagation();

              var self = $(this);
              var inputGroup = self.closest('.tab-panels');
              var idName = null;

              inputGroup.find('.active').removeClass('active');
              self.addClass('active');
              idName = self.attr('href');
              $(idName).addClass('active');
            });
          })();
        </script><?php
      }?>
      <script type="text/javascript">
        (function() {
          $('#techno_analyze_btn').click(function(e)
          {
            <?php
            if (!is_user_logged_in())
            {
              echo 'alert("You Must First Login To Analyze Your Text...!!");return false;';    
            }
            elseif(is_user_logged_in() && in_array( 'staff', (array) $user->roles) || in_array( 'administrator', (array) $user->roles)){
              echo 'return true;';              
            }
            elseif(is_user_logged_in() && get_the_author_meta('user_point_pi', $user->ID ) > 0){
              echo 'return true;'; 
            }
            else
            {
              echo '$("#buy_credit_tc").simplePopup(); return false;';

              // echo 'alert("You Must First Buy Credit To Analyze Your Text...!!");
              // window.location.href = "'.get_site_url().'/billing/";
              // return false;';              
            }?>
          });
        })();
        </script><?php
  get_footer();
}
if(isset($_GET['pdf_download']) && isset($_GET['report_stamp']) && $user->ID!=0)
  {
    $user_analyze_report=json_decode(get_the_author_meta('user_analyze_report', $user->ID ));
    foreach ($user_analyze_report as $key => $value) 
    {
      if($value->time == $_GET['report_stamp']){
        $result = $value->report;
        $date = $value->time;
        $text = $value->text;
        $csvFileName = $value->report_csv;
      }
    }    
    $user_text = stripslashes(unserialize(base64_decode($text)));
    if($result->word_count >= 3000) 
    {
      $analysis_status='Strong Analysis';
    }
    elseif($result->word_count < 3000 && $result->word_count >= 1200)
    {
      $analysis_status='Decent Analysis';
    }
    elseif($result->word_count < 1200 && $result->word_count >= 600)
    {
      $analysis_status='Very Strong Analysis';
    }
    else{
      $analysis_status='Weak Analysis';
    }    
    $replacement = array(
        'Extraversion' => 'Introversion/Extraversion',
        'Outgoing' => 'Warmth',
        'Uncompromising' => 'Straightforwardness',
        'Immoderation' => 'Impulsiveness',
        'Susceptible to stress' => 'Sensitivity to stress',
        'Conservation' => 'Tradition',
        'Openness to change' => 'Stimulation',
        'Hedonism' => 'Taking pleasure in life',
        'Self-enhancement' => 'Achievement',
        'Self-transcendence' => 'Helping others'
      );    
    function get_personality_head_tc($array_head,$replacement)
    {
      $head_percentile = get_percentile_rount($array_head->percentile);
      $head_name = $array_head->name;
      return '<tr>
        <td>
            <div class="percent-bar-and-score--label output-big-5--trait-label output-big-5--trait-label_NEGATIVE">'.(isset($replacement[$head_name]) ? $replacement[$head_name] : $head_name).'
                <i class="icon icon-down-arrow percent-bar-and-score--toggle-icon"></i>
            </div>
            <div class="percent-bar percent-bar-and-score--percent-bar">
              <div class="percent-bar--meter" style="-webkit-transform: translate('.$head_percentile.'%); transform: translate('.$head_percentile.'%)">
                <div class="percent-bar--ball '.($head_percentile > 50 ? 'percent-bar--ball_POSITIVE-FILL' : 'percent-bar--ball_NEGATIVE-FILL').'"></div>
                <div class="percent-bar-and-score--number">'.$head_percentile.'%</div>
              </div>
            </div>
        </td>
      </tr>';
    }
    function get_personality_sub_tc($array_sub,$replacement)
    {
      $openness_sub='';
      foreach ($array_sub as $key_openness => $value_openness) 
      {
        $percentile_openness = get_percentile_rount($value_openness->percentile);
        $openness_sub.='
        <tr>
          <td class="sub">
              <div class="percent-bar-and-score--label output-big-5--trait-label output-big-5--trait-label_NEGATIVE">'.(isset($replacement[$value_openness->name]) ? $replacement[$value_openness->name] : $value_openness->name).'
                <i class="icon icon-down-arrow percent-bar-and-score--toggle-icon"></i>
              </div>
              <div class="percent-bar percent-bar-and-score--percent-bar">
                <div class="percent-bar--meter" style="-webkit-transform: translate('.$percentile_openness.'%); transform: translate('.$percentile_openness.'%)">
                  <div class="percent-bar--ball '.($percentile_openness > 50 ? 'percent-bar--ball_POSITIVE-FILL' : 'percent-bar--ball_NEGATIVE-FILL').' "></div>
                  <div class="percent-bar-and-score--number">'.$percentile_openness.'%</div>
                </div>
              </div>
          </td>
        </tr>';
      }
      return $openness_sub;
    }       
    function needs_and_value_html($result_arr,$replacement)
    {
      $consumer_values='';
      foreach ($result_arr as $key_values => $value_values) 
      {
        $percentile_values= get_percentile_rount($value_values->percentile);
        $consumer_values.='
        <tr>
          <td>
              <div class="percent-bar-and-score--label output-big-5--trait-label output-big-5--trait-label_NEGATIVE">'.(isset($replacement[$value_values->name]) ? $replacement[$value_values->name] : $value_values->name).'
                <i class="icon icon-down-arrow percent-bar-and-score--toggle-icon"></i>
              </div>
              <div class="percent-bar percent-bar-and-score--percent-bar">
                <div class="percent-bar--meter" style="-webkit-transform: translate('.$percentile_values.'%); transform: translate('.$percentile_values.'%)">
                  <div class="percent-bar--ball '.($percentile_values > 50 ? 'percent-bar--ball_POSITIVE-FILL' : 'percent-bar--ball_NEGATIVE-FILL').' "></div>
                  <div class="percent-bar-and-score--number">'.$percentile_values.'%</div>
                </div>
              </div>
          </td>
        </tr>';
      }
      return $consumer_values;
    }
    $html_content='<div id="dvContainer">
      <style type="text/css">
        .output-summary--behavior_POSITIVE .icon{background-color:#00b4a0}.output-summary--behavior_NEGATIVE .icon{background-color:#5596e6}.output-summary--behavior .icon{width:12.5px;height:12.5px;vertical-align:middle;display:inline-block;margin-right:5px}
        table{font-family:arial,sans-serif;border-collapse:collapse;width:100%}.percent-bar-table{border:2px solid #ececec}.percent-bar-table td{padding:20px}.percent-bar-table td.sub{padding-left:40px}td,th{text-align:left;padding:8px;vertical-align:top}p{text-align:left}.percent-bar--ball_NEGATIVE-FILL{background-color:#5596e6;height:.7rem;width:.6rem;top:-.3rem;left:-.3rem;border-radius:100px}.percent-bar--ball_POSITIVE-FILL{background-color:#00b4a0;height:.7rem;width:.6rem;top:-.3rem;left:-.3rem;border-radius:100px}.percent-bar--ball{height:.7rem;width:.6rem;border-radius:100px;position:absolute;top:-.3rem;left:-.3rem;-webkit-transition:.2s;transition:.2s}.percent-bar-and-score--percent-bar{width:100%;margin-top:2rem;display:inline-block;vertical-align:middle}.percent-bar{background-color:#ececec;height:0;width:100%;border-bottom:1px solid #323232;position:relative}.percent-bar-and-score--number{position:absolute;width:3rem;margin-top:0;left:-1.2rem;top:-2rem;display:inline-block;vertical-align:middle;text-align:center;font-size:.8em;font-weight:400;color:#4178be}.tooltip{display:none}
      </style>
      <table width="700px">
        <tbody> 
        <tr> 
          <td colspan="3">
              <table width="100%">
                  <tbody>
                      <tr>
                          <td colspan="2">
                              <h3 class="base--h3 output--header">Your Text</h3>
                              <p>'.$user_text.'</p>
                          </td>
                      </tr> 
                      <tr> 
                          <td colspan="2">
                              <h2 class="base--h2" style="color:#e71d32;padding:0px;">Personality Portrait</h2>
                              <H5>'.$result->word_count.' words analyzed: <span style="color:#e71d32;padding:0px;">'.$analysis_status.'</span></H5>
                          </td>
                      </tr> 
                      <tr> 
                          <td>
                              '.stripslashes($_GET['left_html']).'
                          </td>
                          <td>
                              '.stripslashes($_GET['right_html']).'
                          </td>
                      </tr> 
                  </tbody>
              </table>
          </td>
      </tr>
      <tr> 
          <td style="width: 33.33%;">
            <table class="percent-bar-table">
              <tbody>
                <tr>
                  <td>
                      <div class="output-stats-column--percentile-label" style="text-align:right;">*% = percentile</div>
                      <h4 class="base--h4">Personality</h4>
                  </td>
                </tr>
                '.get_personality_head_tc($result->personality[0],$replacement).'
                '.get_personality_sub_tc($result->personality[0]->children,$replacement).'
                '.get_personality_head_tc($result->personality[2],$replacement).'                
                '.get_personality_sub_tc($result->personality[2]->children,$replacement).'
              </tbody>
            </table>
          </td>
          <td style="width: 33.33%;">
            <table class="percent-bar-table">
              <tbody>
                <tr>
                  <td>                    
                     <div class="output-stats-column--percentile-label" style="text-align:right;">*% = percentile</div>
                      <h4 class="base--h4">Consumer Needs</h4>
                  </td>
                </tr>
                '.needs_and_value_html($result->needs,$replacement).'
              </tbody>
            </table>
          </td>

          <td style="width: 33.33%;">
            <table class="percent-bar-table">
              <tbody>
                <tr>
                  <td>
                      <div class="output-stats-column--percentile-label" style="text-align:right;">*% = percentile</div>
                      <h4 class="base--h4">Values</h4>
                  </td>
                </tr>
                '.needs_and_value_html($result->values,$replacement).'
              </tbody>
            </table>
          </td>
      </tr> 
      <tr> 
          <td style="width: 33.33%;">
            <table class="percent-bar-table">
              <tbody>
                '.get_personality_head_tc($result->personality[3],$replacement).'                
                '.get_personality_sub_tc($result->personality[3]->children,$replacement).'
                '.get_personality_head_tc($result->personality[1],$replacement).'                
                '.get_personality_sub_tc($result->personality[1]->children,$replacement).'
              </tbody>
            </table>
          </td>
          <td style="width: 33.33%;">
            
          </td>
          <td style="width: 33.33%;">
            
          </td>
      </tr> 
      <tr> 
          <td style="width: 33.33%;">
            <table class="percent-bar-table">
              <tbody>
                '.get_personality_head_tc($result->personality[4],$replacement).'                
                '.get_personality_sub_tc($result->personality[4]->children,$replacement).'
              </tbody>
            </table>
          </td>

          <td style="width: 33.33%;">
          </td>

          <td style="width: 33.33%;">
          </td>
      </tr>
        </tbody> 
      </table>
  </div>'; 
    // echo $html_content;     
    require_once 'dompdf/autoload.inc.php';
    $dompdf = new DOMPDF();  
    $dompdf->loadHtml($html_content);
    $dompdf->setPaper('A3', 'portrait');
    $dompdf->render();
    $dompdf->stream($_GET['name_report'].".pdf");
  }
?>