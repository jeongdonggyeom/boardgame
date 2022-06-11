package ch02;

public class Customer {

	protected static int number = 100;
	
	protected String name;
	protected int customerID;
	protected String grade;
	protected int bonusPoint;
	protected double bonusRatio;
	
	public Customer(String name) {
		this.name = name;
		this.customerID = number++;
		this.grade = "silver";
		this.bonusRatio = 0.01;
	}

	public int calcPrice(int price) {
		bonusPoint += price*bonusRatio;
		return price;
	}
	
	public void showInfo() {
		System.out.println(name+"님의 등급은 "+grade+"이고, 적립금은 "+bonusPoint+"입니다.");
	}
}
