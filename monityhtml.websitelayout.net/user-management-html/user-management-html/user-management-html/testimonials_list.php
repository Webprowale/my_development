<?php
include "config.php";
include "header.php";
include "sidebar.php";
include "navbar.php";

// Fetch data from the database
$carry = mysqli_query($conn, "SELECT * FROM project ORDER BY id DESC");

// Query to count the number of IDs in the table
$sql_count = "SELECT COUNT(id) AS id_count FROM project"; // Replace 'faq' with your table name
$result_count = mysqli_query($conn, $sql_count);
$id_count = 0;
if ($result_count) {
    $row_count = mysqli_fetch_assoc($result_count);
    $id_count = $row_count['id_count'];
} else {
    echo "Failed to execute query: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);
?>


      
    <div class="col-xl-4 ps-lg-5">
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
                            <h4><?php echo $id_count; ?></h4>
                            <p>Project</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="white_card_body ">
        <div class="row">
            <?php $num = 1; ?>
            <?php while ($row = mysqli_fetch_array($carry)) { ?>
                <div class="col-lg-7">
                    <div class="single_user_pil d-flex align-items-center justify-content-between">
                        <div class="user_pils_thumb d-flex align-items-center">
                            <div class="pe-5"><?php echo $num . "."; ?></div>
                            <span class="f_s_14 f_w_400 text_color_11"><?php echo $row['project_name']; ?></span>
                        </div>
                        <div class="user_info">
                            <?php echo $row['category']; ?>
                        </div>
                        <div class="action_btns d-flex">
                            <a href="project_edit.php?id=<?php echo $row['id']; ?>" class="action_btn mr_10 edit_btn"> <i class="far fa-edit"></i> </a>
                            <a href="project_list.php?delete_id=<?php echo $row['id']; ?>" onclick="return confirm('Are you sure you want to delete this record?');" class="action_btn delete_btn" > <i class="fas fa-trash"></i> </a>
                        </div>
                    </div>
                </div>
                <?php $num++; } ?>
        </div>
    </div>
</section>

<?php include "footer.php"; ?>


