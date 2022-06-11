package ch08;

public class Student {
	
	//public Student() {}
		
	private String name;
	private int number;
	private int grade;
	
	public Student() {}
	
	public Student(int number, String name, int grade) {
		this.setNumber(number);
		this.setName(name);
		this.setGrade(grade);
	}
	public void showStudentInfo() {
		System.out.println("�й��� "+getNumber()+"�̰�, �̸��� "+getName()+"�̰�, �г��� "+getGrade()+"�Դϴ�." );
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
