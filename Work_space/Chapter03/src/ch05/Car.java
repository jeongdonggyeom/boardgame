package ch05;

public abstract class Car {
	
	public abstract void drive();
	public abstract void stop();
	
	public void startCar() {
		System.out.println("자동차가 출발합니다.");
	}
	public void turnOff() {
		System.out.println("자동차의 시동이 꺼집니다.");
	}
	public void run() {
		startCar();
		drive();
		stop();
		turnOff();
	}
}
