package ch10;

public class PersonTest {

	public static void main(String[] args) {
		
		Person p1 = new Person("yesterdayMrchoi",5000);
		Person p2 = new Person("todayMrchoi", 20000);
		
		Subway brown = new Subway(3);
		Bus bus7_2 = new Bus("7-2");
		Car mycar = new Car("benz");
		GasStation suyoung = new GasStation("suyoung");
		
		p1.takeSubway(brown);
		p1.takeBus(bus7_2);
		p2.takeCar(mycar,suyoung);
		
		p1.showInfo();
		brown.showInfo();
		bus7_2.showInfo();
		p2.showInfo();
		GasStation.showInfo();
	}

}
