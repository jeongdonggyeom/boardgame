package ch01;

public class Person extends Mammalia{

	public Person(String name) {
		this.name = name;
	}
	
	public void drive() {
		System.out.println(name+"가 운전을 합니다.");
	}
	
}
