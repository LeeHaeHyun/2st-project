<?php 
  include $_SERVER['DOCUMENT_ROOT']."/9_board/db.php";
?>
<!doctype html>
<head>
<meta charset="UTF-8">
<title>찐해:자유게시판</title>
<link href="../0_login/img/pabi.png" rel="shortcut icon" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="/9_board/css/style.css" />
</head>
<body>
<div id="board_area"> 
  <h1 style="text-align: center; margin-top: 10%;">찐해 자유게시판</h1>
  <h4 style="text-align: center; margin-top: 1%;">사랑으로 좋은 게시물을 많이 작성해주세요!</h4>
    <table class="list-table" style="text-align: center;">
      <thead>
          <tr>    
            <?php 
              /* 2022.11.06 컬럼정렬 추가 */
              //GET sortType이 있는지 체크
              if(isset($_GET['sortType'])){
                //있다면 GET에서 받아온 데이터 넣음
                $sortType = $_GET['sortType'];
                //sortType이 desc일 경우 문자넣기
                switch($sortType){
                  case "desc" :  $sortText = '▼';
                  break;
                  case "asc" :  $sortText = '▲';
                }
              }else{
                //그 외 기본
                $sortType = 'desc';
                $sortText = '▼';
              }
            
            ?>
              <th width="70"><a onclick="b_sort('idx','<?php echo $sortType ?>')" href="#">번호<span style="color:red;">
                <?php  
                  //column GET데이터가 있으면
                  if(isset($_GET['column'])){
                    //이 GET데이터가 각 컬럼명과 같으면 sortText변수 표시
                    if($_GET['column']=="idx") 
                      echo $sortText;
                    }else{
                      echo $sortText;
                  } 
                  ?>
              </style></th>
                <th width="500"><a onclick="b_sort('title','<?php echo $sortType ?>')" href="#">제목<span style="color:red;">
                  <?php  
                    //위와 같은 방식 하지만 기본정렬은 idx이므로 column값 체크시 else는 필요가 없다
                    if(isset($_GET['column'])){
                       if($_GET['column']=="title") 
                        echo $sortText;
                       }
                  ?>
                </style></th>
                <th width="120"><a onclick="b_sort('name','<?php echo $sortType ?>')" href="#">글쓴이<span style="color:red;">
                  <?php  
                    if(isset($_GET['column'])){
                       if($_GET['column']=="name") 
                        echo $sortText;
                       }
                  ?>
                </style></th>
                <th width="100"><a onclick="b_sort('date','<?php echo $sortType ?>')" href="#">작성일<span style="color:red;">
                  <?php  
                    if(isset($_GET['column'])){
                       if($_GET['column']=="date") 
                        echo $sortText;
                       }
                  ?>
                </style></th>
                <th width="100"><a onclick="b_sort('hit','<?php echo $sortType ?>')" href="#">조회수<span style="color:red;">
                  <?php  
                    if(isset($_GET['column'])){
                       if($_GET['column']=="hit") 
                        echo $sortText;
                       }
                  /* 2022.11.06 컬럼정렬 추가 끝 */
                  ?>
                </style></th>
            </tr>
        </thead>
        <?php
        
            if(isset($_GET['page'])){
              $page = $_GET['page'];
                }else{
                  $page = 1;
                }
                
                /* 2022.11.06 컬럼정렬 추가 */
                  //sortColumn, sortType변수 선언 
                  $sortColumn="";
                  $sortType="";


                  $sql = mq("select * from board");
                  $row_num = mysqli_num_rows($sql); //게시판 총 레코드 수
                  $list = 5; //한 페이지에 보여줄 개수
                  $block_ct = 5; //블록당 보여줄 페이지 개수

                  $block_num = ceil($page/$block_ct); // 현재 페이지 블록 구하기
                  $block_start = (($block_num - 1) * $block_ct) + 1; // 블록의 시작번호
                  $block_end = $block_start + $block_ct - 1; //블록 마지막 번호

                  $total_page = ceil($row_num / $list); // 페이징한 페이지 수 구하기
                  if($block_end > $total_page) $block_end = $total_page; //만약 블록의 마지박 번호가 페이지수보다 많다면 마지박번호는 페이지 수
                  $total_block = ceil($total_page/$block_ct); //블럭 총 개수
                  $start_num = ($page-1) * $list; //시작번호 (page-1)에서 $list를 곱한다.

                  /* 2022.11.06 컬럼정렬 추가 */
                  if((isset($_GET['column']) && $_GET['column']) && (isset($_GET['sortType']) && $_GET['sortType'])){ //isset으로 column과 sortType을 체크하고
                    //값이 잇다면 해당변수에 GET데이터 넣고 쿼리문에 order by영역에 각 변수로 세팅 
                    $sortColumn = $_GET['column'];
                    $sortType = $_GET['sortType'];
                    $sql2 = mq("select * from board order by $sortColumn $sortType limit $start_num, $list");  
                  }else{
                    //아닌경우 idx(번호)기준 desc
                    $sql2 = mq("select * from board order by idx desc limit $start_num, $list");  
                  }
                  /* 2022.11.06 컬럼정렬 추가 끝*/
                 
                  while($board = $sql2->fetch_array()){
                  $title=$board["title"]; 
                    if(strlen($title)>30)
                    { 
                      $title=str_replace($board["title"],mb_substr($board["title"],0,30,"utf-8")."...",$board["title"]);
                    }
                    $sql3 = mq("select * from reply where con_num='".$board['idx']."'");
                    $rep_count = mysqli_num_rows($sql3);
                  ?>
      <tbody>
        <tr>
          <td width="70"><?php echo $board['idx']; ?></td>
          <td width="500">
            <?php 
              $lockimg = '';    
              $boardurl = 'read';          
              if($board['lock_post']=="1"){ 
                $lockimg = "<img src='/9_board/img/lock.png' alt='lock' title='lock' with='20' height='20' />";
                $boardurl = 'ck_read';                          
              }

              $title = $title.$lockimg;
            ?>
        <!-- 추가부분 18.08.01 -->
        <?php
          $boardtime = substr($board['date'],0,10); //$boardtime변수에 board['date']값을 넣음
          $timenow = date("Y-m-d H:i:s"); //$timenow변수에 현재 시간 Y-M-D를 넣음
          
          if($boardtime==$timenow){
            $img = "<img src='/9_board/img/new.png' alt='new' title='new' />";
          }else{
            $img ="";
          }
          ?>
        <!-- 추가부분 18.08.01 END -->
        <a href='/9_board/page/board/<?php echo $boardurl; ?>.php?idx=<?php echo $board["idx"]; ?>'><?php echo $title; ?><span class="re_ct">[<?php echo $rep_count;?>] <?php echo $img; ?></span></a></td>
          <td width="120"><?php echo $board['name']?></td>
          <td width="100"><?php echo $board['date']?></td>
          <td width="100"><?php echo $board['hit']; ?></td>
        </tr>
      </tbody>
      <?php } ?>
    </table>
    <div id="page_num">
        <?php

      
          if($page <= 1)
          { //만약 page가 1보다 크거나 같다면
            echo "<span class='fo_re'>처음</span>"; //처음이라는 글자에 빨간색 표시 
          }else{
            echo "<a href='/9_board?page=1'>처음</a>"; //알니라면 처음글자에 1번페이지로 갈 수있게 링크
          }
          if($page <= 1)
          { //만약 page가 1보다 크거나 같다면 빈값
            
          }else{
          $pre = $page-1; //pre변수에 page-1을 해준다 만약 현재 페이지가 3인데 이전버튼을 누르면 2번페이지로 갈 수 있게 함
            /* 2022.11.06 컬럼정렬 추가 */
            echo "<a href='/9_board?page=$pre&column=$sortColumn&sortType=$sortType'>이전</a>"; //이전글자에 pre변수를 링크한다. 이러면 이전버튼을 누를때마다 현재 페이지에서 -1하게 된다.
          }
          for($i=$block_start; $i<=$block_end; $i++){ 
            //for문 반복문을 사용하여, 초기값을 블록의 시작번호를 조건으로 블록시작번호가 마지박블록보다 작거나 같을 때까지 $i를 반복시킨다
            if($page == $i){ //만약 page가 $i와 같다면 
              echo "<span class='fo_re'>[$i]</span>"; //현재 페이지에 해당하는 번호에 굵은 빨간색을 적용한다
            }else{
              /* 2022.11.06 컬럼정렬 추가 */
              echo "<a href='/9_board?page=$i&column=$sortColumn&sortType=$sortType'>[$i]</a>"; //아니라면 $i
            }
          }
          if($block_num >= $total_block){ //만약 현재 블록이 블록 총개수보다 크거나 같다면 빈 값
          }else{
            $next = $page + 1; //next변수에 page + 1을 해준다.
            echo "<a href='/9_board?page=$next&column=$sortColumn&sortType=$sortType'>다음</a>"; //다음글자에 next변수를 링크한다. 현재 4페이지에 있다면 +1하여 5페이지로 이동하게 된다.
          }
          if($page >= $total_page){ //만약 page가 페이지수보다 크거나 같다면
            echo "<span class='fo_re'>마지막</span>"; //마지막 글자에 긁은 빨간색을 적용한다.
          }else{
            /* 2022.11.06 컬럼정렬 추가 */
            echo "<a href='/9_board?page=$total_page&column=$sortColumn&sortType=$sortType'>마지막</a>"; //아니라면 마지막글자에 total_page를 링크한다.
          }
        ?>
    </div>
<div id="write_btn">
      <a href="/9_board/page/board/write.php"><button>글쓰기</button></a>
</div>
  <!-- 18.10.11 검색 추가 -->
  <div id="search_box">
    <form action="/9_board/page/board/search_result.php" method="get">
      <select name="catgo">
        <option value="title">제목</option>
        <option value="name">글쓴이</option>
        <option value="content">내용</option>
      </select>
      <input type="text" name="search" size="40" required="required" /> 
      <button id="b_searchBtn">검색</button>
    </form>
    <!-- 2022.11.06 컬럼정렬 추가 -->
    <form action="/9_board/" method="get" id="sortForm">
      <input type="hidden" name="column" id="column" value="" />
      <input type="hidden" name="sortType" id="sortType" value="desc" />
    </form>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
  <script>
    function b_sort(cloumn, sortType){
      $("#column").val(cloumn);
      switch(sortType){
        case 'asc': sortType='desc'
        break;
        case 'desc': sortType='asc'
        break;
        default: sortType='desc'
        break;
      }
      $("#sortType").val(sortType);
      $("#sortForm").submit();
    }

  </script>
  <!-- 2022.11.06 컬럼정렬 추가 끝-->
</body>
</html>