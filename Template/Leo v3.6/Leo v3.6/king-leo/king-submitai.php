<?php
/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

More about this license: LICENCE.html
 */

if (!defined('QA_VERSION')) {
	// don't allow this page to be requested directly from browser
	header('Location: ../');
	exit;
}

require_once QA_INCLUDE_DIR.'king-app/format.php';
require_once QA_INCLUDE_DIR.'king-app/limits.php';
require_once QA_INCLUDE_DIR.'king-db/selects.php';
require_once QA_INCLUDE_DIR.'king-util/sort.php';
require_once QA_INCLUDE_DIR.'king-db/metas.php';

//    Check whether this is a follow-on question and get some info we need from the database

$in = array();

$followpostid     = qa_get('follow');
$in['categoryid'] = qa_clicked('doask') ? qa_get_category_field_value('category') : qa_get('cat');
$userid           = qa_get_logged_in_userid();


list($categories, $followanswer, $completetags) = qa_db_select_with_pending(
	qa_db_category_nav_selectspec($in['categoryid'], true),
	isset($followpostid) ? qa_db_full_post_selectspec($userid, $followpostid) : null,
	qa_db_popular_tags_selectspec(0, QA_DB_RETRIEVE_COMPLETE_TAGS)
);

if (!isset($categories[$in['categoryid']])) {
	$in['categoryid'] = null;
}

if (@$followanswer['basetype'] != 'A') {
	$followanswer = null;
}

//    Check for permission error

$permiterror = qa_user_maximum_permit_error('permit_post_q', QA_LIMIT_QUESTIONS);

if ($permiterror) {
	$qa_content = qa_content_prepare();

	// The 'approve', 'login', 'confirm', 'limit', 'userblock', 'ipblock' permission errors are reported to the user here
	// The other option ('level') prevents the menu option being shown, in qa_content_prepare(...)

	switch ($permiterror) {
		case 'login':
		$qa_content['error']=qa_lang_html('users/no_permission');
		$econtent = qa_insert_login_links(qa_lang_html('question/ask_must_login'), qa_request(), isset($followpostid) ? array('follow' => $followpostid) : null);
		break;

		case 'confirm':
		$qa_content['error']=qa_lang_html('users/no_permission');
		$econtent = qa_insert_login_links(qa_lang_html('question/ask_must_confirm'), qa_request(), isset($followpostid) ? array('follow' => $followpostid) : null);
		break;

		case 'limit':
		$qa_content['error']=qa_lang_html('users/no_permission');
		$econtent=qa_lang_html('question/ask_limit');
		break;

		case 'membership':
		$qa_content['error']=qa_lang_html('users/no_permission');
		$econtent=qa_insert_login_links(qa_lang_html('misc/mem_message'));
		$qa_content['custom'] = '<div class="nopost"><i class="fa-solid fa-fingerprint fa-4x"></i><p>'.$econtent.'</p><a href="'. qa_path_html( 'membership' ) .'" class="meme-button">'.qa_lang_html('misc/see_plans').'</a></div>';
		break;

		case 'approve':
		$qa_content['error']=qa_lang_html('users/no_permission');
		$econtent=qa_lang_html('question/ask_must_be_approved');
		break;

		default:
		$econtent=qa_lang_html('users/no_permission');
		$qa_content['error']=qa_lang_html('users/no_permission');
		break;
	}

	if (empty($qa_content['custom'] )) {
		$qa_content['custom'] = '<div class="nopost"><i class="fa-solid fa-circle-user fa-4x"></i>'.$econtent.'</div>';
	}
	return $qa_content;
}


$captchareason = qa_user_captcha_reason();

$in['title'] = qa_get_post_title('title'); // allow title and tags to be posted by an external form


if (qa_using_tags()) {
	$in['tags'] = qa_get_tags_field_value('tags');
}

if (qa_clicked('doask')) {
	require_once QA_INCLUDE_DIR . 'king-app/post-create.php';
	require_once QA_INCLUDE_DIR . 'king-util/string.php';

	$categoryids = array_keys(qa_category_path($categories, @$in['categoryid']));
	$userlevel   = qa_user_level_for_categories($categoryids);

	$in['name']   = qa_post_text('name');
	$in['notify'] = strlen((string)qa_post_text('notify')) > 0;
	$in['nsfw']   = qa_post_text('nsfw');
	$in['prvt']   = qa_post_text('prvt');
	$in['email']  = qa_post_text('email');
	$in['queued'] = qa_user_moderation_reason($userlevel) !== false;
	$in['pcontent'] = htmlspecialchars(qa_post_text('pcontent'), ENT_QUOTES | ENT_HTML5, 'UTF-8');
	$in['thumb'] = qa_post_text('thumb');
	$in['stle'] = qa_post_text('stle');
	$in['npromp'] = htmlspecialchars(qa_post_text('npromp'), ENT_QUOTES | ENT_HTML5, 'UTF-8');
	qa_get_post_content('editor', 'content', $in['editor'], $in['content'], $in['format'], $in['text']);

	$errors             = array();
	$in['submit_image'] = qa_post_array('submit_image');
	$in['extra'] = serialize($in['submit_image']);

	if (!qa_check_form_security_code('ask', qa_post_text('code'))) {
		$errors['page'] = qa_lang_html('misc/form_security_again');
	} else {
		$filtermodules = qa_load_modules_with('filter', 'filter_question');
		foreach ($filtermodules as $filtermodule) {
			$oldin = $in;
			$filtermodule->filter_question($in, $errors, null);
			qa_update_post_text($in, $oldin);
		}

		if (qa_using_categories() && count($categories) && (!qa_opt('allow_no_category')) && !isset($in['categoryid'])) {
			$errors['categoryid'] = qa_lang_html('question/category_required');
		}
		// check this here because we need to know count($categories)
		elseif (qa_user_permit_error('permit_post_q', null, $userlevel)) {
			$errors['categoryid'] = qa_lang_html('question/category_ask_not_allowed');
		}

		if ($captchareason) {
			require_once QA_INCLUDE_DIR . 'king-app/captcha.php';
			qa_captcha_validate_post($errors);
		}

		if (empty($errors)) {
			$cookieid = isset($userid) ? qa_cookie_get() : qa_cookie_get_create(); // create a new cookie if necessary

			$in['wai'] = qa_post_text('wai');

			$questionid = qa_question_create($followanswer, $userid, qa_get_logged_in_handle(), $cookieid,
				$in['title'], $in['thumb'], $in['format'], $in['text'], isset($in['tags']) ? qa_tags_to_tagstring($in['tags']) : '',
				$in['notify'], $in['email'], $in['categoryid'], $in['extra'], $in['queued'], $in['name'], 'I', $in['pcontent'], $in['nsfw']);
			if ($in['wai']) {
				qa_db_postmeta_set( $questionid, 'wai', $in['wai'] );
			}
			if ($in['npromp']) {
				qa_db_postmeta_set( $questionid, 'nprompt', $in['npromp'] );
			}
			
			if ($in['stle']) {
				qa_db_postmeta_set( $questionid, 'stle', $in['stle'] );
			}
			if ( isset($in['prvt']) ) {
				require_once QA_INCLUDE_DIR.'king-app/posts.php';
				qa_post_set_hidden( $questionid, true, null );
			}
			
			
			qa_redirect(qa_q_request($questionid, $in['title'])); // our work is done here
		}
	}
}
	if (qa_is_logged_in() && ( qa_opt('ailimits') || qa_opt('ulimits') ) && qa_get_logged_in_level() <= QA_USER_LEVEL_ADMIN) {
		$qa_content = qa_content_prepare();
		$mp  = qa_db_usermeta_get( $userid, 'membership_plan' );
		$pl = null;
		if ($mp) {
			$pl = (INT)qa_opt('plan_'.$mp.'_lmt');
		} elseif(qa_opt('ulimits')) {
			$pl = (INT)qa_opt('ulimit');
		}
		$alm = (INT)qa_db_usermeta_get( $userid, 'ailmt' );
		if ($alm >= $pl) {
			$qa_content['custom'] = '<div class="nopost"><i class="fa-solid fa-circle-user fa-4x"></i>'.qa_lang('kingai_lang/nocredits').'<p><a href="'.qa_path_html('membership').'">'.qa_lang('kingai_lang/buycredits').'</a></p></div>';
			return $qa_content;
		}
	}
//    Prepare content for theme

$qa_content = qa_content_prepare(false, array_keys(qa_category_path($categories, @$in['categoryid'])));

$qa_content['title'] = qa_lang_html(isset($followanswer) ? 'question/ask_follow_title' : 'main/home_image');
$qa_content['error'] = @$errors['page'];


$field['label'] = qa_lang_html('question/q_content_label');
$field['error'] = qa_html(@$errors['content']);

$custom = qa_opt('show_custom_ask') ? trim(qa_opt('custom_ask')) : '';


$context = '';
$hsd = '';
$context .= '<div class="kingai-ext">';

    $context .= '<select id="ai-select">';
    if (qa_opt('enable_sd')) {
    	$context .= '<option value="sd">Stable Diffusion</option>';
    	$hsd = 'sd';
	}
    if (qa_opt('enable_sdn')) {
    	$context .= '<option value="sdn">'.qa_lang_html('kingai_lang/sdn').'</option>';
    	$hsd = 'sd';
    }	
    if (qa_opt('enable_pro')) {
    	$context .= '<option value="proteus">Proteus</option>';
    	$hsd = 'sd';
    }	
    if (qa_opt('enable_realxl')) {
    	$context .= '<option value="realxl">Realistic Vision</option>';
    	$hsd = 'sd';
    }
    if (qa_opt('enable_odalle')) {
    	$context .= '<option value="odalle">Open Dall-e </option>';
    	$hsd = 'sd';
    }
    if (qa_opt('enable_pix')) {
    	$context .= '<option value="pix">PixArt</option>';
    	$hsd = 'sd';
    }
    if (qa_opt('enable_dreams')) {
    	$context .= '<option value="dreams">DreamShaper</option>';
    	$hsd = 'sd';
    }
	
    if (qa_opt('enable_playg')) {
    	$context .= '<option value="playg">Playground</option>';
    	$hsd = 'sd';
    }
    if (qa_opt('enable_dalle')) {
    	$context .= '<option value="de">Dall-e</option>';
    	if ($hsd === '') {
    		$hsd = 'de';
    	}
    }
    if (qa_opt('enable_de3')) {
    	$context .= '<option value="de3">Dall-e 3</option>';
    	if ($hsd === '') {
    		$hsd = 'de3';
    	}
    }
    $context .= '</select>';
    

$context .= '<div class="'.$hsd.'" id="desizes">';
$context .= '<ul class="nav nav-tabs" id="ssize">
	<li class="active"><a href="#aisizes" data-toggle="tab" aria-expanded="true">'.qa_lang('kingai_lang/aisizes').'</a></li>
	<li class="sdsize"><a href="#aistyles" data-toggle="tab" aria-expanded="false">'.qa_lang('kingai_lang/ai_filter').'</a></li>';
	if (qa_opt('enprompt')) {
		$context .= '<li class="sdsize"><a href="#nprompt" data-toggle="tab" aria-expanded="false">'.qa_lang('kingai_lang/ai_nprompt').'</a></li>';
	}
$context .= '</ul>';
$context .= '<div id="aisizes" role="tabpanel" class="tabcontent aistyles active">
<input type="radio" id="aisize9" name="aisize" value="1344x768" class="hide">
<label for="aisize9" class="ailabel sdsize" title="1344x768" data-toggle="tooltip">'.qa_lang('kingai_lang/widescreen').' (16:9)</label>
<input type="radio" id="aisize4" name="aisize" value="1152x896" class="hide">
<label for="aisize4" class="ailabel sdsize" title="1152x896" data-toggle="tooltip">'.qa_lang('kingai_lang/landscape').' (5:4)</label>


<input type="radio" id="aisize10" name="aisize" value="1792x1024" class="hide">
<label for="aisize10" class="ailabel desize3" title="1792x1024" data-toggle="tooltip">'.qa_lang('kingai_lang/widescreen').' (7:4)</label>
<input type="radio" id="aisize1" name="aisize" value="512x512" class="hide">
<label for="aisize1" class="ailabel desize" title="512x512" data-toggle="tooltip">'.qa_lang('kingai_lang/square').' (1:1)</label>
<input type="radio" id="aisize3" name="aisize" value="1024x1024" class="hide" checked>
<label for="aisize3" class="ailabel" title="1024x1024" data-toggle="tooltip">'.qa_lang('kingai_lang/square').' (1:1)</label>
<input type="radio" id="aisize11" name="aisize" value="1024x1792" class="hide">
<label for="aisize11" class="ailabel desize3" title="1024x1792" data-toggle="tooltip">'.qa_lang('kingai_lang/vertical').' (4:7)</label>
';
 
$context .= '<input type="radio" id="aisize8" name="aisize" value="896x1152" class="hide">
<label for="aisize8" class="ailabel sdsize" title="896x1152" data-toggle="tooltip">'.qa_lang('kingai_lang/portrait').' (4:5)</label>
<input type="radio" id="aisize5" name="aisize" value="832x1216" class="hide">
<label for="aisize5" class="ailabel sdsize" title="832x1216" data-toggle="tooltip">'.qa_lang('kingai_lang/vertical').' (2:3)</label>
<input type="radio" id="aisize7" name="aisize" value="768x1344" class="hide">
<label for="aisize7" class="ailabel sdsize" title="768x1344" data-toggle="tooltip">'.qa_lang('kingai_lang/long').' (9:16)</label>
</div>';



if (qa_opt('enprompt')) {
	$context .= '<div id="nprompt" role="tabpanel" class="tabcontent aistyles">';
	$context .= '<textarea name="nprompt" id="n_prompt" rows="2" cols="40" class="king-form-tall-text" placeholder="'.qa_lang('kingai_lang/ai_nprompt').'"></textarea>';
	$context .= '</div>';
}

$context .= '<div id="aistyles" role="tabpanel" class="tabcontent aistyles">';
$styles = array(
	'none',
	'3d-model',
	'analog-film',
	'anime',
    'cinematic',
    'comic-book',
    'digital-art',
    'fantasy-art',
    'isometric',
    'line-art',
    'low-poly',
    'neon-punk',
    'origami',
    'photographic',
    'pixel-art',
);

foreach ($styles as $style) {
    $context .= '<input type="radio" id="aistyle_' . $style . '" name="aistyle" value="' . $style . '" class="hide">';
    $context .= '<label for="aistyle_' . $style . '" class="slabel"><img src="'.$this->urltoroot.'aiimgs/' . $style . '.jpg" width="80" height="80"/><span>' . $style . '</span></label>';
}
$context .= '</div>';
$context .= '</div>';
$context .= '</div>';
$context .= '<div id="ai-results"></div>';


if (qa_is_logged_in()) {

$cont = '<div class="kingai-input">
		<textarea type="textarea" id="ai-box" class="aiinput" placeholder="'.qa_lang('kingai_lang/aiplace').'" maxlength="600" autocomplete="off" style="height: 44px;" rows="1"></textarea>';
$cont .= '<div class="kingai-buttons">';
if (qa_opt('eprompter')) {
    $showElement = qa_opt('oaprompter') ? (qa_get_logged_in_level() >= QA_USER_LEVEL_ADMIN) : true;
    
    if ($showElement) {
        $cont .= '<div type="button" id="prompter" class="ai-create promter" data-toggle="tooltip" title="' . qa_lang('kingai_lang/prompter') . '" data-placement="left"><i class="fa-solid fa-feather"></i><div class="loader"></div></div>';
    }
}

$cont .= '<button type="button" id="ai-submit" class="ai-submit"><span><i class="fa-solid fa-paper-plane"></i> '.qa_lang('kingai_lang/generate').'</span><div class="loader"></div></button>
		</div>
	</div>';

$cont .= $context;

$qa_content['custom'] = $cont;	
$qa_content['form'] = array(
	'tags'    => 'name="ask" method="post" action="' . qa_self_html() . '" id="ai-form"',

	'style'   => 'tall',

	'fields'  => array(
		'custom'    => array(
			'type' => 'custom',
			'html' => '<div class="snote">' . $custom . '</div>',
		),

		'title'     => array(
			'label' => qa_lang_html('question/q_title_label'),
			'tags'  => 'name="title" id="title" autocomplete="off" minlength="'.qa_opt('min_len_q_title').'"  required',
			'value' => qa_html(@$in['title']),
			'error' => qa_html(@$errors['title']),
		),

		'similar'   => array(
			'type' => 'custom',
			'html' => '<span id="similar"></span>',
		),
		'thumb'     => array(
			'label' => '',
			'tags'  => 'name="thumb" id="thumb_ai" class="hide"',
			'value' => qa_html(@$in['thumb']),
			'error' => qa_html(@$errors['thumb']),
		),
		'ai'     => array(
			'label' => '',
			'tags'  => 'name="wai" id="wai" class="hide"',
			'value' => qa_html(qa_opt('enable_dalle') ? 'de' : 'sd'),
			'error' => qa_html(@$errors['wai']),
		),
		'stle'     => array(
			'label' => '',
			'tags'  => 'name="stle" id="stle" class="hide"',
			'value' => qa_html(@$in['stle']),
			'error' => qa_html(@$errors['wai']),
		),
		'pcontent'  => array(
			'label' => '',
			'tags'  => 'name="pcontent" id="pcontent2" class="hide"',
			'value' => qa_html(@$in['pcontent']),
			'error' => qa_html(@$errors['pcontent']),
		),
		'npromp'  => array(
			'label' => '',
			'tags'  => 'name="npromp" id="npromp" class="hide"',
			'value' => qa_html(@$in['npromp']),
		),
	),

	'buttons' => array(
		'ask' => array(
			'tags'  => 'onclick="qa_show_waiting_after(this, false);"',
			'label' => qa_lang_html('question/ask_button'),
		),
	),

	'hidden'  => array(
		'code'   => qa_get_form_security_code('ask'),
		'doask'  => '1',
	),
);

script_options($qa_content);
if (!strlen($custom)) {
	unset($qa_content['form']['fields']['custom']);
}

if (qa_opt('do_ask_check_qs') || qa_opt('do_example_tags')) {
	$qa_content['script_rel'][] = 'king-content/king-ask.js?' . QA_VERSION;
	$qa_content['form']['fields']['title']['tags'] .= ' onchange="qa_title_change(this.value);"';

	if (strlen(@$in['title'])) {
		$qa_content['script_onloads'][] = 'qa_title_change(' . qa_js($in['title']) . ');';
		

	}

}
$qa_content['script_var']['leoai']=qa_path('submitai_ajax');

if ( qa_opt('aupload') ) {
	$qa_content['script_var']['aupload']=true;
} else {
	$qa_content['script_var']['aupload']=false;
}


if (isset($followanswer)) {
	$viewer = qa_load_viewer($followanswer['content'], $followanswer['format']);

	$field = array(
		'type'  => 'static',
		'label' => qa_lang_html('question/ask_follow_from_a'),
		'value' => $viewer->get_html($followanswer['content'], $followanswer['format'], array('blockwordspreg' => qa_get_block_words_preg())),
	);

	qa_array_insert($qa_content['form']['fields'], 'title', array('follows' => $field));
}

if (qa_using_categories() && count($categories)) {
	$field = array(
		'label' => qa_lang_html('question/q_category_label'),
		'error' => qa_html(@$errors['categoryid']),
	);

	qa_set_up_category_field($qa_content, $field, 'category', $categories, $in['categoryid'], true, qa_opt('allow_no_sub_category'));

	if (!qa_opt('allow_no_category')) // don't auto-select a category even though one is required
	{
		$field['options'][''] = '';
	}

	qa_array_insert($qa_content['form']['fields'], 'similar', array('category' => $field));
}


if (qa_using_tags()) {
	$field = array(
		'error' => qa_html(@$errors['tags']),
	);



	qa_set_up_tag_field($qa_content, $field, 'tags', isset($in['tags']) ? $in['tags'] : array(), array(),
		qa_opt('do_complete_tags') ? array_keys($completetags) : array(), qa_opt('page_size_ask_tags'));

	qa_array_insert($qa_content['form']['fields'], null, array('tags' => $field));

}


if ( qa_opt('enable_nsfw') || qa_opt('aprvt') ) {
	$nsfw = '';
	$prvt = '';
	if ( qa_opt('aprvt') ) {
		$prvt = '<input name="prvt" id="king_prvt" type="checkbox" class="hide" value="'.qa_html(@$in['prvt']).'"><label for="king_prvt" class="king-nsfw"><i class="fa-solid fa-user-ninja"></i> '.qa_lang('kingai_lang/prvt').'</label>';
	}
	if ( qa_opt('enable_nsfw') ) {
		$nsfw = '<input name="nsfw" id="king_nsfw" type="checkbox" value="'.qa_html(@$in['nsfw']).'"><label for="king_nsfw" class="king-nsfw">'.qa_lang_html('misc/nsfw').'</label>';
	}
	$field = array(
		'type' => 'custom',
		'html' => ''.$prvt.$nsfw.''
	);
	qa_array_insert($qa_content['form']['fields'], null, array('nsfw' => $field));
}

if (!isset($userid)) {
	qa_set_up_name_field($qa_content, $qa_content['form']['fields'], @$in['name']);
}


if ($captchareason) {
	require_once QA_INCLUDE_DIR . 'king-app/captcha.php';
	qa_set_up_captcha_field($qa_content, $qa_content['form']['fields'], @$errors, qa_captcha_reason_note($captchareason));
}
$qa_content['class']=' ai-create';
} else {
	$cont2 = '<div class="kingai-input">
		<input type="text" class="aiinput" placeholder="'.qa_lang('kingai_lang/aiplace').'" autocomplete="off" data-toggle="modal" data-target="#loginmodal" role="button">
		<div class="kingai-buttons" >
			<button type="button" data-toggle="modal" data-target="#loginmodal" role="button" class="ai-submit"><i class="fa-solid fa-paper-plane"></i><div class="loader"></div></button>
		</div>
	</div>
	<div id="ai-results"></div>';
	$cont2 .= $context;
	$qa_content['custom'] = $cont2;
	$qa_content['class']=' ai-create one-page';
}
$qa_content['focusid'] = 'ai-box';

return $qa_content;
/*
Omit PHP closing tag to help avoid accidental output
 */