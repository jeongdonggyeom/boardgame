package ch11;

public class Employee {

	static int number=100;
	String name;
	int EmployeeNumber;

	public Employee(String name) {
		this.name = name;
		EmployeeNumber = number;
		number++;
	}
	
	public void showInfo() {
		System.out.println(name+"����� ����� "+EmployeeNumber+"�Դϴ�.");
	}
}
