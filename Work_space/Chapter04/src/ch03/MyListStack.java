package ch03;

import ch01.MyLinkedList;
import ch01.MyListNode;

public class MyListStack extends MyLinkedList implements IStack {

	private MyListNode top;
	
	public MyListStack() {
		top = null;
	}
	
	@Override
	public void push(String data) {
		MyListNode newNode = insertElement(data, 0);
		if(isEmpty()) {
			top = newNode;
			return ;
		}
		top = newNode;
		System.out.println(newNode.getData() + " push");
	}

	@Override
	public String pop() {
		if(isEmpty()) {
			System.out.println("스택이 비어있음");
			return null;
		}
		String data = top.getData();
		top = top.link;
		return data;
	}

	@Override
	public void printAll() {
		if(isEmpty()) {
			System.out.println("스택이 비어있음");
			return ;
		}
		MyListNode temp = top;
		while(temp != null) {
			System.out.print(temp.getData() + " ");
			temp = temp.link;
		}
		System.out.println("");
	}

}
