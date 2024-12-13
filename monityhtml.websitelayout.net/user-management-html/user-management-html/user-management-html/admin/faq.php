<?php
include "header.php";
include "sidebar.php";
include "navbar.php";
?>

<div class="main_content_iner overly_inner ">
<div class="container-fluid p-0 ">

<div class="row">
<div class="col-12">
<div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
<div class="page_title_left d-flex align-items-center">
<h3 class="f_s_25 f_w_700 dark_text mr_30">Create FAQ</h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
<li class="breadcrumb-item active">Analytic</li>
</ol>
</div>
</div>
</div>
</div>

<?php
// Establish database connection
include("config.php");
if (!$conn) {
    die("Could not connect to the database: " . mysqli_connect_error());
}

// Initialize message variable
$msg = "";

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // Get form data
    $heading = $_POST['heading'];
    $fullWord = $_POST['fullWord'];

    // Insert data into the database
    $sql = "INSERT INTO faq (heading, fullWord) VALUES ('$heading','$fullWord')";

    if (mysqli_query($conn, $sql)) {
        $msg = "FAQ inserted into the database";
    } else {
        $msg = "Failed to add FAQ";
    }
}
mysqli_close($conn);
?>



<form id="contactForm" action="" method="POST">
<div class="row">
<div class="col-12">
<div class="white_card card_height_100 mb_30">
<div class="white_card_header">
<div class="box_header m-0">
<div class="main-title">
<h3 class="m-0">Create FAQ</h3>
<h4 class="text-center"><?= htmlspecialchars($msg); ?></h4>
</div>
</div>
</div>
<div class="white_card_body">
<div class="row">
<div class="col-lg-12">
<div class="common_input mb_15">
<input  type="text" name="heading" <?= htmlspecialchars($_POST['heading'] ?? ''); ?> placeholder="Heading" required>
</div>
</div>
<div class="col-lg-12">
<div class="common_input mb_15">
<textarea id="comment" name="fullWord" class="form-control"  <?= htmlspecialchars($_POST['fullWord'] ?? ''); ?> placeholder="Full answer"> </textarea>
</div>
</div>

<div class="col-12">
<div class="create_report_btn mt_30">
<a href="#" type="submit" name="submit" class="btn_1 radius_btn d-block text-center">Create FAQ</a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</form>


<?php
include "footer.php";
?>