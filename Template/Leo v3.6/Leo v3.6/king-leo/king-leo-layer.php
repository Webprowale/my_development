<?php
	class qa_html_theme_layer extends qa_html_theme_base {
		
	// theme replacement functions
		function king_js() {
			qa_html_theme_base::king_js();
			if ( qa_opt('king_leo_enable') ) {
				$this->output('<script src="'.QA_HTML_THEME_LAYER_URLTOROOT.'king-leo.js"></script>');
			}
		}


	public function head_custom_css()
	{
		qa_html_theme_base::head_custom_css();
		if ( qa_opt('king_leo_enable') ) {
			$this->output('<link href="' . QA_HTML_THEME_LAYER_URLTOROOT . 'king-leo.min.css" type="text/css" rel="stylesheet" />');
		}
	}
	}
