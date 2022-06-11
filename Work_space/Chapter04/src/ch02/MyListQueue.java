package ch02;

import ch01.MyLinkedList;
import ch01.MyListNode;

public class MyListQueue extends MyLinkedList implements IQueue {

	private MyListNode front;
	private MyListNode rear;
	
	public MyListQueue() {
		front = null;
		rear = null;
	}
	@Override
	public void enQueue(String data) {
		MyListNode newNode;
		if(isEmpty()) {
			newNode = addElement(data);
			front = newNode;
			rear = newNode;
		}
		else {
			newNode = addElement(data);
			rear = newNode;
		}
		System.out.println(newNode.getData() + " add");
	}

	@Override
	public String deQueue() {
		if(isEmpty()) {
			System.out.println("큐가 비어있어 돌아가");
			return null;
		}
		String data = front.getData();
		front = front.link;
		if(front == null) {
			rear = null;
		}
		return data;
	}

	@Override
	public void printAll() {
		if(isEmpty()) {
			System.out.println("큐가 비어있어 돌아가");
			return ;
		}
		MyListNode temp = front;
		while(temp != null) {
			System.out.print(temp.getData() + " ");
			temp = temp.link;
		}
		System.out.println("");
	}
	
	
}
