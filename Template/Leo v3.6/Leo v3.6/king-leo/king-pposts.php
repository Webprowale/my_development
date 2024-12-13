<?php
	class king_pposts{
		private $directory;
		private $urltoroot;
		public function load_module($directory, $urltoroot)
		{
			$this->directory=$directory;
			$this->urltoroot=$urltoroot;
		}
		public function suggest_requests() // for display in admin interface
		{
			return array(
				array(
					'title' => 'Private posts',
					'request' => 'private-posts',
						'nav' => 'M', // 'M'=main, 'F'=footer, 'B'=before main, 'O'=opposite main, null=none
						),
				);
		}
		public function match_request($request)
		{
			return $request == 'private-posts';
		}
		
		
		public function process_request($request)
		{
			$qa_content = qa_content_prepare();
			qa_set_template('pposts');
			require_once QA_INCLUDE_DIR.'king-db/selects.php';
	require_once QA_INCLUDE_DIR.'king-app/format.php';
	

//	Check that we're logged in
	
	$userid=qa_get_logged_in_userid();

	list($questions, $users)=qa_db_select_with_pending(
		ai_get_private_posts($userid, 'created', 0, null, null, 'Q_HIDDEN', true),
		QA_FINAL_EXTERNAL_USERS ? null : qa_db_user_favorite_users_selectspec($userid)
	);
	
	$usershtml=qa_userids_handles_html(QA_FINAL_EXTERNAL_USERS ? $questions : array_merge($questions, $users));

	
//	Prepare and return content for theme

	$qa_content=qa_content_prepare(true);
	if (!isset($userid) || ! $questions) {
		$qa_content['custom'] = '<div class="nopost"><i class="fa-solid fa-lock fa-2x"></i> '.qa_lang('kingai_lang/nfoundpp').'</div>';
	}
	$qa_content['title']=qa_lang_html('misc/my_favorites_title');
	
	$qa_content['header']=qa_lang('kingai_lang/pposts');
	$qa_content['q_list']=array(		
		'qs' => array(),
	);
	
	if (count($questions)) {
		$qa_content['q_list']['form']=array(
			'tags' => 'method="post" action="'.qa_self_html().'"',

			'hidden' => array(
				'code' => qa_get_form_security_code('vote'),
			),
		);
		
		$defaults=qa_post_html_defaults('Q');
			
		foreach ($questions as $question)
			$qa_content['q_list']['qs'][]=qa_post_html_fields($question, $userid, qa_cookie_get(),
				$usershtml, null, qa_post_html_options($question, $defaults));
	}
	
	$qa_content['class']=' full-page';

			return $qa_content;
		}




	}

function ai_get_private_posts($voteuserid, $sort, $start, $categoryslugs = null, $createip = null, $specialtype = false, $full = false, $count = null)
{
	if (($specialtype == 'Q') || ($specialtype == 'Q_QUEUED')) {
		$type = $specialtype;
	} else {
		$type = $specialtype ? 'Q_HIDDEN' : 'Q';
	}
	// for backwards compatibility

	$count = isset($count) ? min($count, QA_DB_RETRIEVE_QS_AS) : QA_DB_RETRIEVE_QS_AS;


	$sortsql = 'ORDER BY ^posts.' . $sort . ' DESC';


	$selectspec = qa_db_posts_basic_selectspec($voteuserid, $full);

	$selectspec['source'] .= " JOIN (SELECT postid FROM ^posts WHERE " .
	qa_db_categoryslugs_sql_args($categoryslugs, $selectspec['arguments']) .
		(isset($createip) ? "createip=INET_ATON($) AND " : "") .
		"type=$ AND userid=$ " . $sortsql . " LIMIT #,#) y ON ^posts.postid=y.postid";

	if (isset($createip)) {
		$selectspec['arguments'][] = $createip;
	}

	array_push($selectspec['arguments'], $type, $voteuserid, $start, $count);

	$selectspec['sortdesc'] = $sort;

	return $selectspec;
}