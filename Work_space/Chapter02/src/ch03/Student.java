package ch03;

public class Student {
	
	String name;
	int age; 
	int number;
	
	public void showStudentinfo() {
		System.out.println("�̸���: " + name +"���̴�: " + age + "�й���: " + number);
	}
	
	public String getStudentName() {
		return name;
	}
}
