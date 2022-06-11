package ch02;

public class MyListQueueTest {

	public static void main(String[] args) {
		MyListQueue q = new MyListQueue();
		q.enQueue("A");
		q.enQueue("B");
		q.enQueue("C");
		
		q.printAll();
		
		System.out.println(q.deQueue()+" ªË¡¶");
		q.printAll();
	}

}
