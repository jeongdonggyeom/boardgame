package ch12;

public class CompanyTest {

	public static void main(String[] args) {
	
		Company kakao;
		kakao = Company.getInstance();
		Company google;
		google = Company.getInstance();
		
		System.out.println(kakao);
		System.out.println(google);
	}

}
