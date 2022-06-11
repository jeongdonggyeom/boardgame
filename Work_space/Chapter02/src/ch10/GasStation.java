package ch10;

public class GasStation {

	private static String adress;
	private static int money;
	private static int gasAccount;
	
	public GasStation(String adress) {
		this.adress = adress;
		gasAccount = 10;
	}

	public int oiling(int liter) {
		money += 6000*liter;
		gasAccount -= liter;
		return 6000*liter;
	}

	public static void showInfo() {
		System.out.println(adress+"지점의 현재 남은 기름은 "+gasAccount+"리터이고 수입은 "+money+"원 입니다.");
	}

}
