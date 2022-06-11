package ch06;

public interface Calc {
	
	final double PI = 3.14;
	int error = 999999;
	
	int add(int num1, int num2);
	int substract(int num1, int num2);
	int times(int num1, int num2);
	int divide(int num1, int num2);
}
