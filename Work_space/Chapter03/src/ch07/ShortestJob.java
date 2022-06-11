package ch07;

public class ShortestJob implements Scheduler {

	@Override
	public void getNextCall() {
		System.out.println("전화 들어온 순서인 리스트를 가져옵니다.");
	}

	@Override
	public void sendCallToAgent() {
		System.out.println("현재 상담 업무가 없거나 대기가 가장 작은 상담원에게 배정합니다.");
	}
	
}
