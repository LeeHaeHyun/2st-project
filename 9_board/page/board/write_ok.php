<?php

include $_SERVER['DOCUMENT_ROOT']."/9_board/db.php";
$date = date('Y-m-d H:i:s');
$userpw = password_hash($_POST['pw'], PASSWORD_DEFAULT);
if(isset($_POST['lockpost'])){
	$lo_post = '1';
}else{
	$lo_post = '0';
}

$tmpfile =  $_FILES['b_file']['tmp_name'];
$o_name = $_FILES['b_file']['name'];
$filename = iconv("UTF-8", "EUC-KR",$_FILES['b_file']['name']);
$ext = preg_replace('/^.*\.([^.]+)$/D', '$1', $filename);
$filename1 = time().'.'.$ext;
$folder = "../../upload/".$filename1;
move_uploaded_file($tmpfile,$folder);

$mqq = mq("alter table board auto_increment =1"); //auto_increment 값 초기화

$sql = mq("insert into board(name,pw,title,content,date,lock_post,file,filename) values('".$_POST['name']."','".$userpw."','".$_POST['title']."','".$_POST['content']."','".$date."','".$lo_post."','".$o_name."','".$filename1."')");
echo "<script>alert('정상적으로 완료되었습니다.');</script>"; 
?>
<meta http-equiv="refresh" content="0 url=/9_board/" />