package ch01;

public class MyLinkedList {
	
	private MyListNode head;
	private int count;
	
	public MyLinkedList() {
		this.head = null;
		this.count = 0;
	}
	
	public MyListNode addElement(String data) {
		MyListNode newNode = new MyListNode(data);
		if(head == null) {
			head = newNode;
		}
		else {
			MyListNode temp = head;
			while(temp.link != null) {
				temp = temp.link;
			}
			temp.link = newNode;
		}
		count++;
		return newNode;
	}
	
	public MyListNode insertElement(String data, int position) {
		MyListNode newNode = new MyListNode(data);
		if(head == null) {
			head = newNode;
			return null;
		}
		if(position==0) {
			newNode.link = head; //  newNode -> head  newNode가 head로 바뀜.
			head = newNode;
		}
		else if(position < 0 || position > count) {
			System.out.println("위치값이 잘못 되었어. 나가");
			return null;
		}
		else {
			MyListNode temp = head;
			MyListNode preNode = null;
			for(int i = 0;i<position;i++) {
				preNode = temp;
				temp = temp.link;
			}
			newNode.link = temp;           //pre -> newnode -> temp 2와 3 사이에 넣기?
			preNode.link = newNode;
		}
		count++;
		return newNode;
	}
	
	public String removeElement(int position) {
		MyListNode temp = head;
		if(position == 0) {
			head = temp.link;
			return temp.getData();
		}
		if(position < 0) {
			System.out.println("자릿값이 잘못 되었습니다.");
			return temp.getData();
		}
		MyListNode pre = null;
		for(int i=0;i<position;i++) {
			pre = temp;
			temp = temp.link;
		}
		pre.link = temp.link;
		return temp.getData();
	}
	
	public void printAll() {
		MyListNode temp = head;
		while(temp != null) {
			System.out.print(temp.getData());
			temp = temp.link;
			if(temp != null) {
				System.out.print(" -> "); 
			}
		}
		System.out.println(" ");
	}
	public boolean isEmpty() {
		if(head == null) return true;
		else return false;
	}
	
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
