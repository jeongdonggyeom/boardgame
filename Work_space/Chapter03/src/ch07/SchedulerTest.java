package ch07;

import java.io.IOException;

public class SchedulerTest {

	public static void main(String[] args) throws IOException {
		System.out.println("전화 상담 할당 방식을 선택하세요.");
		System.out.println("R : 한명씩 차례대로 할당");
		System.out.println("S : 쉬고있는 상담사 또는 대기가 적은 상담사에게 할당");
		System.out.println("P : 우선순위가 높은 고객 먼저 할당");
		
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
