package ch06;

public class OrderTest {

	public static void main(String[] args) {
		
		Order woowahan = new Order();
		
		woowahan.odnum = "202109150003";
		woowahan.phonenum = "01012345678"; 
		woowahan.adress = "부산광역시 강서구 가락대로 1393";
		woowahan.day = "20210915";
		woowahan.time = "130258";
		woowahan.money = "18000";
		woowahan.menu = "알싸한 마늘치킨";
		woowahan.menunum = "0003";
		
		woowahan.showOrderInfo();
	}

}
