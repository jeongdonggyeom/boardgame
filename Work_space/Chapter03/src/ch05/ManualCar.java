package ch05;

public class ManualCar extends Car {

	@Override
	public void drive() {
		System.out.println("������Ʈ�� �ʴϴ�.");
		System.out.println("���̵�극��ũ�� Ǳ�ϴ�.");
		System.out.println("������ P���� D�� �ٲ��ݴϴ�.");
		System.out.println("������ ��� ������ �մϴ�.");
		System.out.println("�ڵ��� �̿��� ������ �����մϴ�.");
	}

	@Override
	public void stop() {
		System.out.println("�극��ũ�� ��� ���� ����ϴ�.");
		System.out.println("������ P�� �ٲߴϴ�.");
		System.out.println("���̵� �극��ũ�� �̴ϴ�.");
		System.out.println("������Ʈ�� Ǳ�ϴ�.");
	}
	
}
