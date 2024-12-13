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
<h3 class="f_s_25 f_w_700 dark_text mr_30">Projects </h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="index.php">Home</a></li>
<li class="breadcrumb-item active">Projects</li>
</ol>
</div>

<?php
// Establish database connection

// Initialize message variable
$msg = "";

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // Get form data
    $project_name = $_POST['project_name'];
    $category = $_POST['category'];
  

    // Generate a random number for the image file name
    $random_number = rand(1000, 9999);
    $image_extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $image_new_name = $random_number . '.' . $image_extension;

    $target_dir = "./image/project";
    $target_file = $target_dir . $image_new_name;

    // Move the uploaded image to the target directory
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        $msg = "File uploaded successfully!";
    } else {
        $msg = "Failed to upload file!";
    }

    // Insert data into the database with the generated random number as image name
    $sql = "INSERT INTO project (project_name,category,image) VALUES ('$project_name','$category','$random_number')";

    if (mysqli_query($conn, $sql)) {
        $msg = "Member inserted into the database";
    } else {
        $msg = "Failed to add Member";
    }
}
mysqli_close($conn);
?>



<div class="col-lg-10">
<div class="white_card card_height_100 mb_30">
<div class="white_card_header">
<div class="box_header m-0">
<div class="main-title">
<h4 class="text-center"><?= htmlspecialchars($msg); ?></h4>
</div>
</div>
</div>
<div class="white_card_body">
<div class="card-body">
<form method="POST" enctype="multipart/form-data">
<div class="mb-3">
<input type="text" class="form-control" name="Project_name" <?= htmlspecialchars($_POST['Project_name'] ?? ''); ?> id="inputAddress" placeholder="Project name">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="Category" <?= htmlspecialchars($_POST['Category'] ?? ''); ?> id="inputAddress" placeholder="Category">
</div>
<div class="mb-3">
<input type="file" class="form-control" name="image" <?= htmlspecialchars($_POST['image'] ?? ''); ?> id="inputAddress" placeholder="image">
</div>

<button type="submit" name="submit" class="btn btn-primary">Add project</button>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</div>


<?php
include "footer.php";
?>