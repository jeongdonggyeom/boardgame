package ch01;

public class Tiger extends Mammalia{

	public Tiger(String name) {
		this.name = name;
	}
	
	public void hunt() {
		System.out.println(name+"가 사냥을 합니다.");
	}

}
