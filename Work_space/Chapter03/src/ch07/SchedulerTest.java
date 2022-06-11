package ch07;

import java.io.IOException;

public class SchedulerTest {

	public static void main(String[] args) throws IOException {
		System.out.println("��ȭ ��� �Ҵ� ����� �����ϼ���.");
		System.out.println("R : �Ѹ� ���ʴ�� �Ҵ�");
		System.out.println("S : �����ִ� ���� �Ǵ� ��Ⱑ ���� ���翡�� �Ҵ�");
		System.out.println("P : �켱������ ���� �� ���� �Ҵ�");
		
		int ch = System.in.read();
		Scheduler scheduler = null;
		
		if (ch=='R' || ch=='r') {
			scheduler = new RoundRobin();
		}
		else if (ch=='S' || ch=='s') {
			scheduler = new ShortestJob();
		}
		else if (ch=='P' || ch=='p') {
			scheduler = new PriorityAll();
		}
		
		scheduler.getNextCall();
		scheduler.sendCallToAgent();
	}

}
