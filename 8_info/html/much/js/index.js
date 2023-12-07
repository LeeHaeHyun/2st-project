const cityInput = document.querySelector(".thing");

cityInput.value = "";

const howMuch = () => {
    $.ajax({
        method: "GET",
        url:
            "http://openapi.seoul.go.kr:8088/6656414f656861653830746f7a6469/json/ListNecessariesPricesService/1/1000/%20/" +
            $("#thing").val() +
            "/2023-08",
        // url: "http://openapi.seoul.go.kr:8088/6656414f656861653830746f7a6469/json/ListNecessariesPricesService/1/1000/%20/" + $("#thing").val(),
        // data: { TYPE: "json", SERVICE: "ListNecessariesPricesService", START_INDEX: "1", END_INDEX: "1000", A_NAME: "수박", P_YEAR_MONTH: "2023-08" },
        headers: { Authorization: "6656414f656861653830746f7a6469" },
    }) // 요청 보내기

        .done(function (msg) {
            // 요청 받기
            console.log(msg);
            $("h2").empty();
            $("h2").append("<strong> 검색한 품목: " + msg.ListNecessariesPricesService.row[0].A_NAME + "</strong><br>"); // 검색어
            var price = [];
            var money = [];
            var newprice = [];
            var sum = 0; // 합계를 초기화
            var ave = 0;
            for (var i = 0; i < msg.ListNecessariesPricesService.row.length; i++) {
                //price.push(msg.ListNecessariesPricesService.row[i].A_PRICE); // 가격을 price 배열에 넣음
                //const newprice = price.map(Number);// newprice 라는 숫자 배열로 만듬
                sum += Number(msg.ListNecessariesPricesService.row[i].A_PRICE);
            } // for문 끝

            console.log(sum); // 총합계
            ave = sum / i;
            $("p1").empty();
            $("p1").append("<strong> " + Math.round(ave) + " 원</strong><br>");

            // const result = newprice.reduce(function add(sum, currValue) {
            // return sum + currValue;
            // }, 0);

            // const average = result / arr.length;
            // console.log(average); // 2

            // $("p").append("<strong>" + price[i] + "</strong><br>");
            var list = [];
            for (var i = 0; i < msg.ListNecessariesPricesService.row.length; i++) {
                // 원래는 foreach 써야함 데이터가 5개라면 불필요한 95개의 반복문이 돌게됨, 해당 데이터는 100개 이상이라 무관
                list.push(msg.ListNecessariesPricesService.row[i].M_NAME);
            }
            list.sort();
            const uniqueArray = [...new Set(list)];
            $("p").empty();
            for (var i = 0; i < uniqueArray.length; i++) {
                $("p").append("<strong>" + uniqueArray[i] + "</strong><br>");
            }
        });
};
cityInput.addEventListener("keyup", (e) => e.key === "Enter" && howMuch());
