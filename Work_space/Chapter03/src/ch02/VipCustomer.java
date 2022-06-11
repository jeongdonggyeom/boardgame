package ch02;

public class VipCustomer extends Customer{

	private double saleRatio;
	
	public VipCustomer(String name) {
		
		super(name);
		this.saleRatio = 0.1;
		
		super.name = name;
		super.customerID = super.number++;
		super.grade = "VIP";
		super.bonusRatio = 0.05;
		
	}
	public int calcPrice(int price) {
		bonusPoint += price*bonusRatio;
		return price-(int)(price*saleRatio);
	}
}
