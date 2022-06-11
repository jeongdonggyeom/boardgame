package ch05;

public class AICar extends Car {

	@Override
	public void drive() {
		System.out.println("자율주행합니다.");
		System.out.println("자율적으로 방향을 바꿉니다.");
	}

	@Override
	public void stop() {
		System.out.println("스스로 멈춥니다.");
	}
	
}
