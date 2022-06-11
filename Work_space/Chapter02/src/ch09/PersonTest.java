package ch09;

public class PersonTest {

	String name;
	int age;
	
	public PersonTest() {
		this("이름없음", 999);
	}
	
	public PersonTest(String name, int age) {
		this.name = name;
		this.age = age;
	}
	
	public PersonTest getPerson() {
		return this;
	}
	
	public static void main(String[] args) {
		
		PersonTest p1 = new PersonTest();
		System.out.println(p1);
		
		PersonTest p2;
		
		p2 = p1.getPerson();
		System.out.println(p2);
	}

}
