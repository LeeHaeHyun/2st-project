<!--- 게시글 수정 -->
<?php
	include $_SERVER['DOCUMENT_ROOT']."/9_board/db.php";
   
	$bno = $_GET['idx'];
	$sql = mq("select * from board where idx='$bno';");
	$board = $sql->fetch_array();
 ?>
<!doctype html>
<head>
<meta charset="UTF-8">
<title>찐해: 자유게시판</title>
<link href="/0_login/img/pabi.png" rel="shortcut icon" type="image/x-icon">
<link rel="stylesheet" href="/9_board/css/style.css" />
</head>
<body>
    <div id="board_write">
        <h1 style="text-align: center; margin-top: 10%;"><a href="/9_board/">찐해 자유게시판</a></h1>
        <h4 style="text-align: center; margin-top: 1%;">편안하고 보기 좋은 게시물로 수정 잘 부탁드려요~!</h4>
            <div id="write_area">
                <form action="modify_ok.php/<?php echo $board['idx']; ?>" method="post">
                    <input type="hidden" name="idx" value="<?=$bno?>" />
                    <div id="in_title">
                        <textarea name="title" id="utitle" rows="1" cols="55" placeholder="제목" maxlength="100" required><?php echo $board['title']; ?></textarea>
                    </div>
                    <div class="wi_line"></div>
                    <div id="in_name">
                        <textarea name="name" id="uname" rows="1" cols="55" placeholder="글쓴이" maxlength="100" required><?php echo $board['name']; ?></textarea>
                    </div>
                    <div class="wi_line"></div>
                    <div id="in_content">
                        <textarea name="content" id="ucontent" placeholder="내용" required><?php echo $board['content']; ?></textarea>
                    </div>
                    <div id="in_pw">
                        <input type="password" name="pw" id="upw"  placeholder="비밀번호" required />  
                    </div>
                    <div id="in_lock">
                        <input type="checkbox" value="1" name="lockpost" />비밀글로 설정합니다.
                    </div>
                    <div class="bt_se">
                        <button type="submit">작성하기</button>
                    </div>
                </form>
            </div>
        </div>
    </body>
</html>