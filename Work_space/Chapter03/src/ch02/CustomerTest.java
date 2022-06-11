package ch02;

public class CustomerTest {

	public static void main(String[] args) {
		
		Customer choi = new Customer("choi");
		VipCustomer kim = new VipCustomer("kim");
		
		choi.showInfo();
		kim.showInfo();
	}

}
