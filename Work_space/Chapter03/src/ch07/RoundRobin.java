package ch07;

public class RoundRobin implements Scheduler {

	@Override
	public void getNextCall() {
		System.out.println("전화 들어온 순서인 리스트를 가져옵니다.");
	}

	@Override
	public void sendCallToAgent() {
		System.out.println("다음 상담사에게 배정해줍니다.");
	}
	
}
