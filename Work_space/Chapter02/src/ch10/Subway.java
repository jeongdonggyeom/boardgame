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
		System.out.println("지하철의 현재 승객은 "+passengerCount+"명이고 현재 수입은 "+money+"원 입니다.");
	}

}
