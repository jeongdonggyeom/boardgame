package ch07;

public class PriorityAll implements Scheduler {

	@Override
	public void getNextCall() {
		System.out.println("����� ���� �� ������ ���� ���� �ɴϴ�.");
	}

	@Override
	public void sendCallToAgent() {
		System.out.println("���� ��ų�� ���� ���翡�� �����մϴ�.");
	}
	
}
