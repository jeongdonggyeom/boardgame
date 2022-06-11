package ch13;

public class ObjectCopy {

	public static void main(String[] args) {

		BookArray [] library = new BookArray[5];
		BookArray [] copyLibrary = new BookArray[5];
		
		library[0] = new BookArray("삼국지1","침착맨");
		library[1] = new BookArray("삼국지2","침착맨");
		library[2] = new BookArray("삼국지3","침착맨");
		library[3] = new BookArray("삼국지4","침착맨");
		library[4] = new BookArray("삼국지5","침착맨");
		
		System.arraycopy(library, 0, copyLibrary, 0, 5);
		
		library[0].setTitle("어린왕자");
		library[0].setAuthor("생텍쥐페리");
		
		for(BookArray book:copyLibrary) {
			System.out.println("책 이름: "+book.getTitle());
		}
	}

}
