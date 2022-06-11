package ch07;

public class StudenTest {

	public static void main(String[] args) {

		Student choi = new Student("choi", 101);
		Student kim = new Student("kim", 102);
		
		choi.setKorean("국어", 100);
		choi.setMath("수학", 100);
		
		kim.setKorean("국어", 95);
		kim.setMath("수학", 97);
		
		kim.showTotalScore();
		choi.showTotalScore();
		
	}

}
