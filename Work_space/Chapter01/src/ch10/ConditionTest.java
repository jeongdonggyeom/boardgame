package ch10;

import java.util.Scanner;

public class ConditionTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int max;
		System.out.println("�Է� ���� �� ���� ū ���� ����մϴ�.");
		Scanner scanner = new Scanner(System.in);
		
		System.out.println("�Է� 1: ");
		int x = scanner.nextInt();
		System.out.println("�Է� 2: ");
		int y = scanner.nextInt();
		
		max = (x>y) ? x : y;
		System.out.println(max);
	}

}
