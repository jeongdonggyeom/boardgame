package ch06;

public class Order {
	String odnum;
	String phonenum; 
	String adress;
	String day;
	String time;
	String money;
	String menu;
	String menunum;

	public void showOrderInfo() {
		System.out.println("접수번호 : "+odnum);
		System.out.println("핸드폰 번호 : "+phonenum);
		System.out.println("주소 : "+adress);
		System.out.println("주문 날짜 : "+day);
		System.out.println("주문 시간 : "+time);
		System.out.println("가격 : "+money);
		System.out.println("주문 메뉴 : "+menu);
		System.out.println("메뉴 번호 : "+menunum);
	}
}
