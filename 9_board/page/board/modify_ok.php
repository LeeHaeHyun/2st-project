<?php
	include $_SERVER['DOCUMENT_ROOT']."/9_board/db.php";

	$bno = $_POST['idx'];

	$sql2 = mq("select * from board where idx='".$bno."'");
	$board = $sql2->fetch_array();

	$userpw = password_hash($_POST['pw'], PASSWORD_DEFAULT);

	if(!password_verify($_POST['pw'],$board['pw'])){
		echo "<script>alert('올바른 비밀번호를 입력해주세요.');</script>";	
		echo '<meta http-equiv="refresh" content="0 url=/9_board/page/board/read.php?idx='.$bno.'">';
		exit;
	}
	if(isset($_POST['lockpost'])){
		$lo_post = '1';
	}else{
		$lo_post = '0';
	}
	$sql = mq("update board set name='".$_POST['name']."',pw='".$userpw."',title='".$_POST['title']."',content='".$_POST['content']."',lock_post='".$lo_post."' where idx='".$bno."'");
	echo "<script>alert('정상적으로 수정되었습니다.');</script>";
?>
<meta http-equiv="refresh" content="0 url=/9_board/page/board/read.php?idx=<?php echo $bno; ?>">