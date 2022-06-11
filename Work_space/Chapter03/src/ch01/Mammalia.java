package ch01;

public class Mammalia {
	
	protected String name;
	
	public void walk(String leg) {
		System.out.println(name+"가 "+leg+"로 걷고 있습니다.");
	}
	
	public void showInfo() {
		System.out.println("이름은 "+name+"입니다.");
	}
}
