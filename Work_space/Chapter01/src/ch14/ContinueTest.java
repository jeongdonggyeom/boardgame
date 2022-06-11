package ch14;

public class ContinueTest {

	public static void main(String[] args) {
		int num=1;
		while(num<=100)
		{
			if(num++%3!=0) { continue;}
			System.out.println(num);
		}

}
}