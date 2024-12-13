<?php
	class king_leo{
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
					'title' => 'KingAI',
					'request' => 'submitai',
						'nav' => 'M', // 'M'=main, 'F'=footer, 'B'=before main, 'O'=opposite main, null=none
						),
				);
		}
		public function match_request($request)
		{
			return $request == 'submitai';
		}
		
		
		public function process_request($request)
		{
			$htmlBody = '';
			require_once $this->urltoroot.'king-submitai.php';
			qa_set_template('leoai');
			return $qa_content;
		}
	}