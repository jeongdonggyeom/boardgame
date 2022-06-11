package ch01;

public class MyListNode {
	
	private String data;
	public MyListNode link;
	
	
	public MyListNode() {
		this.data = null;
		this.link = null;
	}
	
	public MyListNode(String data) {
		this.data = data;
		this.link = null;
	}
	
	public MyListNode(String data, MyListNode link) {
		this.data = data;
		this.link = link;
	}
	
	public String getData() {
		return data;
	}
}
