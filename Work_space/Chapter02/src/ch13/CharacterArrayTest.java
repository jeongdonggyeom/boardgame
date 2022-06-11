package ch13;

public class CharacterArrayTest {

	public static void main(String[] args) {
		
		char[] alphabets = new char[26];
		
		char ch = 'A';
		for(int i=0;i<alphabets.length;i++) {
			alphabets[i] = ch++;
		}
		for(char a:alphabets) {
			System.out.print(a+" ");
		}
	}

}
