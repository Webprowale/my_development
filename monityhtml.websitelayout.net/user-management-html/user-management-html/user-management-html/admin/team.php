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
<h3 class="f_s_25 f_w_700 dark_text mr_30">Add Team Member</h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="index.php">Home</a></li>
<li class="breadcrumb-item active">Team</li>
</ol>
</div>

<?php
// Establish database connection
include("config.php");


// Initialize message variable
$msg = "";

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // Get form data
    $name = $_POST['name'];
    $position = $_POST['position'];
   
    $fb_handle = $_POST['fb_handle'];
    $ig_handle = $_POST['ig_handle'];
    $tw_handle = $_POST['tw_handle'];

    // Generate a random number for the image file name
    $random_number = rand(1000, 9999);
    $image_extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $image_new_name = $random_number . '.' . $image_extension;

    $target_dir = "./image/";
    $target_file = $target_dir . $image_new_name;

    // Move the uploaded image to the target directory
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        $msg = "File uploaded successfully!";
    } else {
        $msg = "Failed to upload file!";
    }

    // Insert data into the database with the generated random number as image name
    $sql = "INSERT INTO team (name, position, image, fb_handle, ig_handle, tw_handle) VALUES ('$name', '$position', '$random_number', '$fb_handle', '$ig_handle', '$tw_handle')";

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

</div>
</div>
</div>

<div class="white_card_body">
<div class="card-body">
<form method="POST" enctype="multipart/form-data">
<div class="mb-3">
    <h4 class="text-center"><?= htmlspecialchars($msg); ?></h4>
<input type="text" class="form-control" name="name" <?= htmlspecialchars($_POST['name'] ?? ''); ?> id="inputAddress" placeholder="Name">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="position" <?= htmlspecialchars($_POST['position'] ?? ''); ?> id="inputAddress" placeholder="position">
</div>
<div class="mb-3">
<input type="file" class="form-control" name="image" <?= htmlspecialchars($_POST['image'] ?? ''); ?> id="inputAddress" placeholder="image">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="fb_handle" <?= htmlspecialchars($_POST['fb_handle'] ?? ''); ?> id="inputAddress" placeholder="fb_handle">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="ig_handle" <?= htmlspecialchars($_POST['ig_handle'] ?? ''); ?> id="inputAddress" placeholder="ig_handle">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="tw_handle" <?= htmlspecialchars($_POST['tw_handle'] ?? ''); ?> id="inputAddress" placeholder="tw_handle">
</div>
<button type="submit" name="submit" class="btn btn-primary">Add to team</button>
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