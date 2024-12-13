<?php

class king_leo_op {

	function allow_template($template)
	{
		return ($template!='admin');
	}

	function option_default($option) {

		switch($option) {
  
            case 'king_leo_enable':
                return true;
            case 'kingai_imgn':
                return 3; 
            case 'king_sd_steps':
            	return '50';
			default:
				return null;
		}	

	}
	
	function admin_form(&$qa_content)
	{

		$ok = null;
		if (qa_clicked('king_leo_save_button')) {
			qa_opt('king_leo_enable',(bool)qa_post_text('king_leo_enable'));
			qa_opt('enable_dalle',(bool)qa_post_text('enable_dalle'));
			qa_opt('enable_sd',(bool)qa_post_text('enable_sd'));
			qa_opt('enable_pro',(bool)qa_post_text('enable_pro'));
			qa_opt('enable_odalle',(bool)qa_post_text('enable_odalle'));
			qa_opt('enable_pix',(bool)qa_post_text('enable_pix'));
			qa_opt('enable_dreams',(bool)qa_post_text('enable_dreams'));
			qa_opt('enable_sdn',(bool)qa_post_text('enable_sdn'));
			qa_opt('enable_de3',(bool)qa_post_text('enable_de3'));
			qa_opt('enable_playg',(bool)qa_post_text('enable_playg'));
			qa_opt('enable_realxl',(bool)qa_post_text('enable_realxl'));
			qa_opt('ennsfw',(bool)qa_post_text('ennsfw'));
			qa_opt('sdnsfw',(bool)qa_post_text('sdnsfw'));
			qa_opt('eprompter',(bool)qa_post_text('eprompter'));
			qa_opt('oaprompter',(bool)qa_post_text('oaprompter'));
			qa_opt('king_sd_steps', qa_post_text('king_sd_steps'));
			qa_opt('king_leo_api', qa_post_text('king_leo_api'));
			qa_opt('king_sd_api', qa_post_text('king_sd_api'));
			qa_opt('kingai_imgn', qa_post_text('kingai_imgn'));
			qa_opt('kingh_title', qa_post_text('kingh_title'));
			qa_opt('kingh_desc', qa_post_text('kingh_desc'));
			qa_opt('hsubmit',(bool)qa_post_text('hsubmit'));
			qa_opt('eidown',(bool)qa_post_text('eidown'));
			qa_opt('aprvt',(bool)qa_post_text('aprvt'));
			qa_opt('aupload',(bool)qa_post_text('aupload'));
			qa_opt('ulimits',(bool)qa_post_text('ulimits'));
			qa_opt('ulimit', qa_post_text('ulimit'));
			qa_opt('ailimits',(bool)qa_post_text('ailimits'));
			qa_opt('enprompt',(bool)qa_post_text('enprompt'));
			qa_opt('plan_1_lmt', qa_post_text('plan_1_lmt'));
			qa_opt('plan_2_lmt', qa_post_text('plan_2_lmt'));
			qa_opt('plan_3_lmt', qa_post_text('plan_3_lmt'));
			qa_opt('plan_4_lmt', qa_post_text('plan_4_lmt'));
			$ok = qa_lang('admin/options_saved');
		}
        qa_set_display_rules($qa_content, array(
			'king_leo_api' => 'enable_dalle || enable_de3',
			'king_sd_api'  => 'king_leo_enable',
			'king_sd_steps'  => 'king_leo_enable',
			'enprompt' => 'king_leo_enable',
			'kingai_imgn'  => 'king_leo_enable',
			'kingh_title'  => 'king_leo_enable',
			'kingh_desc'   => 'king_leo_enable',
			'hsubmit'   => 'king_leo_enable',
			'eidown' => 'king_leo_enable',
			'aprvt' => 'king_leo_enable',
			'aupload' => 'king_leo_enable',
			'ulimits' => 'king_leo_enable',
			'ulimit' => 'ulimitz && king_leo_enable',
			'ailimits' => 'king_leo_enable',
			'plan_1_lmt' => 'ailimitz && king_leo_enable',
			'plan_2_lmt' => 'ailimitz && king_leo_enable',
			'plan_3_lmt' => 'ailimitz && king_leo_enable',
			'plan_4_lmt' => 'ailimitz && king_leo_enable',
			'enable_sd'  => 'king_leo_enable',
			'enable_pro' => 'king_leo_enable',
			'enable_odalle'  => 'king_leo_enable',
			'enable_pix'  => 'king_leo_enable',
			'enable_dreams'  => 'king_leo_enable',
			'enable_sdn' => 'king_leo_enable',
			'enable_playg'  => 'king_leo_enable',
			'enable_realxl'  => 'king_leo_enable',
			'oaprompter' =>  'eprompter',
		));

		$fields = array();

		$fields[] = array(
			'label' => 'Enable Ai',
			'tags' => 'NAME="king_leo_enable" id="king_leo_enable"',
			'value' => qa_opt('king_leo_enable'),
			'type' => 'checkbox',
		);


		$fields[] = array(
			'id'    => 'king_sd_api',
			'label' => 'KingStudio Api Key',
			'tags'  => 'NAME="king_sd_api"',
			'value' => qa_opt('king_sd_api'),
			'type'  => 'text',
			'note'  => 'Required KingStudio api key and credits to work. You can create one <a href="https://kingstudio.io/" target="_blank">here</a>'	
		);
		$fields[] = array(
			'id'    => 'king_sd_steps',
			'label' => 'Steps:',
			'note'  => 'Number of diffusion steps to run in Stable Diffusion',
			'html' => '<input class="king-form-tall-number" type="number" NAME="king_sd_steps" min="10" max="150" value="'.qa_opt('king_sd_steps').'" />',
			'type'  => 'custom',
		);
		$fields[] = array(
			'label' => 'Enable Stable Diffusion',
			'id' => 'enable_sd',
			'tags' => 'NAME="enable_sd"',
			'value' => qa_opt('enable_sd'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/sdn'),
			'id' => 'enable_sdn',
			'tags' => 'NAME="enable_sdn"',
			'value' => qa_opt('enable_sdn'),
			'type' => 'checkbox',
		);

		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/proteus'),
			'id' => 'enable_pro',
			'tags' => 'NAME="enable_pro"',
			'value' => qa_opt('enable_pro'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/odalle'),
			'id' => 'enable_odalle',
			'tags' => 'NAME="enable_odalle"',
			'value' => qa_opt('enable_odalle'),
			'type' => 'checkbox',
		);

		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/dreams'),
			'id' => 'enable_dreams',
			'tags' => 'NAME="enable_dreams"',
			'value' => qa_opt('enable_dreams'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/pix'),
			'id' => 'enable_pix',
			'tags' => 'NAME="enable_pix" ',
			'value' => qa_opt('enable_pix'),
			'type' => 'checkbox',
		);

		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/playg'),
			'id' => 'enable_playg',
			'tags' => 'NAME="enable_playg"',
			'value' => qa_opt('enable_playg'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Enable '.qa_lang('kingai_lang/realxl'),
			'id' => 'enable_realxl',
			'tags' => 'NAME="enable_realxl"',
			'value' => qa_opt('enable_realxl'),
			'type' => 'checkbox',
		);		
		$fields[] = array(
			'type' => 'blank',
		);
		$fields[] = array(
			'label' => 'AI Prompter',
			'tags' => 'NAME="eprompter" id="eprompter"',
			'value' => qa_opt('eprompter'),
			'type' => 'checkbox',
			'note'  => 'You can enable AI Prompter! Just write few words then click <i class="fa-solid fa-feather"></i>, it will write prompt for you!',
		);
		$fields[] = array(
			'label' => 'Only Admin use Prompter',
			'id' => 'oaprompter',
			'tags' => 'NAME="oaprompter"',
			'value' => qa_opt('oaprompter'),
			'type' => 'checkbox',
			'note'  => 'If you select this only admin can use prompter !',
		);		
		$fields[] = array(
			'label' => 'Enable NSFW Images',
			'id' => 'ennsfw',
			'tags' => 'NAME="ennsfw"',
			'value' => qa_opt('ennsfw'),
			'type' => 'checkbox',
			'note'  => 'NSFW images available with ' .qa_lang('kingai_lang/realxl'). ', ' .qa_lang('kingai_lang/odalle'). ', ' .qa_lang('kingai_lang/dreams'). ', ' .qa_lang('kingai_lang/playg') . ', ' . qa_lang('kingai_lang/proteus'),
		);
		$fields[] = array(
			'label' => 'Enable NSFW Images for Stable Diffusion',
			'id' => 'sdnsfw',
			'tags' => 'NAME="sdnsfw"',
			'value' => qa_opt('sdnsfw'),
			'type' => 'checkbox',
			'note'  => 'You can enable NSFW image create for Stable Diffusion. ',
		);

		$fields[] = array(
			'label' => 'Enable Negative prompt',
			'id' => 'enprompt',
			'tags' => 'NAME="enprompt"',
			'value' => qa_opt('enprompt'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'type' => 'blank',
		);

		$fields[] = array(
			'label' => 'Enable DALL-E',
			'tags' => 'NAME="enable_dalle" id="enable_dalle"',
			'value' => qa_opt('enable_dalle'),
			'type' => 'checkbox',
		); 
		$fields[] = array(
			'label' => 'Enable DALL-E 3',
			'tags' => 'NAME="enable_de3" id="enable_de3"',
			'value' => qa_opt('enable_de3'),
			'type' => 'checkbox',
		);		
		$fields[] = array(
			'id'    => 'king_leo_api',
			'label' => 'OpenAi Api Key',
			'tags'  => 'NAME="king_leo_api"',
			'value' => qa_opt('king_leo_api'),
			'type'  => 'text',
			'note'  => 'Required OpenAI api key to work. You can create one <a href="https://platform.openai.com/account/api-keys" target="_blank">here</a>'	
		);
		$fields[] = array(
			'type' => 'blank',
		);

		$fields[] = array(
			'id'    => 'kingai_imgn',
			'label' => 'Number of image generation: ',
			'html' => '<input class="king-form-tall-number" type="number" NAME="kingai_imgn" min="1" max="4" value="'.qa_opt('kingai_imgn').'" />',
			'type'  => 'custom',	
		);

		$fields[] = array(
			'type' => 'blank',
		);		
		$fields[] = array(
			'id'    => 'kingh_title',
			'label' => 'Homepage Title',
			'tags'  => 'NAME="kingh_title"',
			'value' => qa_opt('kingh_title'),
			'type'  => 'text',	
		);
		$fields[] = array(
			'id'    => 'kingh_desc',
			'label' => 'Homepage Description',
			'tags'  => 'NAME="kingh_desc"',
			'value' => qa_opt('kingh_desc'),
			'type'  => 'text',	
		);	
		$fields[] = array(
			'label' => 'Hide Submit Button',
			'id' => 'hsubmit',
			'tags' => 'NAME="hsubmit"',
			'value' => qa_opt('hsubmit'),
			'type' => 'checkbox',
		); 
		$fields[] = array(
			'label' => 'Enable Image Download',
			'id' => 'eidown',
			'tags' => 'NAME="eidown"',
			'value' => qa_opt('eidown'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Allow users to create private posts',
			'id' => 'aprvt',
			'tags' => 'NAME="aprvt"',
			'value' => qa_opt('aprvt'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Enable auto upload for generated images',
			'id' => 'aupload',
			'tags' => 'NAME="aupload"',
			'value' => qa_opt('aupload'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'label' => 'Enable Image generation limits for users',
			'id' => 'ulimits',
			'tags' => 'NAME="ulimits" id="ulimitz"',
			'value' => qa_opt('ulimits'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'id'    => 'ulimit',
			'label' => 'Limit for all users:',
			'tags'  => 'NAME="ulimit"',
			'value' => qa_opt('ulimit'),
			'type'  => 'number',	
		);
		$fields[] = array(
			'label' => 'Enable Image generation limits for plans',
			'id' => 'ailimits',
			'tags' => 'NAME="ailimits" id="ailimitz"',
			'value' => qa_opt('ailimits'),
			'type' => 'checkbox',
		);
		$fields[] = array(
			'id'    => 'plan_1_lmt',
			'label' => 'Plan 1 limit:',
			'tags'  => 'NAME="plan_1_lmt"',
			'value' => qa_opt('plan_1_lmt'),
			'type'  => 'number',	
		);
		$fields[] = array(
			'id'    => 'plan_2_lmt',
			'label' => 'Plan 2 limit:',
			'tags'  => 'NAME="plan_2_lmt"',
			'value' => qa_opt('plan_2_lmt'),
			'type'  => 'number',	
		);
		$fields[] = array(
			'id'    => 'plan_3_lmt',
			'label' => 'Plan 3 limit:',
			'tags'  => 'NAME="plan_3_lmt"',
			'value' => qa_opt('plan_3_lmt'),
			'type'  => 'number',	
		);
		$fields[] = array(
			'id'    => 'plan_4_lmt',
			'label' => 'Plan 4 limit:',
			'tags'  => 'NAME="plan_4_lmt"',
			'value' => qa_opt('plan_4_lmt'),
			'type'  => 'number',	
		);

		return array(
			'ok' => ($ok && !isset($error)) ? $ok : null,
			
			'fields' => $fields,
			
			'buttons' => array(
				array(
				'label' => qa_lang_html('main/save_button'),
				'tags' => 'NAME="king_leo_save_button"',
				),
			),
		);
	}

}