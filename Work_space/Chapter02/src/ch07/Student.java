package ch07;

public class Student {
	
	int number;
	String name;
	subject math;
	subject korean;
	
	public Student(String name, int number) {
		this.name = name;
		this.number = number;
		
		math = new subject();
		korean = new subject();
	}
	
	public void setKorean(String name, int score) {
		korean.name = name;
		korean.score = score;
	}
	
	public void setMath(String name, int score) {
		math.name = name;
		math.score = score;
	}

	public void showTotalScore() {
		int sum = math.score + korean.score;
		System.out.println(name+"학생의 총점은 : "+sum+"입니다.");
	}
}
