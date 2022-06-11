package ch14;

public class BreakTest {

	public static void main(String[] args) {
		int count=1;
		int sum=0;
		
		for(;;count++) {
			sum = sum + count;
			if(sum>=100) break;
		}
		System.out.println(sum);
		System.out.println(count);
	}

}
