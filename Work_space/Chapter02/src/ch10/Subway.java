package ch10;

public class Subway {

	private int number;
	private int passengerCount;
	private int money;
	
	public Subway(int number) {
		this.number = number;
		
	}

	public void take(int money) {
		this.money += money;
		passengerCount++;
	}

	public void showInfo() {
		System.out.println("����ö�� ���� �°��� "+passengerCount+"���̰� ���� ������ "+money+"�� �Դϴ�.");
	}

}
