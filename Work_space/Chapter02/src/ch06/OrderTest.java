package ch06;

public class OrderTest {

	public static void main(String[] args) {
		
		Order woowahan = new Order();
		
		woowahan.odnum = "202109150003";
		woowahan.phonenum = "01012345678"; 
		woowahan.adress = "�λ걤���� ������ ������� 1393";
		woowahan.day = "20210915";
		woowahan.time = "130258";
		woowahan.money = "18000";
		woowahan.menu = "�˽��� ����ġŲ";
		woowahan.menunum = "0003";
		
		woowahan.showOrderInfo();
	}

}
