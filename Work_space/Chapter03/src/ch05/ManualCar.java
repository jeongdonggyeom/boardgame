package ch05;

public class ManualCar extends Car {

	@Override
	public void drive() {
		System.out.println("안전벨트를 맵니다.");
		System.out.println("사이드브레이크를 풉니다.");
		System.out.println("기어봉을 P에서 D로 바꿔줍니다.");
		System.out.println("엑셀을 밟고 운전을 합니다.");
		System.out.println("핸들을 이용해 방향을 조절합니다.");
	}

	@Override
	public void stop() {
		System.out.println("브레이크를 밟아 차를 멈춥니다.");
		System.out.println("기어봉을 P로 바꿉니다.");
		System.out.println("사이드 브레이크를 겁니다.");
		System.out.println("안전벨트를 풉니다.");
	}
	
}
