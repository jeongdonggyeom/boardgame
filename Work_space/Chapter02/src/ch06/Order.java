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
		System.out.println("������ȣ : "+odnum);
		System.out.println("�ڵ��� ��ȣ : "+phonenum);
		System.out.println("�ּ� : "+adress);
		System.out.println("�ֹ� ��¥ : "+day);
		System.out.println("�ֹ� �ð� : "+time);
		System.out.println("���� : "+money);
		System.out.println("�ֹ� �޴� : "+menu);
		System.out.println("�޴� ��ȣ : "+menunum);
	}
}
