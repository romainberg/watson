<?php 
  // Template Name: analyze-report
  use Dompdf\Dompdf;
  ob_start();  
  $user = wp_get_current_user();
  if(isset($_GET['report_stamp']) && $user->ID!=0 && !isset($_GET['pdf_download']))
  {
    $i=0;
    $user_analyze_report=json_decode(get_the_author_meta('user_analyze_report', $user->ID ));
    foreach ($user_analyze_report as $key => $value) 
    {
      if($value->time == $_GET['report_stamp']){
        $result = $value->report;
        $date = $value->time;
        $text = $value->text;
        $name_of_report = $value->name_of_report;
        $csvFileName = $value->report_csv;
        $i++;
      }
    }        
    if($i==0){
      echo '<p class="error--message">Your Analyze report expire...!!<p>';
    }
    get_header(); 
    echo '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>';
    if(isset($result))
    {?>
      <script type="text/javascript">
        var data_res_tc = <?php echo json_encode($result); ?>;
        console.log(data_res_tc);
      </script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-url-parser/2.3.1/purl.min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/5.0.2/markdown-it.min.js"></script>
      <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.0.0/highlight.min.js"></script> -->
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
            <div class="download_btn_area">  
              <form method="GET" style="float: left;">                
                <input type="hidden" id="section_left_html" name="left_html">
                <input type="hidden" id="section_right_html" name="right_html">
                <input type="hidden" name="pdf_download" value="1">
                <input type="hidden" name="report_stamp" value="<?php echo $_GET['report_stamp']; ?>">   
                <input type="hidden" name="name_report" value="report-<?php echo $name_of_report; ?>">
                <input type="submit" value="Download PDF" id="btnPrint"/>
              </form>          
              <a class="csv_export_btn" target="_blank" href="<?php echo get_site_url().'/'.$csvFileName; ?>">Download CSV</a>         
            </div>
            <div class="loading" style="display: block;">
              <div class="loading--icon">
                <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/loading-indicator.gif" width="100%" alt="">
              </div>
            </div>
            <div id="dvContainer" class="_content">
              <h3 class="base--h3 output--header">Your Text</h3>
              <p><?php echo stripslashes(unserialize(base64_decode($text))); ?></p>
              <div class="output">
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
      <div id="editor"></div>     
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
      <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
      <script type="text/javascript">       
        var doc = new jsPDF();
        var specialElementHandlers = { '#editor': function (element, renderer) { return true; } };
        $("#btnPrint").live("click", function () 
        {     
          jQuery('#section_left_html').val(jQuery('.output-summary--left').html());   
          jQuery('#section_right_html').val(jQuery('.output-summary--right').html());          
          // jQuery('.percent-bar-and-score').toggleClass('toggled');
          // jQuery('.output-needs--more-traits').show();
          // var divContents = $("#dvContainer").html();
          // var printWindow = window.open('', '', 'height=400,width=800');
          // printWindow.document.write('<html><head><title>Report</title>');
          // printWindow.document.write('</head><body><link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri(); ?>/css/style.css">');
          // printWindow.document.write(divContents);
          // printWindow.document.write('</body></html>');
          // console.log(printWindow.document.body);

          // // printWindow.print();   
          // setTimeout(function(e){
          //   doc.fromHTML(printWindow.document.body, 10, 10, { 'width': 150,'elementHandlers': specialElementHandlers });
          //   doc.save('report-<?php echo $date; ?>.pdf');
          //   printWindow.close();
          // },1500);                 
        });
      </script><?php
    }
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