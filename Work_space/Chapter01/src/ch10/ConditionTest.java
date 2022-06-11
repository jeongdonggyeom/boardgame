package ch10;

import java.util.Scanner;

public class ConditionTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int max;
		System.out.println("입력 받은 두 수중 큰 수를 출력합니다.");
		Scanner scanner = new Scanner(System.in);
		
		System.out.println("입력 1: ");
		int x = scanner.nextInt();
		System.out.println("입력 2: ");
		int y = scanner.nextInt();
		
		max = (x>y) ? x : y;
		System.out.println(max);
	}

}
