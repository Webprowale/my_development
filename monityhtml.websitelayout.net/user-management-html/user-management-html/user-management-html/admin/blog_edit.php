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
<h3 class="f_s_25 f_w_700 dark_text mr_30">Edit Blog</h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="index.php">Home</a></li>
<li class="breadcrumb-item active">Edit blog</li>
</ol>
</div>
</div>
</div>



<?php
// Establish database connection
include("config.php");

// Initialize message variable
$msg = "";

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // Get form data
    $title = $_POST['title'];
    $description = $_POST['description'];
    $body = $_POST['body'];
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
    $sql = "UPDATE blog SET title='$title', description='$description',body='$body' image='$random_number' WHERE id='$id'";

    if (mysqli_query($conn, $sql)) {
        $msg = "Information updated successfully!";
        
    } else {
        $msg = "Failed to update information!";
    }
}

$id = $_GET['id'];

// Fetch the record with the specified ID
$sql_fetch = "SELECT * FROM blog WHERE id='$id'";
$result_fetch = mysqli_query($conn, $sql_fetch);
$row = mysqli_fetch_assoc($result_fetch);

mysqli_close($conn);
?>


<div class="col-lg-7">
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
<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
<input type="text" class="form-control" name="title" value="<?php echo $row['title']; ?>" <?= htmlspecialchars($_POST['title'] ?? ''); ?> id="inputAddress" placeholder="Name">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="description" value="<?php echo $row['description']; ?>" <?= htmlspecialchars($_POST['description'] ?? ''); ?> id="inputAddress" placeholder="position">
</div>
<div class="mb-3">
<input type="file" class="form-control" name="body" value="<?php echo $row['body']; ?>"  <?= htmlspecialchars($_POST['body'] ?? ''); ?> id="inputAddress" placeholder="image">
</div>
<div class="mb-3">
<input type="text" class="form-control" name="image" value="<?php echo $row['image']; ?>" <?= htmlspecialchars($_POST['image'] ?? ''); ?> id="inputAddress" placeholder="fb_handle">
</div>
<button type="submit" name="submit" class="btn btn-primary">Edit blog list</button>
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