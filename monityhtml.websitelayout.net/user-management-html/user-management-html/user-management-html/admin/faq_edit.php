<?php
include("config.php");
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
<h3 class="f_s_50 f_w_800 dark_text mr_30">Update FAQ</h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="index.php">Home</a></li>
<li class="breadcrumb-item active">Edit FAQ</li>
</ol>
</div>

<?php

$msg = "";
if (isset($_POST['submit'])) {
    $id = $_POST['id']; // Retrieve the ID of the record to be updated
    $heading = $_POST['heading'];
    $fullWord = $_POST['fullWord'];

    $sql = "UPDATE faq SET heading='$heading', fullWord='$fullWord' WHERE id='$id'";

    if (mysqli_query($conn, $sql)) {
        $msg = "Information updated in the database successfully!";
        
    } else {
        $msg = "Failed to update information in the database!";
    }
}

$id = $_GET['id'];

// Fetch the record with the specified ID
$sql_fetch = "SELECT * FROM faq WHERE id='$id'";
$result_fetch = mysqli_query($conn, $sql_fetch);
$row = mysqli_fetch_assoc($result_fetch);

mysqli_close($conn);
?>

<form id="contactForm" action="" method="POST">
<div class="row">
<div class="col-12">
<div class="white_card card_height_100 mb_30">
<div class="white_card_header">
<div class="box_header m-0">
<div class="main-title">
<h3 class="m-0">Update FAQ</h3>
<h4 class="text-center"><?= htmlspecialchars($msg); ?></h4>
</div>
</div>
</div>
<div class="white_card_body">
<div class="row">
<div class="col-lg-12">
<div class="common_input mb_15">
<input  type="hidden" name="id" value="<?php echo $row['id']; ?>">
<input  type="text" name="heading" value="<?php echo $row['heading']; ?>" placeholder="Heading" required>
</div>
</div>
<div class="col-lg-12">
<div class="common_input mb_15">
<textarea id="comment" name="fullWord" class="form-control" placeholder="Full answer"><?php echo $row['fullWord']; ?></textarea>
</div>
</div>

<div class="col-12">
<div class="create_report_btn mt_30">
<a href="#" type="submit" name="submit" class="btn_1 radius_btn d-block text-center">Update FAQ</a>
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
