<?php
include "config.php";
include "header.php";
include "sidebar.php";
?>
<section class="main_content dashboard_part large_header_bg">
<?php
include "navbar.php";
$carry = mysqli_query($conn, "SELECT * FROM blog ORDER BY id DESC");
?>

<div class="main_content_iner overly_inner ">
<div class="container-fluid p-0 ">

<div class="row">
<div class="col-12">
<div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
<div class="page_title_left d-flex align-items-center">
<h3 class="f_s_25 f_w_700 dark_text mr_30">Blog list</h3>
<ol class="breadcrumb page_bradcam mb-0">
<li class="breadcrumb-item"><a href="index.php">Home</a></li>
<li class="breadcrumb-item active">list</li>
</ol>
</div>
<div class="page_title_right">
<div class="page_date_button d-flex align-items-center">
<img src="img/icon/calender_icon.svg" alt>
August 1, 2020 - August 31, 2020
</div>
</div>
</div>
</div>
</div>
<div class="row">
<div class="col-lg-12">
<div class="white_card card_height_100 mb_30 pt-4">
<div class="white_card_body">
<div class="QA_section">
<div class="white_box_tittle list_header">
<h4>Blog List </h4>
<div class="box_right d-flex lms_block">
<div class="serach_field_2">
<div class="search_inner">
<form Active="#">
<div class="search_field">
<input type="text" placeholder="Search content here...">
</div>
<button type="submit"> <i class="ti-search"></i> </button>
</form>
</div>
</div>
<div class="add_button ms-2">
<a href="#" data-toggle="modal" data-target="#addcategory" class="btn_1">search</a>
</div>
</div>
</div>
<div class="QA_table mb_30">

<table class="table lms_table_active ">
<thead>
<tr>
<th scope="col">id</th>
<th scope="col">title</th>
<th scope="col">description</th>
<th scope="col"> body</th>
<th scope="col">image</th>
<th scope="col">Date created</th>
<th scope="col">Action</th>
</tr>
</thead>
<tbody>
<?php $num=1; ?>
<?php while($row = mysqli_fetch_array($carry)){ ?>
<tr>
<th scope="row"> <a href="#" class="question_content"> <?php echo $num ?> </a></th>
<td><?php echo $row['title']; ?></td>
<td><?php echo $row['description']; ?></td>
<td> <?php echo $row['body']; ?></td>
<td><a href="#"><?php echo $row['image']; ?></a></td>
<td><?php echo $row['created_at']; ?></td>
<td>
<div class="action_btns d-flex">
<a href="blog_edit.php?id=<?php echo $row['id']; ?>" class="action_btn mr_10"> <i class="far fa-edit"></i> </a>
<a href="#" class="action_btn"> <i class="fas fa-trash"></i> </a>
</div>
</td>
</tr>
<?php $num++; } ?>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>