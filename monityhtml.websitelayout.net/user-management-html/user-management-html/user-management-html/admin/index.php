<?php
include "config.php";
session_start();

// Check if the user is not logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    // Redirect the user to the login page
    header("location: login.php");
    exit;
}
$sql_count = "SELECT COUNT(id) AS id_count FROM faq"; 
$result_count = mysqli_query($conn, $sql_count);
$id_count = 0;
if ($result_count) {
    $row_count = mysqli_fetch_assoc($result_count);
    $id_count = $row_count['id_count'];
} else {
    echo "Failed to execute query: " . mysqli_error($conn);
}

$sql_count = "SELECT COUNT(id) AS id_count FROM team"; 
$result_count = mysqli_query($conn, $sql_count);
$id_countt = 0;
if ($result_count) {
    $row_count = mysqli_fetch_assoc($result_count);
    $id_countt = $row_count['id_count'];
} else {
    echo "Failed to execute query: " . mysqli_error($conn);
}


?>



<?php
include "header.php";
include "sidebar.php";
?>


<section class="main_content dashboard_part large_header_bg">

<div class="container-fluid g-0">
<div class="row">
<div class="col-lg-12 p-0 ">
<div class="header_iner d-flex justify-content-between align-items-center">
<div class="sidebar_icon d-lg-none">
<i class="ti-menu"></i>
</div>
<div class="line_icon open_miniSide d-none d-lg-block">
<img src="img/line_img.png" alt>
</div>
<div class="serach_field-area d-flex align-items-center">
<div class="search_inner">
<form action="#">
<div class="search_field">
<input type="text" placeholder="Search">
</div>
<button type="submit"> <img src="img/icon/icon_search.svg" alt> </button>
</form>
</div>
</div>
<div class="header_right d-flex justify-content-between align-items-center">
<div class="header_notification_warp d-flex align-items-center">
<li>
<a class="bell_notification_clicker" href="#"> <img src="img/icon/bell.svg" alt>
<span>2</span>
</a>

<div class="Menu_NOtification_Wrap">
<div class="notification_Header">
<h4>Notifications</h4>
</div>
<div class="Notification_body">

<div class="single_notify d-flex align-items-center">
<div class="notify_thumb">
<a href="#"><img src="img/staf/2.png" alt></a>
</div>
<div class="notify_content">
<a href="#"><h5>Cool Marketing </h5></a>
<p>Lorem ipsum dolor sit amet</p>
</div>
</div>

<div class="single_notify d-flex align-items-center">
<div class="notify_thumb">
<a href="#"><img src="img/staf/4.png" alt></a>
</div>
<div class="notify_content">
<a href="#"><h5>Awesome packages</h5></a>
<p>Lorem ipsum dolor sit amet</p>
</div>
</div>

<div class="single_notify d-flex align-items-center">
<div class="notify_thumb">
<a href="#"><img src="img/staf/3.png" alt></a>
</div>
<div class="notify_content">
<a href="#"><h5>what a packages</h5></a>
<p>Lorem ipsum dolor sit amet</p>
</div>
</div>

<div class="single_notify d-flex align-items-center">
<div class="notify_thumb">
<a href="#"><img src="img/staf/2.png" alt></a>
</div>
<div class="notify_content">
<a href="#"><h5>Cool Marketing </h5></a>
<p>Lorem ipsum dolor sit amet</p>
</div>
</div>

<div class="single_notify d-flex align-items-center">
<div class="notify_thumb">
<a href="#"><img src="img/staf/4.png" alt></a>
</div>
<div class="notify_content">
<a href="#"><h5>Awesome packages</h5></a>
<p>Lorem ipsum dolor sit amet</p>
</div>
</div>

<div class="single_notify d-flex align-items-center">
<div class="notify_thumb">
<a href="#"><img src="img/staf/3.png" alt></a>
</div>
<div class="notify_content">
<a href="#"><h5>what a packages</h5></a>
<p>Lorem ipsum dolor sit amet</p>
</div>
</div>
</div>
<div class="nofity_footer">
<div class="submit_button text-center pt_20">
<a href="#" class="btn_1">See More</a>
</div>
</div>
</div>

</li>
<li>
<a class="CHATBOX_open" href="#"> <img src="img/icon/msg.svg" alt> <span>2</span> </a>
</li>
</div>
<div class="profile_info">
<img src="img/client_img.png" alt="#">
<div class="profile_info_iner">
<div class="profile_author_name">
<p>Neurologist </p>
<h5>Dr. Robar Smith</h5>
</div>
<div class="profile_info_details">
<a href="#">My Profile </a>
<a href="#">Settings</a>
<a href="#">Log Out </a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<div class="main_content_iner overly_inner ">
<div class="container-fluid p-0 ">

<div class="row">
<div class="col-12">
<div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
<div class="page_title_left d-flex align-items-center">
<h3 class="f_s_25 f_w_700 dark_text mr_30">Dashboard</h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
<li class="breadcrumb-item active">Analytic</li>
</ol>
</div>

</div>
</div>
<div class="col-xl-4 ">
<div class="white_card card_height_100 mb_30 user_crm_wrapper">
<div class="row">
<div class="col-lg-6">
<div class="single_crm">
<div class="crm_head d-flex align-items-center justify-content-between">
<div class="thumb">
<img src="img/crm/businessman.svg" alt>
</div>
<i class="fas fa-ellipsis-h f_s_11 white_text"></i>
</div>
<div class="crm_body">
<h4><?php echo $id_countt; ?></h4>
<p>Team</p>
</div>
</div>
</div>
<div class="col-lg-6">
<div class="single_crm ">
<div class="crm_head crm_bg_1 d-flex align-items-center justify-content-between">
<div class="thumb">
<img src="img/crm/customer.svg" alt>
</div>
<i class="fas fa-ellipsis-h f_s_11 white_text"></i>
</div>
<div class="crm_body">
<h4><?php echo $id_count; ?></h4>
<p>FAQ</p>
</div>
</div>
</div>
<div class="col-lg-6">
<div class="single_crm">
<div class="crm_head crm_bg_2 d-flex align-items-center justify-content-between">
<div class="thumb">
<img src="img/crm/infographic.svg" alt>
</div>
<i class="fas fa-ellipsis-h f_s_11 white_text"></i>
</div>
<div class="crm_body">
<h4>2455</h4>
<p>User Registrations</p>
</div>
</div>
</div>
<div class="col-lg-6">
<div class="single_crm">
<div class="crm_head crm_bg_3 d-flex align-items-center justify-content-between">
<div class="thumb">
<img src="img/crm/sqr.svg" alt>
</div>
<i class="fas fa-ellipsis-h f_s_11 white_text"></i>
</div>
<div class="crm_body">
<h4>2455</h4>
<p>User Registrations</p>
</div>
</div>
</div>
</div>

<?php
include "footer.php"
?>
