package ch07;

public class StudenTest {

	public static void main(String[] args) {

		Student choi = new Student("choi", 101);
		Student kim = new Student("kim", 102);
		
		choi.setKorean("����", 100);
		choi.setMath("����", 100);
		
		kim.setKorean("����", 95);
		kim.setMath("����", 97);
		
		kim.showTotalScore();
		choi.showTotalScore();
		
	}

}
