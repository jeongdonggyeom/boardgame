package ch08;

public class StudentTest {

	public static void main(String[] args) {
		
		Student mrchoi = new Student(100,"mrchoi",1);
		Student kel = new Student();
		
		kel.setGrade(2);
		kel.setNumber(2);
		kel.setName("дл");
		
		kel.showStudentInfo();
		mrchoi.showStudentInfo();
	}

}
