package ch07;

public class PriorityAll implements Scheduler {

	@Override
	public void getNextCall() {
		System.out.println("등급이 높은 고객 순으로 먼저 가져 옵니다.");
	}

	@Override
	public void sendCallToAgent() {
		System.out.println("업무 스킬이 높은 상담사에게 배정합니다.");
	}
	
}
