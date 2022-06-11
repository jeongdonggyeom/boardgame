package ch10;

public class Person {

	private String name;
	private int money;
	
	public Person(String name, int money) {
		this.name = name;
		this.money = money;
	}

	public void takeSubway(Subway subway) {
		subway.take(1300);
		this.money -= 1300;
	}

	public void showInfo() {
		System.out.println(name+"님의 현재 남은 돈은 "+money+"원 입니다.");
	}

	public void takeBus(Bus bus) {
		bus.take(200);
		this.money -= 200;
	}

	public void takeCar(Car mycar, GasStation GasStation) {
		this.money -= mycar.take(GasStation);
	}
	
}
