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
		System.out.println("Ű�� "+zl+"�̰� �����԰� "+kg+"kg�� "+gender+"�� �ֽ��ϴ�. �̸��� "+name+"�̰� ���̴� "+age+"���Դϴ�.");
	}
	
}
