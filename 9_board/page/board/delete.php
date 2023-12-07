<?php
	include $_SERVER['DOCUMENT_ROOT']."/9_board/db.php";
	
	$bno = $_GET['idx'];
	$sql = mq("delete from board where idx='$bno';");
	$sql = mq("delete from reply where con_num='$bno';");
	echo "<script>alert('정상적으로 삭제되었습니다.');</script>";
?>
<meta http-equiv="refresh" content="0 url=/9_board" />