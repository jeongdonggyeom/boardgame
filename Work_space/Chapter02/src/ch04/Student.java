package ch04;

public class Student {
	
	//public Student() {}
		
	String name;
	int number;
	int grade;
	
	public Student() {}
	
	public Student(int number, String name, int grade) {
		this.number = number;
		this.name = name;
		this.grade = grade;
	}
	public void showStudentInfo() {
		System.out.println("�й��� "+number+"�̰�, �̸��� "+name+"�̰�, �г��� "+grade+"�Դϴ�." );
	}
}
