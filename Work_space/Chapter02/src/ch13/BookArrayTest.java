package ch13;

public class BookArrayTest {

	public static void main(String[] args) {
		
		BookArray [] library = new BookArray[5];
		
		library[0] = new BookArray("»ï±¹Áö1","Ä§Âø¸Ç");
		library[1] = new BookArray("»ï±¹Áö2","Ä§Âø¸Ç");
		library[2] = new BookArray("»ï±¹Áö3","Ä§Âø¸Ç");
		library[3] = new BookArray("»ï±¹Áö4","Ä§Âø¸Ç");
		library[4] = new BookArray("»ï±¹Áö5","Ä§Âø¸Ç");
		
		for(BookArray book:library) {
			System.out.println("Ã¥ ÀÌ¸§: "+book.getTitle());
		}
	}

}
