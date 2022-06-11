package ch01;

public class AnimalTest {

	public static void main(String[] args) {
		
		Person p1 = new Person("choi");
		Tiger t1 = new Tiger("tiger");
		
		p1.walk("2¹ß");
		t1.walk("4¹ß");
		p1.drive();
		t1.hunt();
		
		p1.showInfo();
		t1.showInfo();
	}

}
