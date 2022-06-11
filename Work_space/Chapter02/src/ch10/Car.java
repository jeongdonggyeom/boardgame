package ch10;

public class Car {

	private int oil;
	private String name;
	
	public Car(String name) {
		this.name = name;
		oil = 0;
	}

	public int take(GasStation gasStation) {
		return gasStation.oiling(3);
		
	}

}
