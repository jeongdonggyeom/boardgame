package ch03;

public class Student {
	
	String name;
	int age; 
	int number;
	
	public void showStudentinfo() {
		System.out.println("이름은: " + name +"나이는: " + age + "학번은: " + number);
	}
	
	public String getStudentName() {
		return name;
	}
}
