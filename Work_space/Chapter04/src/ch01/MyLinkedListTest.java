package ch01;

public class MyLinkedListTest {

	public static void main(String[] args) {
		
		MyLinkedList list = new MyLinkedList();
		list.addElement("A");
		list.addElement("B");
		list.addElement("C");
		list.printAll();
		list.insertElement("D", 2);
		list.printAll();
		list.removeElement(2);
		list.printAll();
		list.removeElement(-1);
	}

}
