package ch13;

public class ObjectCopy {

	public static void main(String[] args) {

		BookArray [] library = new BookArray[5];
		BookArray [] copyLibrary = new BookArray[5];
		
		library[0] = new BookArray("�ﱹ��1","ħ����");
		library[1] = new BookArray("�ﱹ��2","ħ����");
		library[2] = new BookArray("�ﱹ��3","ħ����");
		library[3] = new BookArray("�ﱹ��4","ħ����");
		library[4] = new BookArray("�ﱹ��5","ħ����");
		
		System.arraycopy(library, 0, copyLibrary, 0, 5);
		
		library[0].setTitle("�����");
		library[0].setAuthor("�������丮");
		
		for(BookArray book:copyLibrary) {
			System.out.println("å �̸�: "+book.getTitle());
		}
	}

}
