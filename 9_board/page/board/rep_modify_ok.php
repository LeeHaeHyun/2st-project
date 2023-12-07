<?php
include $_SERVER['DOCUMENT_ROOT']."/9_board/db.php";

$rno = $_POST['rno']; 
$sql = mq("select * from reply where idx='".$rno."'");
$reply = $sql->fetch_array();

$bno = $_POST['b_no'];
$sql2 = mq("select * from board where idx='".$bno."'");
$board = $sql2->fetch_array();

$pwk = $_POST['pw'];
$bpw = $reply['pw'];

if(password_verify($pwk, $bpw)){
$sql3 = mq("update reply set content='".$_POST['content']."' where idx = '".$rno."'");
    echo "<script>alert('정상적으로 수정되었습니다.');</script>";
}else{
    echo "<script>alert('올바른 비밀번호를 입력해주세요.');</script>";
}
?>
<script type="text/javascript">location.replace("read.php?idx=<?php echo $bno; ?>");</script>
?>