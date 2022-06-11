package ch04;

public class ComputerTest {

	public static void main(String[] args) {
		
		Computer desktop = new Desktop();
		desktop.display();
		desktop.turnOff();
		
		Computer laptop = new MyLaptop();
		laptop.display();
		laptop.typing();
		laptop.turnOff();
		
	}

}
