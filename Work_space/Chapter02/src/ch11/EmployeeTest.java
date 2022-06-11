package ch11;

public class EmployeeTest {

	public static void main(String[] args) {
		Employee choi = new Employee("choi");
		Employee kim = new Employee("kim");
		Employee jung = new Employee("jung");
		
		choi.showInfo();
		kim.showInfo();
		jung.showInfo();
	}

}
