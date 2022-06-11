package ch05;

public class Person {
	
	int zl;
	int kg;
	String gender;
	String name;
	int age;
	
	public Person(int zl, int kg, String gender, String name, int age) {
		this.zl = zl;
		this.kg = kg;
		this.gender = gender;
		this.name = name;
		this.age = age;
	}
	public void showPersonInfo() {
		System.out.println("키가 "+zl+"이고 몸무게가 "+kg+"kg인 "+gender+"이 있습니다. 이름은 "+name+"이고 나이는 "+age+"세입니다.");
	}
	
}
