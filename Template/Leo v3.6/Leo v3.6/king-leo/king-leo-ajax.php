<?php
class submitai_ajax{
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
					'title' => 'KingAI Ajax',
					'request' => 'submitai_ajax',
						'nav' => 'null', // 'M'=main, 'F'=footer, 'B'=before main, 'O'=opposite main, null=none
					),
			);
		}
		function match_request($request)
		{
			if ($request=='submitai_ajax') {
				return true;
			}
			return false;
		}
		
		
		public function process_request($request)
		{
			require_once QA_INCLUDE_DIR . 'king-db/metas.php';
			require_once QA_INCLUDE_DIR . 'king-app/users.php';
			$input = qa_post_text('input');
			$iurl = qa_post_text('iurl');
			$siurl = qa_post_text('siurl');
			$aiselect = qa_post_text('select');
			$promter = qa_post_text('promter');
			$imsize = qa_post_text('radio');
			$chkk = true;
			if ( ( qa_opt('ailimits') || qa_opt('ulimits') ) && qa_get_logged_in_level() <= QA_USER_LEVEL_ADMIN ) {
				$chkk = kingai_check();
			}

			if ($input && $chkk) {
				$npvalue = (null !== qa_post_text('npvalue')) ? qa_post_text('npvalue') : '';
				$imagen = qa_opt('kingai_imgn');

				if ('de' !== $aiselect && 'de3' !== $aiselect ) {

					$sdapi = qa_opt('king_sd_api');
					$aistyle = qa_post_text('style');
					$aisteps = qa_opt('king_sd_steps');
					$URL = "https://kingstudio.io/api/king-text2img";

					if ( isset($aistyle) && 'none' !== $aistyle ) {
						$style_preset = $aistyle;
					} else {
						$style_preset = '';
					}

					if (qa_opt('ennsfw')) {
						$ennsfw = true;
					} else {
						$ennsfw = false;
					}
					if (qa_opt('sdnsfw')) {
						$sdnsfw = true;
					} else {
						$sdnsfw = false;
					}
					
					$initialData = array(
						"prompt" => $input . ', ' . $style_preset,
						"size" => (int)$imagen,
						"steps" => (int)$aisteps,
						"aisize" => $imsize,
						"model" => $aiselect,
						"nvalue" =>$npvalue,
						"ennsfw" => $ennsfw,
						"sdnsfw" => $sdnsfw,
					);
					$ch = curl_init($URL);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
					curl_setopt($ch, CURLOPT_HTTPHEADER, [
						"Authorization: Bearer $sdapi",
						"Accept: application/json",
						"Content-Type: application/json",

					]);
					curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($initialData));
					curl_setopt($ch, CURLOPT_TIMEOUT, 400);
					$response = curl_exec($ch);
					$out = json_decode($response, true);

					if (isset($out['error'])) {
						echo json_encode(array('success' => false, 'message' => $out['error']));
					} else {
						if (qa_opt('ailimits') || qa_opt('ulimits')) {
							kingai_imagen($imagen);
						}
						echo json_encode(array('success' => true, 'message' => $out));
					}
				} else {
					$openaiapi = qa_opt('king_leo_api');
					$url = 'https://api.openai.com/v1/images/generations';

					if ('de3' === $aiselect) {
						$params = array(
							'model' => 'dall-e-3',
							'prompt' => $input,
							'n' => 1,
							'size' => $imsize,
						);
					} else {
						$params = array(
							'prompt' => $input,
							'n' => (int)$imagen,
							'size' => $imsize,
						);
					}
					$params_json = json_encode($params);
					$headers = array(
						'Content-Type: application/json',
						'Authorization: Bearer ' . $openaiapi,
					);

					$ch = curl_init($url);

					curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
					curl_setopt($ch, CURLOPT_POSTFIELDS, $params_json);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
					curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
					curl_setopt($ch, CURLOPT_TIMEOUT, 400);
					$response_body = curl_exec($ch);

					curl_close($ch);

					$response_obj = json_decode($response_body, true);

					if (qa_opt('ailimits') || qa_opt('ulimits')) {
						kingai_imagen($imagen);
					}
					$result['out'] = array_column($response_obj['data'], 'url');
					$result['format'] = "url";

					echo json_encode(array('success' => true, 'message' => $result));
					
				}

				
			} elseif($iurl) {

				$thumb['thumb'] = kingai_urlupload($iurl, true, 600);
				$thumb['main'] = kingai_urlupload($iurl);
				echo json_encode($thumb);
			} elseif($siurl) {
				$DestinationDirectory = QA_INCLUDE_DIR . 'uploads';
				$canvasData = base64_decode($siurl);
				$year_folder  = $DestinationDirectory . date("Y");

				$NewImageName = uniqid() . '-meme.png';
				$DestFolder = $DestinationDirectory . '/' . $NewImageName;
				file_put_contents($DestFolder, $canvasData);

				$thumb['thumb'] = kingai_urlupload($DestFolder, true, 600);
				$thumb['main'] = kingai_urlupload($DestFolder);
				echo json_encode($thumb);
				unlink( $DestFolder );
			} elseif($promter) {
				$pinput = qa_post_text('pinput');	
				$apiToken = qa_opt('king_sd_api'); // Replace with your actual API token
				$apiUrl = "https://kingstudio.io/api/king-prompt";
				$initialData = array(
				        "prmpt" => $pinput,
				);
				$ch = curl_init($apiUrl);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_HTTPHEADER, [
				    "Authorization: Bearer $apiToken",
				    "Accept: application/json",
				    "Content-Type: application/json",
				    
				]);
				curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($initialData));
				$response = curl_exec($ch);
				$userNames = json_decode($response, true);
				echo json_encode(array('success' => true, 'message' => $userNames['success']));
			}
		}
	}
	function kingai_imagen($imagen)
	{
		$userid = qa_get_logged_in_userid();
		$query  = (INT)qa_db_usermeta_get( $userid, 'ailmt' );
		$total = $query+$imagen;
		qa_db_usermeta_set( $userid, 'ailmt', $total );
	}
	function kingai_check()
	{

		$userid = qa_get_logged_in_userid();
		$query  = (INT)qa_db_usermeta_get( $userid, 'ailmt' );
		$mp  = qa_db_usermeta_get( $userid, 'membership_plan' );
		$pl = null;
		if ($mp) {
			$pl = (INT)qa_opt('plan_'.$mp.'_lmt');
		} elseif (qa_opt('ulimits')) {
			$pl = (INT)qa_opt('ulimit');
		}
		
		if ($query >= $pl) {
			return false;
		} else {
			return true;
		}
	}
	function kingai_urlupload($imageUrl, $waterk=null, $resize=null) {

		$opts = array('http'=>array('header' => "User-Agent:MyAgent/1.0\r\n")); 
		$context = stream_context_create( $opts );
		$imageContent = file_get_contents( $imageUrl, false, $context );
		if ($imageContent === false) {
		return false; // Unable to fetch the image
	}
	if ( ! $waterk ) {
		$url_type = 'png';
		$url_filename = rand() . '.' . $url_type;
	} else {
		$url_type = 'webp';
		$url_filename = rand() . '.' . $url_type;
	}
	$DestinationDirectory = QA_INCLUDE_DIR . 'uploads/';
	$year_folder  = $DestinationDirectory . date("Y");
	$month_folder = $year_folder . '/' . date("m");
	!file_exists($year_folder) && mkdir($year_folder, 0777);
	!file_exists($month_folder) && mkdir($month_folder, 0777);
	$DestFolder = $month_folder . '/' . $url_filename;
	$result = file_put_contents($DestFolder, $imageContent);

	if ($result === false) {
		return false; // Failed to save image
	}
	list($CurWidth, $CurHeight) = getimagesize($DestFolder);
	// Resize the image if requested
	if ($resize) {
		
		$ImageScale   = min($resize / $CurWidth, $resize / $CurWidth);
		$NewWidth     = ceil($ImageScale * $CurWidth);
		$NewHeight    = ceil($ImageScale * $CurHeight);

		// Create a new image with the calculated dimensions
		$resizedImage = imagecreatetruecolor($NewWidth, $NewHeight);
		$sourceImage = imagecreatefrompng($DestFolder);

		// Resize and copy the original image to the new dimensions
		imagecopyresampled(
			$resizedImage,
			$sourceImage,
			0, 0, 0, 0,
			$NewWidth, $NewHeight,
			$CurWidth, $CurHeight
		);
		if ( qa_opt('watermark_default_show') && $waterk ) {
			$watermark_png_file   = QA_INCLUDE_DIR . 'watermark/watermark.png';
		// Add a watermark to the resized image
		$watermark = imagecreatefrompng($watermark_png_file); // Replace with your watermark image
		$watermark_width  = imagesx($watermark);
		$watermark_height = imagesy($watermark);
		$wposition = qa_opt('watermark_position');
		switch (strtolower($wposition)) {
			case 'topleft':
			$watermark_left = 0;
			$watermark_top  = 0;
			break;
			case 'topright':
			$watermark_left = $NewWidth - $watermark_width;
			$watermark_top = 0;
			break;
			case 'center':
			$watermark_left = ($NewWidth / 2) - ($watermark_width / 2);
			$watermark_top = ($NewHeight / 2) - ($watermark_height / 2);
			break;
			case 'bottomleft':
			$watermark_left = 0;
			$watermark_top = $NewHeight - $watermark_height;
			break;
			case 'bottomright':
			$watermark_left = $NewWidth - $watermark_width;
			$watermark_top = $NewHeight - $watermark_height;
			break;
			case 'bottomcenter':
			$watermark_left = ($NewWidth / 2) - ($watermark_width / 2);
			$watermark_top = $NewHeight - $watermark_height;
			break;
			default:
			$watermark_left   = 10;
			$watermark_top = ($NewHeight / 2 ) - ($watermark_height / 2);
		}
		imagecopy($resizedImage, $watermark, $watermark_left, $watermark_top, 0, 0, $watermark_width, $watermark_height); //merge image


	}
		// Save the resized image with watermark as WebP format
		imagewebp($resizedImage, $DestFolder, 90); // Quality is set to 90

		// Clean up the temporary images
		imagedestroy($sourceImage);
		imagedestroy($resizedImage);

	}

	$path   = 'uploads/' . date("Y") . '/' . date("m") . '/' . $url_filename;
	if (qa_opt('enable_aws')) {
		require_once QA_INCLUDE_DIR . 's3/aws.phar';
		$s3Client = new Aws\S3\S3Client([
			'region'  => ''.qa_opt('aws_region').'',
			'version' => 'latest',
			'credentials' => [
				'key'    => ''.qa_opt('aws_key').'',
				'secret' => ''.qa_opt('aws_secret').''
			]
		]);
		$result2 = $s3Client->putObject(array(
			'Bucket'     => ''.qa_opt('aws_bucket').'',
			'Key'        => $url_filename,
			'SourceFile' => '' . QA_INCLUDE_DIR . $path . ''
		));
		$output = king_insert_uploads($result2['ObjectURL'], $url_type, $NewWidth, $NewHeight, 'aws');
		unlink( QA_INCLUDE_DIR . $path );
	} elseif (qa_opt('enable_wasabi')) {
		require_once QA_INCLUDE_DIR . 's3/aws.phar';
		$raw_credentials = array(
			'credentials' => [
				'key'    => '' . qa_opt( 'wasabi_key' ) . '',
				'secret' => '' . qa_opt( 'wasabi_secret' ) . '',
			],
			'endpoint' => 'https://s3.wasabisys.com',
			'region' => '' . qa_opt( 'wasabi_region' ) . '',
			'version' => 'latest',
			'use_path_style_endpoint' => true
		);
		$s3 =  Aws\S3\S3Client::factory($raw_credentials);
		$bucket = '' . qa_opt( 'wasabi_bucket' ) . '';
		$result3 = $s3->putObject(array(
			'Bucket' => $bucket,
			'Key' => $url_filename,
			'SourceFile' => '' . QA_INCLUDE_DIR . $path . ''
		));
		$output = king_insert_uploads($result3['ObjectURL'], $url_type, $NewWidth, $NewHeight, 'wasabi');
		unlink( QA_INCLUDE_DIR . $path );
	} else {

		$output = king_insert_uploads( $path, $url_type, $CurWidth, $CurHeight );
	}
	return $output;
}