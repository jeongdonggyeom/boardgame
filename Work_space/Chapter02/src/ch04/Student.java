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
		System.out.println("학번은 "+number+"이고, 이름은 "+name+"이고, 학년은 "+grade+"입니다." );
	}
}
