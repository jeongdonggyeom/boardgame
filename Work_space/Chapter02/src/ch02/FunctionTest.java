package ch02;

public class FunctionTest {
	
	public static int addNum(int num1, int num2) {
		return (num1 + num2);
	}
	public static void sayHello(String name) {
		System.out.println(name + "¥‘, æ»≥Á«œººø‰!");
	}
	public static int calcSum() {
		int sum=0;
		for(int i=1;i<101;i++) {
			sum+=i;
		}
		return sum;
	}
	
	public static void main(String[] args) {
		
		int a=10;
		int b=20;
		int sum=0;
		sum = addNum(a,b);
		System.out.println(sum);
		
		sayHello("mrchoi");
		
		sum = calcSum();
		System.out.println(sum);
	}

}
