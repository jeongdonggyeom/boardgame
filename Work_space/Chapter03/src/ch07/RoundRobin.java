package ch07;

public class RoundRobin implements Scheduler {

	@Override
	public void getNextCall() {
		System.out.println("��ȭ ���� ������ ����Ʈ�� �����ɴϴ�.");
	}

	@Override
	public void sendCallToAgent() {
		System.out.println("���� ���翡�� �������ݴϴ�.");
	}
	
}
