package ch10;

public class Bus {

	private String number;
	private int money;
	private int passengerCount;
	
	public Bus(String number) {
		this.number = number;
	}

	public void take(int money) {
		this.money += money;
		passengerCount++;
	}

	public void showInfo() {
		System.out.println("버스의 현재 승객은 "+passengerCount+"명이고 현재 수입은 "+money+"원 입니다.");
	}

}
